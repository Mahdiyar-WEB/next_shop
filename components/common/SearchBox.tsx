"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { SubmitEvent, useCallback, useEffect, useState } from "react";

const DEBOUNCE_DELAY = 1000;

const SearchBox = ({
  placeholder,
  className,
  inputClassName,
}: {
  placeholder?: string;
  className: string;
  inputClassName?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(activeSearch);

  const updateSearchParams = useCallback(
    (searchValue: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      const trimmedSearch = searchValue.trim();

      if (trimmedSearch) {
        newParams.set("search", trimmedSearch);
        newParams.set("page", "1");
      } else {
        newParams.delete("search");
        newParams.delete("page");
      }

      const queryString = newParams.toString();

      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const onSubmitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateSearchParams(search);
  };

  const removeSearchHandler = () => {
    setSearch("");
    updateSearchParams("");
  };

  useEffect(() => {
    const trimmedSearch = search.trim();

    if (trimmedSearch === activeSearch) return;

    const timer = setTimeout(() => {
      updateSearchParams(trimmedSearch);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [search, activeSearch, updateSearchParams]);

  return (
    <form onSubmit={onSubmitHandler} className={className}>
      <input
        type="text"
        name="search"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder || "جستجو در محصولات"}
        className={`w-full bg-white/0 outline-none border-none ${inputClassName}`}
      />

      <div className="flex items-center gap-2">
        {activeSearch && (
          <div className="flex items-center gap-1 rounded-md bg-primary-100  px-2 py-1 text-xs whitespace-nowrap">
            <span>{activeSearch}</span>

            <button
              type="button"
              onClick={removeSearchHandler}
              className="text-red-500 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        <button type="submit" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 stroke-secondary-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
