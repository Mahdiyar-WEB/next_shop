import { apiClient } from "./client";

export const cartServices = {
  get: () => apiClient.get<{ cart: unknown }>("/api/cart"),
  addProduct: (productId: string) =>
    apiClient.post<{ cart: unknown }>("/api/cart", { productId }),
  applyCoupon: (couponCode: string) =>
    apiClient.post<{ cart: unknown }>("/api/cart", { couponCode }),
  removeProduct: (productId: string) =>
    apiClient.delete<{ cart: unknown }>("/api/cart", { productId }),
  removeCoupon: () =>
    apiClient.delete<{ cart: unknown }>("/api/cart", { removeCoupon: true }),
};
