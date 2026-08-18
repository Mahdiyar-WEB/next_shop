export const queryKeys = {
  categories: (query = "") => ["categories", query] as const,
  products: (query = "") => ["products", query] as const,
  posts: (query = "") => ["posts", query] as const,
  post: (slug: string) => ["posts", slug] as const,
  comments: (query = "") => ["comments", query] as const,
  users: (query = "") => ["users", query] as const,
  me: ["users", "me"] as const,
  cart: ["cart"] as const,
};
