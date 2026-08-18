import { body, currentUser, fail, ok, ApiError } from "lib/api";
import { User } from "lib/models";
export async function GET(request: Request) {
  try {
    const user = await currentUser(request as never);
    return ok({ user });
  } catch (error) {
    return fail(error);
  }
}
export async function PATCH(request: Request) {
  try {
    const user = await currentUser(request as never);
    const data = await body<{
      name?: string;
      email?: string;
      biography?: string;
    }>(request as never);
    if (data.email) {
      const exists = await User.exists({
        email: data.email.toLowerCase(),
        _id: { $ne: user._id },
      });
      if (exists) throw new ApiError(409, "این ایمیل قبلاً ثبت شده است");
    }
    Object.assign(user, data);
    await user.save();
    return ok({ message: "پروفایل به‌روزرسانی شد", user });
  } catch (error) {
    return fail(error);
  }
}
