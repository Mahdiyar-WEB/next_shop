import { PaymentType } from "types/paymentType";
import { apiClient } from "./client";
import { AddressType } from "types/addressType";

export interface PaymentsResponse {
  payments: PaymentType[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export const paymentServices = {
  checkout: (address: AddressType) =>
    apiClient.post<{
      message: string;
    }>("/api/payments/checkout", address),

  getPayments: (query = "") =>
    apiClient.get<PaymentsResponse>(`/api/payments${query ? `?${query}` : ""}`),
};
