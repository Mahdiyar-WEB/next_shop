"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toPersianDigits from "utils/toPersianDigits";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const safeTotalPages = Math.max(1, totalPages || 0);
  const currentPage = Math.min(
    safeTotalPages,
    Math.max(1, Number(searchParams.get("page") || 1) || 1),
  );

  const goToPage = (nextPage: number) => {
    const safePage = Math.min(safeTotalPages, Math.max(1, nextPage));
    const newParams = new URLSearchParams(searchParams.toString());

    if (safePage > 1) {
      newParams.set("page", String(safePage));
    } else {
      newParams.delete("page");
    }

    const queryString = newParams.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="mx-auto flex w-full max-w-130 items-center justify-between gap-3 rounded-3xl border border-gray-200 px-3 py-3 sm:px-4">
      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-secondary-600">
        <span className="rounded-full px-2.5 py-1 text-secondary-500">
          صفحه :
        </span>
        <span className="font-medium text-secondary-900">
          {toPersianDigits(currentPage)}
        </span>
        <span className="text-secondary-400">از</span>
        <span className="font-medium text-secondary-900">
          {toPersianDigits(safeTotalPages)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          className="inline-flex cursor-pointer h-11 items-center gap-1.5 rounded-2xl border border-secondary-200 bg-white px-3.5 text-sm text-secondary-700 transition-colors hover:border-primary-200 hover:bg-blue-50 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-secondary-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <span>قبلی</span>
        </button>

        <button
          type="button"
          disabled={currentPage >= safeTotalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="inline-flex cursor-pointer h-11 items-center gap-1.5 rounded-2xl border border-secondary-200 bg-white px-3.5 text-sm text-secondary-700 transition-colors hover:border-primary-200 hover:bg-blue-50 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-secondary-700"
        >
          <span>بعدی</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
