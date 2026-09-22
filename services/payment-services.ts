import { apiClient } from "./client";
import { AddressType } from "types/addressType";

export const paymentServices = {
  checkout: (address: AddressType) =>
    apiClient.post<{
      message: string;
    }>("/api/payments/checkout", address),
};
