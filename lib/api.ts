import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "./db";
import { User, type Role } from "./models";

const accessSecret = () => process.env.ACCESS_TOKEN_SECRET || "";
const refreshSecret = () => process.env.REFRESH_TOKEN_SECRET || "";
const isProduction = process.env.NODE_ENV === "production";
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export const fail = (error: unknown) =>
  NextResponse.json(
    {
      statusCode: error instanceof ApiError ? error.status : 500,
      message: error instanceof Error ? error.message : "خطای غیرمنتظرهٔ سرور",
    },
    { status: error instanceof ApiError ? error.status : 500 },
  );
export const ok = (data: Record<string, unknown>, status = 200) =>
  NextResponse.json({ statusCode: status, data }, { status });
export const objectId = (value: string) => {
  if (!/^[a-f\d]{24}$/i.test(value))
    throw new ApiError(400, "شناسه نامعتبر است");
  return value;
};
export function issueTokens(response: NextResponse, userId: string) {
  if (!accessSecret() || !refreshSecret())
    throw new ApiError(500, "کلیدهای JWT تنظیم نشده‌اند");
  const common = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: "/",
  };
  response.cookies.set(
    "accessToken",
    jwt.sign({ sub: userId }, accessSecret(), {
      expiresIn: (process.env.ACCESS_TOKEN_TTL ||
        "15m") as jwt.SignOptions["expiresIn"],
    }),
    { ...common, maxAge: 60 * 15 },
  );
  response.cookies.set(
    "refreshToken",
    jwt.sign({ sub: userId }, refreshSecret(), {
      expiresIn: (process.env.REFRESH_TOKEN_TTL ||
        "30d") as jwt.SignOptions["expiresIn"],
    }),
    { ...common, maxAge: 60 * 60 * 24 * 30 },
  );
}
export function clearTokens(response: NextResponse) {
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: "/",
    maxAge: 0,
  };
  response.cookies.set("accessToken", "", options);
  response.cookies.set("refreshToken", "", options);
}
export async function currentUser(request: NextRequest, allowedRoles?: Role[]) {
  await connectToDatabase();
  const token = request.cookies.get("accessToken")?.value;
  if (!token) throw new ApiError(401, "لطفاً وارد حساب کاربری خود شوید");
  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(token, accessSecret()) as jwt.JwtPayload;
  } catch {
    throw new ApiError(401, "توکن نامعتبر یا منقضی شده است");
  }
  const user = await User.findById(payload.sub).select("-otp");
  if (!user) throw new ApiError(401, "کاربر یافت نشد");
  if (allowedRoles && !allowedRoles.includes(user.role))
    throw new ApiError(403, "دسترسی کافی ندارید");
  return user;
}
export async function optionalUser(request: NextRequest) {
  try {
    return await currentUser(request);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
}
export async function body<T>(request: NextRequest) {
  try {
    return (await request.json()) as T;
  } catch {
    throw new ApiError(400, "بدنهٔ درخواست JSON معتبر نیست");
  }
}
