import { User } from "types/userType";
import { apiClient } from "./client";

export const authentication = {
  requestOtp: (phoneNumber: string) =>
    apiClient.post<{
      phoneNumber: string;
      expiresIn: number;
      code?: string;
      message: string;
    }>("/api/auth/request-otp", { phoneNumber }),
  verifyOtp: (phoneNumber: string, code: string) =>
    apiClient.post<{
      user: User;
      needsProfileCompletion: boolean;
      message: string;
    }>("/api/auth/verify-otp", { phoneNumber, code }),
  refresh: () => apiClient.post<{ user: unknown }>("/api/auth/refresh"),
  logout: () => apiClient.post<{ auth: boolean }>("/api/auth/logout"),
};
