import { useMutation, useQueryClient } from "@tanstack/react-query";

import { paymentServices } from "services/payment-services";
import { queryKeys } from "./query-keys";

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentServices.checkout,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cart,
      });
    },
  });
}
