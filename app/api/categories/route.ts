import { connectToDatabase } from "lib/db";
import { Category } from "lib/models";
import { fail, ok } from "lib/api";
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const type = new URL(request.url).searchParams.get("type");
    const categories = await Category.find(type ? { type } : {}).sort({
      title: 1,
    });
    return ok({ categories });
  } catch (error) {
    return fail(error);
  }
}
 