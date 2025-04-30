import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

import { categories } from "@categories";
import { PostItem, Category } from "@src/types";
import { PostList } from "@src/components/PostList";
import { ContentWrapper } from "@src/components/ContentWrapper";
import { PageSEO } from "@src/components/PageSEO";
import {
  getCategoryById,
  getCategoryPostsById,
  getCategoryPath,
} from "@src/utils/helper";

type Props = {
  postItems: PostItem[];
  category: Category;
};

const Page: NextPage<Props> = ({ postItems, category }) => {
  const {
    id,
    name,
    bio,
    avatarSrc,
    twitterUsername,
    githubUsername,
    websiteUrl,
  } = category;

  return (
    <>
      <PageSEO title={name} path={getCategoryPath(id)} />
      <section className="category">
        <ContentWrapper>
          <header className="category-header">
            {avatarSrc && (
              <div className="category-header__avatar">
                <img
                  src={avatarSrc}
                  alt={name}
                  width={100}
                  height={100}
                  className="category-header__avatar-img"
                />
              </div>
            )}
            <h1 className="category-header__name">{name}</h1>
            {bio && <p className="category-header__bio">{bio}</p>}
            <div className="category-header__links">
              {twitterUsername && (
                <a
                  href={`https://twitter.com/${twitterUsername}`}
                  className="category-header__link"
                >
                  <FaTwitter
                    className="category-header__link-icon"
                    aria-label={`Follow @${twitterUsername} on Twitter`}
                  />
                </a>
              )}
              {githubUsername && (
                <a
                  href={`https://github.com/${githubUsername}`}
                  className="category-header__link"
                >
                  <FaGithub
                    className="category-header__link-icon"
                    aria-label={`@${githubUsername} on GitHub`}
                  />
                </a>
              )}
              {websiteUrl && (
                <a href={websiteUrl} className="category-header__link">
                  <AiOutlineLink
                    className="category-header__link-icon"
                    aria-label={`Link to website`}
                  />
                </a>
              )}
            </div>
          </header>

          <div className="category-posts-container">
            <PostList items={postItems} />
          </div>
        </ContentWrapper>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  const category = getCategoryById(id);
  const postItems = getCategoryPostsById(id);

  if (!category) throw "Category not found";

  return {
    props: {
      category,
      postItems,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((category) => ({
    params: { id: encodeURIComponent(category.id) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Page;
