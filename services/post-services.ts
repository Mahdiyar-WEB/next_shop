import { adminServices } from "./admin-services";
import { apiClient } from "./client";

export const postServices = {
  getAll: (query = "") =>
    apiClient.get<{ posts: unknown[]; pagination: unknown }>(
      `/api/posts${query ? `?${query}` : ""}`,
    ),
  getBySlug: (slug: string) =>
    apiClient.get<{ post: unknown }>(`/api/posts/${slug}`),
  create: (data: unknown) =>
    apiClient.post<{ post: unknown }>("/api/posts", data),
  update: (id: string, data: unknown) =>
    adminServices.update("posts", id, data),
  remove: (id: string) => adminServices.remove("posts", id),
};
