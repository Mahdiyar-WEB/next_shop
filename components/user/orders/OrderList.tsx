"use client";

import { PaymentType } from "types/paymentType";
import OrderCard from "./OrderCard";

type Props = {
  payments: PaymentType[];
};

const OrderList = ({ payments }: Props) => {
  if (payments.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-secondary-200 bg-white px-6 text-center shadow-sm">
        <div className="flex size-16 items-center justify-center rounded-3xl bg-blue-50 text-primary-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 14.25h6m-6 3h6m3.75-9.75v10.125A2.625 2.625 0 0 1 16.125 20.25H7.875a2.625 2.625 0 0 1-2.625-2.625V6.375A2.625 2.625 0 0 1 7.875 3.75h4.125l4.5 3.75h-.75Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3.75v3.75h4.5"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-base font-bold text-secondary-900">
          هنوز سفارشی ثبت نکرده‌اید
        </h2>

        <p className="mt-2 text-sm text-secondary-500">
          سفارش‌های شما پس از خرید در این بخش نمایش داده می‌شوند.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <OrderCard key={payment._id} payment={payment} />
      ))}
    </div>
  );
};

export default OrderList;
