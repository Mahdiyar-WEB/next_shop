import { adminServices } from "./admin-services";
export const commentServices = { getAll: (query = "") => adminServices.list<unknown>("comments", query), update: (id: string, data: unknown) => adminServices.update("comments", id, data), remove: (id: string) => adminServices.remove("comments", id) };
