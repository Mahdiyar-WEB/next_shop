import { NextRequest, NextResponse } from "next/server";
import middlewareAuth from "utils/middlewareAuth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const user = await middlewareAuth(request);

  if (pathname === "/login" && user?.isActive) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/admin") && (!user || user.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard") && (!user || user.role !== "USER")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
