"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authentication } from "../services/authentication";
import { userServices } from "../services/user-services";
import { queryKeys } from "./query-keys";
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: userServices.me,
    staleTime: 5 * 60_000,
  });
}
export function useRequestOtp() {
  return useMutation({ mutationFn: authentication.requestOtp });
}
export function useVerifyOtp() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      phoneNumber,
      code,
    }: {
      phoneNumber: string;
      code: string;
    }) => authentication.verifyOtp(phoneNumber, code),
    onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.me }),
  });
}
export function useLogout() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: authentication.logout,
    onSuccess: () => client.removeQueries({ queryKey: queryKeys.me }),
  });
}
