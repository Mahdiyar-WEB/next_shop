import { Product } from "types/productType";
import { adminServices } from "./admin-services";
import { apiClient } from "./client";

export const productServices = {
  getAll: (query = "", signal?: AbortSignal) =>
    apiClient.get<{
      products: Product[];
      similarProducts: Product[];
      pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
      };
      tags: string[];
    }>(`/api/products${query ? `?${query}` : ""}`, signal),
  getBySlug: (slug: string) =>
    apiClient.get<{
      product: Product & { isBookmarked: boolean };
      similarProducts: Product[];
    }>(`/api/products/slug/${slug}`),
  like: (id: string) =>
    apiClient.post<{ isLiked: boolean; message: string }>(
      `/api/products/${id}/like`,
    ),
  create: (data: unknown) => adminServices.create("products", data),
  update: (id: string, data: unknown) =>
    adminServices.update("products", id, data),
  remove: (id: string) => adminServices.remove("products", id),
};
