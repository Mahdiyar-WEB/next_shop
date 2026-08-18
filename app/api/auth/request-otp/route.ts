import crypto from "crypto";
import { connectToDatabase } from "lib/db";
import { User } from "lib/models";
import { ApiError, body, fail, ok } from "lib/api";

const phonePattern = /^09\d{9}$/;
export async function POST(request: Request) {
  try {
    const { phoneNumber } = await body<{ phoneNumber?: string }>(request as never);
    if (!phoneNumber || !phonePattern.test(phoneNumber.trim())) throw new ApiError(400, "شمارهٔ موبایل معتبر نیست");
    await connectToDatabase();
    const code = String(crypto.randomInt(100000, 1000000));
    const codeHash = crypto.createHash("sha256").update(code).digest("hex");
    await User.findOneAndUpdate({ phoneNumber: phoneNumber.trim() }, { $set: { otp: { codeHash, expiresAt: new Date(Date.now() + 90_000), attempts: 0 } } }, { new: true, upsert: true, setDefaultsOnInsert: true });
    if (process.env.OTP_TEST_MODE === "true") return ok({ message: "کد تأیید ارسال شد", expiresIn: 90_000, phoneNumber: phoneNumber.trim(), code });
    const key = process.env.KAVENEGAR_API_KEY;
    if (!key) throw new ApiError(500, "KAVENEGAR_API_KEY تنظیم نشده است");
    const payload = new URLSearchParams({ receptor: phoneNumber.trim(), token: code, template: process.env.KAVENEGAR_OTP_TEMPLATE || "registerVerify" });
    const response = await fetch(`https://api.kavenegar.com/v1/${key}/verify/lookup.json`, { method: "POST", body: payload, cache: "no-store" });
    if (!response.ok) throw new ApiError(502, "ارسال کد تأیید ناموفق بود");
    return ok({ message: "کد تأیید ارسال شد", expiresIn: 90_000, phoneNumber: phoneNumber.trim() });
  } catch (error) { return fail(error); }
}
