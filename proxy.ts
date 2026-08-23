import { NextRequest, NextResponse } from "next/server";
import middlewareAuth from "utils/middlewareAuth";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const user = await middlewareAuth(request);
  console.log('hi');
  

  if (pathName === "/login" && user) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (pathName.startsWith("/profile") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login"],
};
