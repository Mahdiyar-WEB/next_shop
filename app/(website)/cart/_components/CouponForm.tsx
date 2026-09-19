"use client";

import { useState } from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Button from "components/common/Button";
import Textfield from "components/common/TextField";
import { useApplyCoupon, useCart, useRemoveCoupon } from "hooks/use-cart";

const CouponForm = () => {
  const [couponCode, setCouponCode] = useState("");

  const { data } = useCart();
  const applyCoupon = useApplyCoupon();
  const removeCoupon = useRemoveCoupon();

  const coupon = data?.cart.coupon;

  if (coupon) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-xs text-emerald-700">
            <LocalOfferOutlinedIcon className="text-base" />

            <span className="truncate">کد تخفیف: {coupon}</span>
          </div>

          <button
            type="button"
            disabled={removeCoupon.isPending}
            onClick={() => removeCoupon.mutate()}
            className="flex size-7 shrink-0 items-center justify-center rounded-lg text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
            aria-label="حذف کد تخفیف"
          >
            <CloseIcon className="text-base" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-xs font-medium text-secondary-600">
        <LocalOfferOutlinedIcon className="text-base" />
        کد تخفیف دارید؟
      </p>

      <div className="flex gap-2">
        <Textfield
          label="کد تخفیف"
          value={couponCode}
          onChange={(event) => setCouponCode(event.target.value)}
          disabled={applyCoupon.isPending}
          className="min-w-0 flex-1"
        />

        <Button
          type="button"
          variant="outline"
          disabled={!couponCode.trim() || applyCoupon.isPending}
          onClick={() => {
            applyCoupon.mutate(couponCode.trim(), {
              onSuccess: () => setCouponCode(""),
            });
          }}
          className="shrink-0 px-4"
        >
          اعمال
        </Button>
      </div>
    </div>
  );
};

export default CouponForm;
