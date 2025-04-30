import { PostItem } from "@src/types";
import { categories } from "@categories";
import { Category } from "@src/types";
import posts from "@.contents/posts.json";

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryPostsById(id: string): PostItem[] {
  const posts = require("../../.contents/posts.json") as PostItem[];
  return posts.filter((post) => post.categoryId === id);
}

export function getCategoryPath(id: string) {
  return `/categories/${encodeURIComponent(id)}`;
}
