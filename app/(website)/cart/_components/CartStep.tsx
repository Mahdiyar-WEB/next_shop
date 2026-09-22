"use client";

import type { CartStepNumber } from "./CartContainer";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import AddressStep from "./AddressStep";
import { AddressType } from "types/addressType";
import { CartProductDetails } from "types/userType";
import Button from "components/common/Button";
import toPersianDigits from "utils/toPersianDigits";

type Props = {
  step: CartStepNumber;
  products: CartProductDetails[];
  address: AddressType | null;
  onAddressSubmit: (values: AddressType) => void;
  onNext: () => void;
  onBack: () => void;
  submitPayment: () => void;
};

const CartStep = ({
  step,
  products,
  address,
  onAddressSubmit,
  onNext,
  onBack,
  submitPayment
}: Props) => {
  if (step === 1) {
    if (!products.length) {
      return <EmptyCart />;
    }

    return (
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="min-w-0 rounded-2xl border border-secondary-100 bg-white">
          <div className="border-b border-secondary-100 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-bold text-secondary-950 sm:text-lg">
                سبد خرید
              </h1>

              <span className="text-xs text-secondary-500 sm:text-sm">
                {toPersianDigits(products.length)} کالا
              </span>
            </div>
          </div>

          <div className="divide-y divide-secondary-100">
            {products.map((item) => (
              <CartItem
                key={item.productId._id}
                product={item.productId}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        <CartSummary onNext={onNext} />
      </section>
    );
  }

  if (step === 2) {
    return (
      <AddressStep address={address} onNext={onAddressSubmit} onBack={onBack} />
    );
  }

  if (step === 3) {
    return (
      <section className="rounded-2xl border border-secondary-100 bg-white p-6">
        <h2 className="text-lg font-bold">تسویه حساب</h2>

        <div className="mt-6 rounded-xl bg-secondary-50 p-4">
          <p>{address?.province}</p>
          <p>{address?.city}</p>
          <p>{address?.street}</p>
          <p>
            پلاک {address?.plaque}
            {" - "}
            واحد {address?.unit}
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            بازگشت
          </Button>

          <Button type="button" onClick={submitPayment}>
            ثبت سفارش
          </Button>
        </div>
      </section>
    );
  }
  return (
    <section className="rounded-2xl border border-secondary-100 bg-white p-10 text-center">
      <h2 className="text-xl font-bold text-primary-900">
        سفارش با موفقیت ثبت شد
      </h2>

      <p className="mt-3 text-secondary-500">از خرید شما متشکریم.</p>
    </section>
  );
};

export default CartStep;
