"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartServices } from "../services/cart-services";
import { queryKeys } from "./query-keys";
export function useCart() {
  return useQuery({ queryKey: queryKeys.cart, queryFn: cartServices.get });
}
export function useCartMutation<TData, TVariables>(
  mutationFn: (input: TVariables) => Promise<TData>,
) {
  const client = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.cart }),
  });
}
export function useAddToCart() {
  return useCartMutation(cartServices.addProduct);
}
export function useRemoveFromCart() {
  return useCartMutation(cartServices.removeProduct);
}
export function useApplyCoupon() {
  return useCartMutation(cartServices.applyCoupon);
}
export function useRemoveCoupon() {
  return useCartMutation(() => cartServices.removeCoupon());
}
