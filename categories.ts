import { Category } from "@src/types";

export const categories: Category[] = [
  {
    id: "rails",
    name: "Rails",
    bio:
      "Railsに関する記事",
    avatarSrc: "/rails-logo.jpeg",
    sources: [
      "https://zenn.dev/topics/rails/feed",
      "https://qiita.com/tags/rails/feed",
    
    ],
    includeUrlRegex: ["zenn.dev", "qiita.com"],
  },
  {
    id: "ruby",
    name: "Ruby",
    bio:
      "Rubyに関する記事",
    avatarSrc: "/ruby.png",
    sources: [
      "https://zenn.dev/topics/ruby/feed",
      "https://qiita.com/tags/ruby/feed",
    ],
    includeUrlRegex: ["zenn.dev", "qiita.com"],
  },
  {
    id: "react",
    name: "React",
    bio:
      "Reactに関する記事",
    avatarSrc: "/react.svg",
    sources: [
      "https://zenn.dev/topics/react/feed",
      "https://qiita.com/tags/react/feed",
    ],
    includeUrlRegex: ["zenn.dev", "qiita.com"],
  },
  {
    id: "ai",
    name: "AI",
    bio:
      "AIに関する記事",
    avatarSrc: "/ai.png",
    sources: [
      "https://zenn.dev/topics/ai/feed",
      "https://qiita.com/tags/ai/feed",
    ],
    includeUrlRegex: ["zenn.dev", "qiita.com"],
  },
  {
    id: "github",
    name: "GitHub",
    bio:
      "GitHubに関する記事",
    avatarSrc: "/github-mark.png",
    sources: [
      "https://zenn.dev/topics/github/feed",
      "https://qiita.com/tags/github/feed",
    ],
    includeUrlRegex: ["zenn.dev", "qiita.com"],
  },
  {
    id: "trend",
    name: "trend",
    bio:
      "trendの記事",
    avatarSrc: "/avatars/catnose.jpg",
    sources: [
      "https://zenn.dev/feed",
      "https://qiita.com/popular-items/feed",
    ],
    includeUrlRegex: ["zenn.dev", "qiita.com"],
  },

];
