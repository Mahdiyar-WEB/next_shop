"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productServices } from "../../services/product-services";
import { queryKeys } from "../query-keys";
export function useProducts(query = "") {
  return useQuery({
    queryKey: queryKeys.products(query),
    queryFn: ({ signal }) => productServices.getAll(query, signal),
    staleTime: 60_000,
  });
}
export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => productServices.getBySlug(slug),
    enabled: Boolean(slug),
  });
}
export function useProductById(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productServices.getById(id),
    enabled: Boolean(id),
  });
}
export function useLikeProduct() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: productServices.like,
    onSuccess: () => client.invalidateQueries({ queryKey: ["products"] }),
  });
}
