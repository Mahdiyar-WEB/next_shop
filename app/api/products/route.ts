import { connectToDatabase } from "lib/db";
import { Category, Product } from "lib/models";
import { fail, ok, optionalUser } from "lib/api";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);

    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

    const limit = Math.min(
      100,
      Math.max(1, Number(url.searchParams.get("limit")) || 12),
    );

    const filter: Record<string, unknown> = {};

    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");
    const tags = url.searchParams.get("tags");
    const sortValue = url.searchParams.get("sort");

    if (search) {
      filter.$text = {
        $search: search,
      };
    }

    if (tags) {
      const tagList = tags.split(",").filter(Boolean);

      filter.tags = {
        $in: tagList,
      };
    }

    let categoryIds: unknown[] = [];

    if (category) {
      const slugs = category.split(",").filter(Boolean);

      categoryIds = await Category.find({
        englishTitle: {
          $in: slugs,
        },
      }).distinct("_id");

      filter.category = {
        $in: categoryIds,
      };
    }

    const sort: Record<string, 1 | -1> =
      sortValue === "latest"
        ? { createdAt: -1 }
        : sortValue === "earliest"
          ? { createdAt: 1 }
          : sortValue === "popular"
            ? { rating: -1 }
            : sortValue === "price_asc"
              ? { offPrice: 1 }
              : sortValue === "price_desc"
                ? { offPrice: -1 }
                : { createdAt: -1 };

    const [products, totalItems, user, tagsResult] = await Promise.all([
      Product.find(filter)
        .populate("category", "title englishTitle")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),

      optionalUser(request as never),

      Product.aggregate([
        {
          $match: category
            ? {
                category: {
                  $in: categoryIds,
                },
              }
            : {},
        },
        {
          $unwind: "$tags",
        },
        {
          $group: {
            _id: "$tags",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            _id: 0,
            tag: "$_id",
          },
        },
      ]),
    ]);

    let similarProducts: typeof products = [];

    if (search && products.length === 0 && search.trim().length >= 3) {
      const searchTerms = search.trim().split(/\s+/).filter(Boolean);

      const similarFilter = {
        $or: [
          ...searchTerms.map((term) => ({
            title: {
              $regex: term,
              $options: "i",
            },
          })),

          ...searchTerms.map((term) => ({
            slug: {
              $regex: term,
              $options: "i",
            },
          })),

          ...searchTerms.map((term) => ({
            brand: {
              $regex: term,
              $options: "i",
            },
          })),
        ],
      };

      similarProducts = await Product.find(similarFilter)
        .populate("category", "title englishTitle")
        .sort({
          rating: -1,
          createdAt: -1,
        })
        .limit(3)
        .lean();
    }

    const userId = user?._id.toString();

    const mapProducts = (
      items: Array<{
        likes?: Array<{ toString(): string }>;
        [key: string]: any;
      }>,
    ) =>
      items.map(({ likes = [], ...product }) => ({
        ...product,
        likesCount: likes.length,

        isLiked: Boolean(
          userId &&
          likes.some((id: { toString(): string }) => id.toString() === userId),
        ),
      }));

    return ok({
      products: mapProducts(products),

      similarProducts: mapProducts(similarProducts),

      tags: tagsResult.map((item) => item.tag),

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
