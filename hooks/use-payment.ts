import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { paymentServices } from "services/payment-services";
import { queryKeys } from "./query-keys";

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentServices.checkout,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
}

export function usePayments(query = "") {
  return useQuery({
    queryKey: queryKeys.payments(query),
    queryFn: () => paymentServices.getPayments(query),
  });
}
