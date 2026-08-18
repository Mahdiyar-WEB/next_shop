import jwt from "jsonwebtoken"; import { NextRequest } from "next/server";
import { connectToDatabase } from "lib/db";
import { User } from "lib/models";
import { ApiError, fail, issueTokens, ok } from "lib/api";
export async function POST(request: NextRequest) { try { const token = request.cookies.get("refreshToken")?.value; if (!token) throw new ApiError(401, "توکن تمدید وجود ندارد"); const secret = process.env.REFRESH_TOKEN_SECRET; if (!secret) throw new ApiError(500, "کلید توکن تمدید تنظیم نشده است"); const payload = jwt.verify(token, secret) as jwt.JwtPayload; await connectToDatabase(); const user = await User.findById(payload.sub).select("-otp"); if (!user) throw new ApiError(401, "کاربر یافت نشد"); const response = ok({ user }); issueTokens(response, user._id.toString()); return response; } catch (error) { return fail(error instanceof jwt.JsonWebTokenError ? new ApiError(401, "توکن تمدید نامعتبر است") : error); } }
