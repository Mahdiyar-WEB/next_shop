import { NextRequest } from "next/server";
import { User } from "types/userType";

export default async function middlewareAuth(req: NextRequest) {
  try {
    let accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!accessToken && refreshToken) {
      const refreshRes = await fetch(
        `${process.env.BASE_URL}/api/auth/refresh`,
        {
          method: "POST",
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        },
      );

      if (refreshRes.ok) {
        const setCookie = refreshRes.headers.get("set-cookie");

        const match = setCookie?.match(/accessToken=([^;]+)/);

        accessToken = match?.[1];
      }
    }

    if (!accessToken) {
      console.log("null1");

      return null;
    }

    const userRes = await fetch(`${process.env.BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    if (!userRes.ok) {
      return null;
    }

    const result = await userRes.json();

    return (result?.data?.user as User) ?? null;
  } catch {
    return null;
  }
}
