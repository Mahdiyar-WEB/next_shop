"use client";

import { useCart } from "hooks/use-cart";
import Button from "components/common/Button";
import formatPrice from "utils/formatPrice";
import toPersianDigits from "utils/toPersianDigits";
import CouponForm from "./CouponForm";

type Props = {
  onNext: () => void;
};

const CartSummary = ({ onNext }: Props) => {
  const { data } = useCart();

  const products = data?.cart.products ?? [];

  const totalItems = products.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const totalPrice = products.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const totalDiscount = products.reduce(
    (sum, item) =>
      sum + (item.productId.price - item.productId.offPrice) * item.quantity,
    0,
  );

  const finalPrice = products.reduce(
    (sum, item) => sum + item.productId.offPrice * item.quantity,
    0,
  );

  return (
    <aside className="lg:sticky lg:top-5">
      <div className="rounded-2xl border border-secondary-100 bg-white p-4 sm:p-5">
        <h2 className="text-sm font-bold text-secondary-950 sm:text-base">
          خلاصه سفارش
        </h2>

        <div className="mt-5 space-y-4 text-xs sm:text-sm">
          <div className="flex items-center justify-between text-secondary-500">
            <span>تعداد کالا</span>
            <span>{toPersianDigits(totalItems)}</span>
          </div>

          <div className="flex items-center justify-between text-secondary-500">
            <span>مبلغ کل</span>
            <span>{formatPrice(totalPrice)} تومان</span>
          </div>

          {totalDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-600">
              <span>تخفیف</span>
              <span>
                {formatPrice(totalDiscount)} تومان
              </span>
            </div>
          )}
        </div>

        <div className="my-5 border-t border-dashed border-secondary-200" />

        <CouponForm />

        <div className="my-5 border-t border-secondary-200" />

        <div className="flex items-end justify-between gap-3">
          <span className="text-xs font-medium text-secondary-500">
            مبلغ قابل پرداخت
          </span>

          <div className="text-end">
            <span className="text-lg font-extrabold tracking-tight text-secondary-950 sm:text-xl">
              {formatPrice(finalPrice)}
            </span>
            <span className="ms-1 text-[10px] text-secondary-500">
              تومان
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={onNext}
          className="mt-5 w-full"
          variant="primary"
        >
          ادامه خرید
        </Button>
      </div>
    </aside>
  );
};

export default CartSummary;