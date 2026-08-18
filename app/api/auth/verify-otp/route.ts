import crypto from "crypto";
import { connectToDatabase } from "lib/db";
import { User } from "lib/models";
import { ApiError, body, fail, issueTokens, ok } from "lib/api";

export async function POST(request: Request) {
  try {
    const { phoneNumber, code } = await body<{ phoneNumber?: string; code?: string }>(request as never);
    if (!phoneNumber || !code) throw new ApiError(400, "شمارهٔ موبایل و کد تأیید الزامی هستند");
    await connectToDatabase(); const user = await User.findOne({ phoneNumber });
    const otp = user?.get("otp") as { codeHash?: string; expiresAt?: Date; attempts?: number } | undefined;
    if (!user || !otp?.codeHash || !otp.expiresAt) throw new ApiError(400, "ابتدا کد تأیید دریافت کنید");
    if (otp.expiresAt.getTime() < Date.now()) throw new ApiError(400, "کد تأیید منقضی شده است");
    if ((otp.attempts || 0) >= 5) throw new ApiError(429, "تعداد تلاش‌های ناموفق بیش از حد است");
    const candidate = crypto.createHash("sha256").update(String(code)).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(otp.codeHash))) { await User.updateOne({ _id: user._id }, { $inc: { "otp.attempts": 1 } }); throw new ApiError(400, "کد تأیید صحیح نیست"); }
    user.set({ isVerifiedPhoneNumber: true, otp: undefined }); await user.save();
    const response = ok({ message: user.isActive ? "ورود موفق بود" : "لطفاً اطلاعات پروفایل را تکمیل کنید", user, needsProfileCompletion: !user.isActive }); issueTokens(response, user._id.toString()); return response;
  } catch (error) { return fail(error); }
}
