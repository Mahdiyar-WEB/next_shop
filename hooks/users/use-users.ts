"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userServices } from "../../services/user-services";
import { queryKeys } from "../query-keys";
export function useUsers(query = "") {
  return useQuery({
    queryKey: queryKeys.users(query),
    queryFn: () => userServices.getAll(query),
  });
}
function useUserMutation<T>(mutationFn: (input: T) => Promise<unknown>) {
  const client = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => client.invalidateQueries({ queryKey: ["users"] }),
  });
}
export function useUpdateUser() {
  return useUserMutation(({ id, data }: { id: string; data: unknown }) =>
    userServices.update(id, data),
  );
}
export function useDeleteUser() {
  return useUserMutation((id: string) => userServices.remove(id));
}
