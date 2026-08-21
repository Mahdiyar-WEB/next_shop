import { adminServices } from "./admin-services";
import { apiClient } from "./client";

type CompleteProfilePayload = {
  name: string;
  email: string;
};

export const userServices = {
  me: () => apiClient.get<{ user: unknown }>("/api/users/me"),
  updateMe: (data: unknown) =>
    apiClient.patch<{ user: unknown }>("/api/users/me", data),
  completeProfile: (data: CompleteProfilePayload) =>
    apiClient.post<{ user: unknown; message: string }>(
      "/api/users/complete-profile",
      data,
    ),
  getAll: (query = "") => adminServices.list<unknown>("users", query),
  update: (id: string, data: unknown) =>
    adminServices.update("users", id, data),
  remove: (id: string) => adminServices.remove("users", id),
};
