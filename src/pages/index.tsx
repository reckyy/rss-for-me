import { NextPage } from "next";
import Link from "next/link";

import posts from "@.contents/posts.json";
import { config } from "@site.config";
import { PostItem } from "@src/types";
import { ScrollableCategories } from "@src/components/ScrollableCategories";
import { PostList } from "@src/components/PostList";
import { PageSEO } from "@src/components/PageSEO";
import {
  ContentWrapper,
  UndoWrapForScroll,
} from "@src/components/ContentWrapper";

const Page: NextPage = () => {
  const trendPosts = (posts as PostItem[]).filter(
    (post) => post.categoryId === "trend",
  );

  return (
    <>
      <PageSEO
        title={config.siteMeta.title}
        description={config.siteMeta.description}
        path="/"
        removeSiteNameFromTitle={true}
      />

      <section className="home-hero">
        <ContentWrapper>
          <h1 className="home-hero__title">RSS for me</h1>
        </ContentWrapper>
      </section>

      <section className="home-members">
        <ContentWrapper>
          <div className="home-section-title-container">
            <h2 className="home-section-title">Categories</h2>
            <Link href="/categories">
              <a className="home-section-link">See Details →</a>
            </Link>
          </div>

          <div className="home-members-container">
            <UndoWrapForScroll>
              <ScrollableCategories />
            </UndoWrapForScroll>
          </div>
        </ContentWrapper>
      </section>

      <section className="home-posts">
        <ContentWrapper>
          <div className="home-section-title-container">
            <h2 className="home-section-title">Trending Articles</h2>
          </div>

          <div className="home-posts-container">
            <PostList items={trendPosts} />
          </div>
        </ContentWrapper>
      </section>
    </>
  );
};

export default Page;
