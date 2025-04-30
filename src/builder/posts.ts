import fs from "fs-extra";
import Parser from "rss-parser";
import { categories } from "../../categories";
import { PostItem, Category } from "../types";

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
  imageUrl?: string;
  authorName?: string;
};

function isValidUrl(str: string): boolean {
  try {
    const { protocol } = new URL(str);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

const parser = new Parser({
  customFields: {
    item: [["enclosure", "url"], ["author", "name"]],
  },
});
let allPostItems: PostItem[] = [];

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];

  return feed.items
  .map(({ title, contentSnippet, link, isoDate, enclosure, author }) => {
    const isQiita = link?.includes("qiita.com");
  
    return {
      title,
      contentSnippet: contentSnippet?.replace(/\n/g, ""),
      link,
      isoDate,
      dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      imageUrl: enclosure?.url,
      authorName: isQiita ? author : undefined,
    };
  })
  
    .filter(
      ({ title, link }) => title && link && isValidUrl(link),
    ) as FeedItem[];
}


async function getCategoryFeedItems(category: Category): Promise<PostItem[]> {
  const { id, name, sources, includeUrlRegex, excludeUrlRegex } = category;
  const feedItems = await getFeedItemsFromSources(sources);
  if (!feedItems) return [];

  let postItems = feedItems.map((item) => {
    return {
      ...item,
      categoryName: name,
      categoryId: id,
    };
  });

  if (Array.isArray(includeUrlRegex)) {
    postItems = postItems.filter((item) =>
      includeUrlRegex.some((pattern) => item.link.match(new RegExp(pattern))),
    );
  }

  if (Array.isArray(excludeUrlRegex)) {
    postItems = postItems.filter(
      (item) =>
        !excludeUrlRegex.some((pattern) =>
          item.link.match(new RegExp(pattern)),
        ),
    );
  }

  return postItems;
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return [];
  let feedItems: FeedItem[] = [];
  for (const url of sources) {
    const items = await fetchFeedItems(url);
    if (items) feedItems = [...feedItems, ...items];
  }
  return feedItems;
}

(async function () {
  for (const category of categories) {
    const items = await getCategoryFeedItems(category);
    if (items) allPostItems = [...allPostItems, ...items];
  }
  allPostItems.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);
  fs.ensureDirSync(".contents");
  fs.writeJsonSync(".contents/posts.json", allPostItems);
})();
