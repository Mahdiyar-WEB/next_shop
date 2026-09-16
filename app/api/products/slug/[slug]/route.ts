import { connectToDatabase } from "lib/db";
import { Product } from "lib/models";
import { ApiError, fail, ok, optionalUser } from "lib/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectToDatabase();

    const { slug } = await params;

    const [product, user] = await Promise.all([
      Product.findOne({
        slug: slug.toLowerCase(),
      })
        .populate("category", "title englishTitle icon")
        .lean(),

      optionalUser(request as never),
    ]);

    if (!product) {
      throw new ApiError(404, "محصول یافت نشد");
    }

    const userId = user?._id.toString();
    const likes = product.likes || [];

    const productCategoryId =
      typeof product.category === "object" &&
      product.category !== null &&
      "_id" in product.category
        ? product.category._id
        : product.category;

    const productBrand = product.brand;

    const similarProductSelect =
      "title slug imageLink price offPrice discount rating numReviews countInStock brand";

    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      category: productCategoryId,
      brand: productBrand,
    })
      .select(similarProductSelect)
      .sort({
        rating: -1,
        createdAt: -1,
      })
      .limit(8)
      .lean();

    if (similarProducts.length < 8) {
      const existingIds = [
        product._id,
        ...similarProducts.map((item) => item._id),
      ];

      const extraProducts = await Product.find({
        _id: { $nin: existingIds },
        category: productCategoryId,
      })
        .select(similarProductSelect)
        .sort({
          rating: -1,
          createdAt: -1,
        })
        .limit(8 - similarProducts.length)
        .lean();

      similarProducts.push(...extraProducts);
    }

    return ok({
      product: {
        ...product,
        isBookmarked: Boolean(
          userId &&
          likes.some((id: { toString(): string }) => id.toString() === userId),
        ),
      },
      similarProducts,
    });
  } catch (error) {
    return fail(error);
  }
}
