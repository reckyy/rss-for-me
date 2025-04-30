import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

import { config } from "@site.config";
import { categories } from "@categories";
import { ContentWrapper } from "@src/components/ContentWrapper";
import { PageSEO } from "@src/components/PageSEO";
import { getCategoryPath } from "@src/utils/helper";
import { Category } from "@src/types";

const CategoryCard: React.FC<{ Category: Category }> = ({ Category }) => {
  return (
    <Link href={getCategoryPath(Category.id)}>
      <a className="Category-card">
        <div className="Category-card__avatar">
          <img
            src={Category.avatarSrc}
            alt={Category.name}
            width={80}
            height={80}
            className="Category-card__avatar-img"
          />
        </div>
        <h2 className="Category-card__name"> {Category.name}</h2>
        <p className="Category-card__bio">{Category.bio}</p>
      </a>
    </Link>
  );
};

const Page: NextPage = () => {
  return (
    <>
      <PageSEO title="categories" path="/categories" />
      <ContentWrapper>
        <section className="categories">
          <h1 className="categories__title">
            categories{" "}
            <span className="categories__title-team">
              @ {config.siteMeta.teamName}
            </span>
          </h1>
          <div className="categories__cards">
            {categories.map((Category, i) => (
              <CategoryCard key={`Category-card-${i}`} Category={Category} />
            ))}
          </div>
        </section>
      </ContentWrapper>
    </>
  );
};

export default Page;
