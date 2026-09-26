import { connectToDatabase } from "lib/db";
import { Payment } from "lib/models";
import { fail, ok, optionalUser } from "lib/api";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const user = await optionalUser(request as never);

    if (!user) {
      return fail("Unauthorized");
    }

    const url = new URL(request.url);

    const page = Math.max(
      1,
      Number(url.searchParams.get("page")) || 1,
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        Number(url.searchParams.get("limit")) || 12,
      ),
    );

    const filter = {
      user: user._id,
    };

    const [payments, totalItems] = await Promise.all([
      Payment.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Payment.countDocuments(filter),
    ]);

    return ok({
      payments,

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