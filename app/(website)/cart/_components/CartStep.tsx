"use client";

import type { Product } from "types/productType";
import type { CartStepNumber } from "./CartContainer";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

type CartProduct = {
  productId: Product;
  quantity: number;
};

type Props = {
  step: CartStepNumber;
  products: CartProduct[];
  onNext: () => void;
  onBack: () => void;
};

const CartStep = ({ step, products, onNext, onBack }: Props) => {
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
                {products.length} کالا
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
      <section>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-secondary-500"
        >
          بازگشت
        </button>
      </section>
    );
  }

  if (step === 3) {
    return (
      <section>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-secondary-500"
        >
          بازگشت
        </button>
      </section>
    );
  }

  return <section />;
};

export default CartStep;