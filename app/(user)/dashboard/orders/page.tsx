"use client";

import { useSearchParams } from "next/navigation";

import OrderList from "components/user/orders/OrderList";
import Pagination from "components/common/Pagination";
import { usePayments } from "hooks/use-payment";

const OrdersPage = () => {
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get("page") || 1) || 1);

  const limit = 10;

  const query = `page=${currentPage}&limit=${limit}`;

  const { data, isLoading, isError } = usePayments(query);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-32 animate-pulse rounded-2xl bg-secondary-100" />

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-55 animate-pulse rounded-3xl border border-secondary-100 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-3xl border border-red-100 bg-white px-6 text-center">
        <div>
          <h2 className="text-base font-bold text-secondary-900">
            دریافت سفارش‌ها با خطا مواجه شد
          </h2>

          <p className="mt-2 text-sm text-secondary-500">
            لطفاً دوباره تلاش کنید.
          </p>
        </div>
      </div>
    );
  }

  const payments = data?.payments ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-secondary-900 sm:text-2xl">
          سفارش‌های من
        </h1>

        <p className="mt-2 text-sm text-secondary-500">
          تاریخچه سفارش‌ها و اطلاعات خریدهای شما
        </p>
      </div>

      <OrderList payments={payments} />

      {payments.length > 0 && totalPages > 1 && (
        <div className="mt-6">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
