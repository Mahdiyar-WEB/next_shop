"use client";

import CheckIcon from "@mui/icons-material/Check";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import type { CartStepNumber } from "./CartContainer";

type Props = {
  step: CartStepNumber;
};

const steps = [
  {
    number: 1 as const,
    title: "سبد خرید",
    icon: ShoppingCartOutlinedIcon,
  },
  {
    number: 2 as const,
    title: "آدرس ارسال",
    icon: LocationOnOutlinedIcon,
  },
  {
    number: 3 as const,
    title: "تسویه حساب",
    icon: CreditCardOutlinedIcon,
  },
  {
    number: 4 as const,
    title: "ثبت موفق",
    icon: DoneOutlinedIcon,
  },
];

const CartStepper = ({ step }: Props) => {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-secondary-100 bg-white px-3 py-5 shadow-sm sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-4xl items-start">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const isCompleted = step > item.number;
          const isCurrent = step === item.number;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={item.number}
              className="flex min-w-0 flex-1 items-start"
            >
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={`flex size-9 items-center justify-center rounded-full border-2 transition-all duration-300 sm:size-11 ${
                    isCompleted
                      ? "border-primary-900 bg-primary-900 text-white"
                      : isCurrent
                        ? "border-primary-900 bg-primary-50 text-primary-900"
                        : "border-secondary-200 bg-white text-secondary-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="text-lg sm:text-xl" />
                  ) : (
                    <Icon className="text-lg sm:text-xl" />
                  )}
                </div>

                <span
                  className={`mt-2 text-center text-[10px] font-medium sm:text-xs ${
                    isCurrent || isCompleted
                      ? "text-primary-900"
                      : "text-secondary-400"
                  }`}
                >
                  {item.title}
                </span>
              </div>

              {!isLast && (
                <div className="mt-4 h-0.5 flex-1 bg-secondary-100 sm:mt-5">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? "w-full bg-primary-900" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartStepper;