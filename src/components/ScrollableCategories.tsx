import Link from "next/link";
import { categories } from "@categories";
import { getCategoryPath } from "@src/utils/helper";

export const ScrollableCategories: React.FC = () => {
  return (
    <div className="scrollable-members">
      {categories.map((category, i) => (
        <Link
          key={`scrollable-category-${i}`}
          href={getCategoryPath(category.id)}
          passHref
        >
          <a className="scrollable-member__link">
            {category.avatarSrc && (
              <span className="scrollable-member__image">
                <img
                  src={category.avatarSrc}
                  alt={category.name}
                  className="scrollable-member__img"
                  width={80}
                  height={80}
                />
              </span>
            )}
          </a>
        </Link>
      ))}
    </div>
  );
};
