"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; import { productServices } from "api/product-services"; import { queryKeys } from "../query-keys";
export function useProducts(query = "") { return useQuery({ queryKey: queryKeys.products(query), queryFn: () => productServices.getAll(query), staleTime: 60_000 }); }
export function useProduct(slug: string) { return useQuery({ queryKey: ["products", slug], queryFn: () => productServices.getBySlug(slug), enabled: Boolean(slug) }); }
export function useLikeProduct() { const client = useQueryClient(); return useMutation({ mutationFn: productServices.like, onSuccess: () => client.invalidateQueries({ queryKey: ["products"] }) }); }
