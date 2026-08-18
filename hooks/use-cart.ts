"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; import { cartServices } from "api/cart-services"; import { queryKeys } from "./query-keys";
export function useCart() { return useQuery({ queryKey: queryKeys.cart, queryFn: cartServices.get }); }
export function useCartMutation<T>(mutationFn: (input: T) => Promise<unknown>) { const client = useQueryClient(); return useMutation({ mutationFn, onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.cart }) }); }
export function useAddToCart() { return useCartMutation(cartServices.addProduct); }
export function useRemoveFromCart() { return useCartMutation(cartServices.removeProduct); }
export function useApplyCoupon() { return useCartMutation(cartServices.applyCoupon); }
export function useRemoveCoupon() { return useCartMutation(() => cartServices.removeCoupon()); }
