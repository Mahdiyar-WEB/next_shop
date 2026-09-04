import { connectToDatabase } from "lib/db";
import { Category } from "lib/models";
import { ApiError, fail, objectId, ok } from "lib/api";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();
    const category = await Category.findById(objectId((await params).id));
    if (!category) throw new ApiError(404, "دسته‌بندی یافت نشد");
    return ok({ category });
  } catch (error) {
    return fail(error);
  }
}
