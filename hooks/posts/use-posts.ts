"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; import { postServices } from "api/post-services"; import { queryKeys } from "../query-keys";
export function usePosts(query = "") { return useQuery({ queryKey: queryKeys.posts(query), queryFn: () => postServices.getAll(query) }); }
export function usePost(slug: string) { return useQuery({ queryKey: queryKeys.post(slug), queryFn: () => postServices.getBySlug(slug), enabled: Boolean(slug) }); }
function usePostMutation<T>(mutationFn: (input: T) => Promise<unknown>) { const client = useQueryClient(); return useMutation({ mutationFn, onSuccess: () => client.invalidateQueries({ queryKey: ["posts"] }) }); }
export function useCreatePost() { return usePostMutation(postServices.create); }
export function useUpdatePost() { return usePostMutation(({ id, data }: { id: string; data: unknown }) => postServices.update(id, data)); }
export function useDeletePost() { return usePostMutation((id: string) => postServices.remove(id)); }
