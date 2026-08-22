import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const generateSSRCookies = (cookies: ReadonlyRequestCookies): string => {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");

  return [
    accessToken && `${accessToken.name}=${accessToken.value}`,
    refreshToken && `${refreshToken.name}=${refreshToken.value}`,
  ]
    .filter(Boolean)
    .join("; ");
};

export default generateSSRCookies;
