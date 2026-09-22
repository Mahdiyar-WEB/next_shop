"use client";

import { useState } from "react";
import { useCart } from "hooks/use-cart";
import CartStep from "./CartStep";
import CartStepper from "./CartStepper";
import { AddressType } from "types/addressType";
import { useCheckout } from "hooks/use-payment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type CartStepNumber = 1 | 2 | 3 | 4;

const CartContainer = () => {
  const [step, setStep] = useState<CartStepNumber>(1);
  const [address, setAddress] = useState<AddressType | null>(null);
  const router = useRouter();

  const { data, isLoading, isError } = useCart();
  const { mutateAsync: checkout } = useCheckout();

  const handleSubmit = () => {
    if (!!address) {
      checkout(address, {
        onSuccess: (data) => {
          toast.success(data.message);
          setStep(4);
          setTimeout(() => {
            router.replace("/dashboard");
          }, 3000);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-900" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-100 items-center justify-center text-sm text-error">
        دریافت اطلاعات سبد خرید با خطا مواجه شد.
      </div>
    );
  }

  const products = data.cart.products;

  return (
    <div className="py-5 sm:py-8">
      <CartStepper step={step} />

      <CartStep
        step={step}
        products={products}
        address={address}
        onAddressSubmit={(values) => {
          setAddress(values);
          setStep(3);
        }}
        onNext={() =>
          setStep((current) => Math.min(current + 1, 4) as CartStepNumber)
        }
        onBack={() =>
          setStep((current) => Math.max(current - 1, 1) as CartStepNumber)
        }
        submitPayment={handleSubmit}
      />
    </div>
  );
};

export default CartContainer;
