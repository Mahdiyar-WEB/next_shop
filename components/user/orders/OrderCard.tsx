"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Badge from "components/common/Badge";
import Button from "components/common/Button";
import toPersianDigits from "utils/toPersianDigits";
import { PaymentType } from "types/paymentType";

type Props = {
  payment: PaymentType;
};

const paymentStatusMap: Record<string, string> = {
  COMPLETED: "پرداخت موفق",
  PENDING: "در انتظار پرداخت",
  FAILED: "پرداخت ناموفق",
  CANCELED: "لغو شده",
};

const paymentMethodMap: Record<string, string> = {
  ZARINPAL: "زرین‌پال",
};

const formatPrice = (price: number) => {
  return `${toPersianDigits(price.toLocaleString("fa-IR"))} تومان`;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const OrderCard = ({ payment }: Props) => {
  console.log("🚀 ~ OrderCard ~ payment:", payment.address);
  const [isExpanded, setIsExpanded] = useState(false);

  const statusTitle = paymentStatusMap[payment.status] || payment.status;

  const paymentMethod =
    paymentMethodMap[payment.paymentMethod] || payment.paymentMethod;

  const productsCount = payment.cart.products.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <article className="overflow-hidden rounded-3xl border border-secondary-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-3 border-b border-secondary-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge title={statusTitle} />

            <span className="text-xs text-secondary-400">
              {payment.isPaid ? "پرداخت شده" : "پرداخت نشده"}
            </span>
          </div>

          <div className="text-xs text-secondary-500">
            {formatDate(payment.paymentDate || payment.createdAt)}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-4">
          {payment.cart.products.map((product) => (
            <div
              key={product.productId}
              className="flex items-center gap-3 sm:gap-4"
            >
              <Link
                href={`/product/${product.slug}`}
                className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-secondary-100 bg-secondary-50 sm:size-24"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.imageLink}`}
                  alt={product.title}
                  fill
                  sizes="96px"
                  className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/product/${product.slug}`}
                  className="line-clamp-2 text-sm font-semibold text-secondary-900 transition-colors hover:text-primary-800 sm:text-base"
                >
                  {product.title}
                </Link>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary-500">
                  <span>تعداد: {toPersianDigits(product.quantity)}</span>

                  {product.quantity > 1 && (
                    <span>قیمت واحد: {formatPrice(product.offPrice)}</span>
                  )}
                </div>
              </div>

              <div className="hidden shrink-0 text-left sm:block">
                <div className="text-sm font-bold text-secondary-900">
                  {formatPrice(product.offPrice * product.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-secondary-50 p-3 sm:grid-cols-4 sm:p-4">
          <div>
            <div className="text-xs text-secondary-400">شماره سفارش</div>

            <div className="mt-1 truncate text-xs font-medium text-secondary-700">
              {payment.invoiceNumber}
            </div>
          </div>

          <div>
            <div className="text-xs text-secondary-400">تعداد کالا</div>

            <div className="mt-1 text-sm font-semibold text-secondary-800">
              {toPersianDigits(productsCount)}
            </div>
          </div>

          <div>
            <div className="text-xs text-secondary-400">روش پرداخت</div>

            <div className="mt-1 text-sm font-semibold text-secondary-800">
              {paymentMethod}
            </div>
          </div>

          <div>
            <div className="text-xs text-secondary-400">مبلغ کل</div>

            <div className="mt-1 text-sm font-bold text-primary-800">
              {formatPrice(payment.amount)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-secondary-400">
            {payment.cart.products.length > 1
              ? `${toPersianDigits(payment.cart.products.length)} کالا`
              : "یک کالا"}
          </span>

          <Button
            variant="outline"
            className="h-10 rounded-2xl px-4 text-sm"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "بستن آدرس" : "مشاهده آدرس"}</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className={`mr-1 size-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Address */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-secondary-100 bg-secondary-50/70 p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-white text-primary-800 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-sm font-bold text-secondary-900">
                  آدرس ارسال
                </h3>

                <p className="mt-0.5 text-xs text-secondary-400">
                  اطلاعات ثبت‌شده هنگام سفارش
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-3">
                <div className="text-xs text-secondary-400">استان</div>

                <div className="mt-1 text-sm font-medium text-secondary-800">
                  {payment.address?.province}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-3">
                <div className="text-xs text-secondary-400">شهر</div>

                <div className="mt-1 text-sm font-medium text-secondary-800">
                  {payment.address?.city}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-3 sm:col-span-2">
                <div className="text-xs text-secondary-400">آدرس</div>

                <div className="mt-1 text-sm leading-7 text-secondary-800">
                  {payment.address?.street}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-3">
                <div className="text-xs text-secondary-400">پلاک</div>

                <div className="mt-1 text-sm font-medium text-secondary-800">
                  {toPersianDigits(payment.address?.plaque)}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-3">
                <div className="text-xs text-secondary-400">واحد</div>

                <div className="mt-1 text-sm font-medium text-secondary-800">
                  {toPersianDigits(payment.address?.unit)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
