import { connectToDatabase } from "lib/db";
import { Category, Product } from "lib/models";
import { fail, ok, optionalUser } from "lib/api";
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url),
      page = Math.max(1, Number(url.searchParams.get("page")) || 1),
      limit = Math.min(
        100,
        Math.max(1, Number(url.searchParams.get("limit")) || 12),
      );
    const filter: Record<string, unknown> = {};
    const search = url.searchParams.get("search"),
      category = url.searchParams.get("category");
    if (search) filter.$text = { $search: search };
    if (category) {
      const slugs = category.split(",").filter(Boolean);
      const ids = await Category.find({
        englishTitle: { $in: slugs },
      }).distinct("_id");
      filter.category = { $in: ids };
    }
    const sortValue = url.searchParams.get("sort");
    const sort: Record<string, 1 | -1> =
      sortValue === "latest"
        ? { createdAt: -1 }
        : sortValue === "popular"
          ? { likes: -1 }
          : sortValue === "price_asc"
            ? { offPrice: 1 }
            : sortValue === "price_desc"
              ? { offPrice: -1 }
              : { createdAt: -1 };
    const [products, totalItems, user] = await Promise.all([
      Product.find(filter)
        .populate("category", "title englishTitle")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
      optionalUser(request as never),
    ]);
    const userId = user?._id.toString();
    return ok({
      products: products.map(({ likes = [], ...product }) => ({
        ...product,
        likesCount: likes.length,
        isLiked: Boolean(
          userId &&
          likes.some((id: { toString(): string }) => id.toString() === userId),
        ),
      })),
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        hasNextPage: page * limit < totalItems,
      },
    });
  } catch (error) {
    return fail(error);
  }
}
