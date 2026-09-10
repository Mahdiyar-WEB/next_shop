"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "components/common/Select";

const sortOptions = [
  {
    label: "تاریخ ایجاد (جدید ترین)",
    value: "latest",
  },
  {
    label: "تاریخ ایجاد (قدیمی ترین)",
    value: "earliest",
  },
  {
    label: "محبوبیت",
    value: "popular",
  },
  {
    label: "قیمت محصول (نزولی)",
    value: "price_desc",
  },
  {
    label: "قیمت محصول (صعودی)",
    value: "price_asc",
  },
];

const ProductsSort = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div
      className={`h-11 w-full md:w-1/5 flex mb-5 justify-between bg-white border border-gray-300 rounded-lg shadow-sm ${className}`}
    >
      <Select
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("sort", e.target.value),
          );
        }}
        value={searchParams.get("sort") || "latest"}
        options={sortOptions}
      />
    </div>
  );
};
export default ProductsSort;
