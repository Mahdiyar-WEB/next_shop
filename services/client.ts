type ApiEnvelope<T> = {
  statusCode: number;
  data: T;
  message?: string;
};

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const ME_ENDPOINT = "/api/users/me";
const REFRESH_ENDPOINT = "/api/auth/refresh";

async function request<T>(
  path: string,
  init: RequestInit = {},
  options: {
    isRetry?: boolean;
  } = {},
): Promise<T> {
  const headers = new Headers(init.headers);

  if (
    init.body &&
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + path, {
    ...init,
    headers,
    credentials: "include",
  });

  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;

  if (response.status === 401 && path === ME_ENDPOINT && !options.isRetry) {
    try {
      const refreshResponse = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + REFRESH_ENDPOINT,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (refreshResponse.ok) {
        return request<T>(path, init, {
          isRetry: true,
        });
      }
    } catch {
      // Refresh failed → continue to original 401 error
    }
  }

  if (!response.ok) {
    throw new ApiClientError(
      payload.message || "خطا در ارتباط با سرور",
      response.status,
    );
  }

  return payload.data;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),

  post: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data ?? {}),
    }),

  patch: <T>(path: string, data: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: "DELETE",
      body: JSON.stringify(data ?? {}),
    }),
};
