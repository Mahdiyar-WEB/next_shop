import { Product } from "types/productType";
import { adminServices } from "./admin-services";
import { apiClient } from "./client";

export const productServices = {
  getAll: (query = "") =>
    apiClient.get<{
      products: Product[];
      pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
      };
      tags: string[];
    }>(`/api/products${query ? `?${query}` : ""}`),
  getBySlug: (slug: string) =>
    apiClient.get<{ product: Product & { isBookmarked: boolean } }>(
      `/api/products/slug/${slug}`,
    ),
  like: (id: string) =>
    apiClient.post<{ isLiked: boolean }>(`/api/products/${id}/like`),
  create: (data: unknown) => adminServices.create("products", data),
  update: (id: string, data: unknown) =>
    adminServices.update("products", id, data),
  remove: (id: string) => adminServices.remove("products", id),
};
