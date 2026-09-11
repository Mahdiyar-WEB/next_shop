"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  value: string;
};

const ProductTag = ({ value }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedTag = searchParams.get("tags");
  const isActive = selectedTag === value;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);

    if (isActive) {
      params.delete("tags");
    } else {
      params.set("tags", value);
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      className={`shrink-0 cursor-pointer rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-200 ease-linear ${
        isActive
          ? "border-primary-900 bg-primary-900 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-900"
      }`}
    >
      {value}
    </button>
  );
};

export default ProductTag;