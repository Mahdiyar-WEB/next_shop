import { connectToDatabase } from "lib/db";
import { Product } from "lib/models";
import { ApiError, fail, ok, optionalUser } from "lib/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectToDatabase();

    const [product, user] = await Promise.all([
      Product.findOne({
        slug: (await params).slug.toLowerCase(),
      })
        .populate("category", "title englishTitle icon")
        .lean(),
      optionalUser(request as never),
    ]);

    if (!product) throw new ApiError(404, "محصول یافت نشد");

    const userId = user?._id.toString();
    const likes = product.likes || [];

    return ok({
      product: {
        ...product,
        isBookmarked: Boolean(
          userId &&
          likes.some((id: { toString(): string }) => id.toString() === userId),
        ),
      },
    });
  } catch (error) {
    return fail(error);
  }
}
