import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PostItem } from "@src/types";

dayjs.extend(relativeTime);

import Link from "next/link";

dayjs.extend(relativeTime);

const PostLink: React.FC<{ item: PostItem }> = ({ item }) => {
  const { title, isoDate, link, imageUrl, authorName, dateMiliSeconds, categoryId } = item;
  const isQiita = link.includes("qiita.com");
  const ogpImage = isQiita ? "/qiita-icon.png" : imageUrl;

  if (isQiita) {
    return (
      <a href={link} className="post-link" target="_blank" rel="noopener noreferrer">
        <div className="post-link__author">
          <img
            src={ogpImage}
            className="post-link__author-img"
            width={35}
            height={35}
            alt="Qiita"
          />
          <div className="post-link__author-name">
            <div className="post-link__author-name">{authorName}</div>
            <time dateTime={isoDate} className="post-link__date">
              {dayjs(isoDate).fromNow()}
            </time>
          </div>
        </div>
        <div className="post-link__main-link">
          <h2 className="post-link__title">{title}</h2>
        </div>
        {dateMiliSeconds && dateMiliSeconds > Date.now() - 86400000 * 3 && (
          <div className="post-link__new-label">NEW</div>
        )}
      </a>
    );
  }

  return (
    <article className="post-link">
      <a href={link} className="post-link__main-link" target="_blank" rel="noopener noreferrer">
        <img src={ogpImage} alt={title} className="post-image" />
      </a>
      {dateMiliSeconds && dateMiliSeconds > Date.now() - 86400000 * 3 && (
        <div className="post-link__new-label">NEW</div>
      )}
    </article>
  );
};



export const PostList: React.FC<{ items: PostItem[] }> = ({ items }) => {
  const [displayItemsCount, setDisplayItemsCount] = useState<number>(32);
  const totalItemsCount = items?.length || 0;
  const canLoadMore = totalItemsCount - displayItemsCount > 0;

  if (!totalItemsCount) {
    return <div className="post-list-empty">No posts yet</div>;
  }

  return (
    <>
      <div className="post-list">
        {items.slice(0, displayItemsCount).map((item, i) => (
          <PostLink key={`post-item-${i}`} item={item} />
        ))}
      </div>
      {canLoadMore && (
        <div className="post-list-load">
          <button
            onClick={() => setDisplayItemsCount(displayItemsCount + 32)}
            className="post-list-load__button"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
};
