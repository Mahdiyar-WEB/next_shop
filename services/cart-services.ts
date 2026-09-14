import { Cart, User } from "types/userType";
import { apiClient } from "./client";

export const cartServices = {
  get: () => apiClient.get<{ cart: Cart }>("/api/cart"),
  addProduct: (productId: string) =>
    apiClient.post<{ cart: Cart; user: User }>("/api/cart", { productId }),
  applyCoupon: (couponCode: string) =>
    apiClient.post<{ cart: Cart }>("/api/cart", { couponCode }),
  removeProduct: (productId: string) =>
    apiClient.delete<{ cart: Cart }>("/api/cart", { productId }),
  removeCoupon: () =>
    apiClient.delete<{ cart: Cart }>("/api/cart", { removeCoupon: true }),
};
