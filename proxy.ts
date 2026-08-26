import { NextRequest, NextResponse } from "next/server";
import middlewareAuth from "utils/middlewareAuth";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const user = await middlewareAuth(request);

  if (pathName === "/login" && user && user.isActive) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathName.startsWith("/profile") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login"],
};
