"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryServices } from "../../services/category-services";
import { queryKeys } from "../query-keys";
export function useCategories(query = "") {
  return useQuery({
    queryKey: queryKeys.categories(query),
    queryFn: () => categoryServices.getAll(query),
    staleTime: 5 * 60_000,
  });
}
function useCategoryMutation<T>(mutationFn: (input: T) => Promise<unknown>) {
  const client = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => client.invalidateQueries({ queryKey: ["categories"] }),
  });
}
export function useCreateCategory() {
  return useCategoryMutation(categoryServices.create);
}
export function useUpdateCategory() {
  return useCategoryMutation(({ id, data }: { id: string; data: unknown }) =>
    categoryServices.update(id, data),
  );
}
export function useDeleteCategory() {
  return useCategoryMutation((id: string) => categoryServices.remove(id));
}
