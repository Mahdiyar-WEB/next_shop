import { apiClient } from "./client";

export type Pagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export type AdminResource =
  | "categories"
  | "products"
  | "coupons"
  | "payments"
  | "users"
  | "posts"
  | "comments";
  
export const adminServices = {
  list: <T>(resource: AdminResource, query = "") =>
    apiClient.get<Record<string, T[] | Pagination>>(
      `/api/admin/${resource}${query ? `?${query}` : ""}`,
    ),
  create: <T>(
    resource: Exclude<AdminResource, "payments" | "users">,
    data: unknown,
  ) => apiClient.post<Record<string, T>>(`/api/admin/${resource}`, data),
  update: <T>(resource: AdminResource, id: string, data: unknown) =>
    apiClient.patch<Record<string, T>>(`/api/admin/${resource}/${id}`, data),
  remove: (resource: AdminResource, id: string) =>
    apiClient.delete<{ message: string }>(`/api/admin/${resource}/${id}`),
};
