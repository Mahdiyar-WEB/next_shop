import { useMutation } from "@tanstack/react-query";
import { userServices } from "services/user-services";

export function useCompleteProfile() {
  return useMutation({
    mutationFn: userServices.completeProfile,
  });
}
