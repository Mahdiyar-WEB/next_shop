"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; import { commentServices } from "api/comment-services"; import { queryKeys } from "../query-keys";
export function useComments(query = "") { return useQuery({ queryKey: queryKeys.comments(query), queryFn: () => commentServices.getAll(query) }); }
export function useUpdateComment() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, data }: { id: string; data: unknown }) => commentServices.update(id, data), onSuccess: () => client.invalidateQueries({ queryKey: ["comments"] }) }); }
export function useDeleteComment() { const client = useQueryClient(); return useMutation({ mutationFn: commentServices.remove, onSuccess: () => client.invalidateQueries({ queryKey: ["comments"] }) }); }
