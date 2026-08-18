import crypto from "crypto";
import { connectToDatabase } from "lib/db";
import { Coupon, Payment, Product, User } from "lib/models";
import { ApiError, currentUser, fail, ok } from "lib/api";

type CartItem = {
  productId: { _id: { toString(): string }; title: string; price: number; offPrice: number; discount: number; countInStock: number };
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const user = await currentUser(request as never);
    await connectToDatabase();
    await user.populate("cart.products.productId", "title price offPrice discount countInStock");
    const cart = user.get("cart") as { products: CartItem[]; coupon?: { toString(): string } | null };
    if (!cart.products.length) throw new ApiError(400, "سبد خرید خالی است");
    const unavailable = cart.products.find(({ productId, quantity }) => productId.countInStock < quantity);
    if (unavailable) throw new ApiError(400, `موجودی «${unavailable.productId.title}» کافی نیست`);

    const coupon = cart.coupon ? await Coupon.findById(cart.coupon) : null;
    const couponIsUsable = Boolean(coupon && coupon.isActive && coupon.usageCount < coupon.usageLimit && (!coupon.expireDate || coupon.expireDate >= new Date()));
    const couponProductIds = new Set((coupon?.productIds || []).map((id: { toString(): string }) => id.toString()));
    const lines = cart.products.map(({ productId, quantity }) => {
      let unitPrice = productId.offPrice;
      if (couponIsUsable && !productId.discount && couponProductIds.has(productId._id.toString())) unitPrice = coupon?.type === "percent" ? Math.floor(productId.price * (1 - coupon.amount / 100)) : Math.max(0, productId.price - (coupon?.amount || 0));
      return { productId: productId._id, title: productId.title, quantity, price: unitPrice };
    });
    const amount = lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = await Payment.create({ invoiceNumber: `INV-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`, authority: crypto.randomUUID(), amount, user: user._id, description: lines.map((item) => item.title).join(" - "), paymentDate: new Date(), status: "COMPLETED", isPaid: true, cart: { products: lines, coupon: couponIsUsable ? coupon?._id : null } });

    await Product.bulkWrite(lines.map((item) => ({ updateOne: { filter: { _id: item.productId, countInStock: { $gte: item.quantity } }, update: { $inc: { countInStock: -item.quantity } } } })));
    await User.updateOne({ _id: user._id }, { $addToSet: { Products: { $each: lines.map((item) => item.productId) } }, $set: { cart: { products: [], coupon: null } } });
    if (couponIsUsable) await Coupon.updateOne({ _id: coupon?._id }, { $inc: { usageCount: 1 } });
    return ok({ message: "سفارش با موفقیت ثبت و تکمیل شد", payment });
  } catch (error) {
    return fail(error);
  }
}
