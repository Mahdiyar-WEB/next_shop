"use client";

import { useProducts } from "hooks/products/use-products";
import Link from "next/link";
import {
  SetStateAction,
  SubmitEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import formatPrice from "utils/formatPrice";
import Image from "next/image";
import toPersianDigits from "utils/toPersianDigits";
import { Product } from "types/productType";

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
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const searchBoxRef = useRef<HTMLFormElement>(null);

  const trimmedSearch = search.trim();
  const canSearch = trimmedSearch.length >= 2;

  const { data, isLoading, isFetching } = useProducts(
    searchQuery ? `search=${encodeURIComponent(searchQuery)}&limit=3` : "",
  );

  const products = data?.products || [];
  const similarProducts = data?.similarProducts || [];
  const isSearching = Boolean(searchQuery) && (isLoading || isFetching);
  const showResults = Boolean(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!canSearch) {
        setSearchQuery("");
        return;
      }

      setSearchQuery(trimmedSearch);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [trimmedSearch, canSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearSearch = () => {
    setSearch("");
    setSearchQuery("");
  };

  const onSubmitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSearch) {
      setSearchQuery("");
      return;
    }

    setSearchQuery(trimmedSearch);
  };

  return (
    <form
      ref={searchBoxRef}
      onSubmit={onSubmitHandler}
      className={`relative ${className}`}
    >
      {showResults && (
        <div className="absolute bottom-full right-0 mb-2 w-full rounded-2xl border border-gray-300/80 bg-white p-3 shadow-lg md:bottom-auto md:top-full md:mb-0 md:mt-2">
          {isSearching ? (
            <div className="flex min-h-32 items-center justify-center">
              <span className="text-sm text-secondary-500">
                در حال جستجو...
              </span>
            </div>
          ) : products.length > 0 ? (
            <div className="flex flex-col">
              {products.map((product) => (
                <SearchProduct
                  key={product._id}
                  product={product}
                  setSearchQuery={setSearchQuery}
                />
              ))}
            </div>
          ) : similarProducts.length > 0 ? (
            <div>
              <div className="mb-3 rounded-xl bg-amber-50 p-3 text-center">
                <p className="text-sm font-medium text-amber-700">
                  محصول مورد نظر پیدا نشد!
                </p>
              </div>
              <div className="flex justify-center items-center gap-2 my-3 text-secondary-700">
                <hr className="flex w-full" />
                <p className="text-nowrap text-sm font-semibold">محصولات مشابه</p>
                <hr className="flex w-full" />
              </div>
              <div className="flex flex-col">
                {similarProducts.map((product) => (
                  <SearchProduct
                    key={product._id}
                    product={product}
                    setSearchQuery={setSearchQuery}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex min-h-32 items-center justify-center">
              <span className="text-sm text-secondary-500">
                محصولی پیدا نشد
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex w-full items-center gap-2 py-1 ps-1.5">
        <button
          type="submit"
          className="order-2 flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-primary-900 px-2 text-white transition-colors hover:bg-primary-800 md:h-8.5 md:px-3"
        >
          <SearchIcon className="size-4! md:size-4.5!" />
          <span className="hidden md:inline text-sm">جستجو</span>
        </button>

        <div className="relative order-1 min-w-0 flex-1">
          <input
            type="text"
            name="search"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder || "جستجو در محصولات"}
            className={`w-full border-none bg-white/0 py-1 pe-8 outline-none ${inputClassName}`}
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-e-0 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-secondary-400 transition-colors hover:bg-secondary-100 hover:text-red-500"
              aria-label="پاک کردن جستجو"
            >
              <CloseIcon className="size-4!" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

const SearchProduct = ({
  product,
  setSearchQuery,
}: {
  product: Product;
  setSearchQuery: (value: SetStateAction<string>) => void;
}) => {
  return (
    <Link
      key={product._id}
      href={`/product/${product.slug}`}
      onClick={() => setSearchQuery("")}
      className="flex items-center gap-2 rounded-xl p-2.5 transition-colors hover:bg-blue-100/80 md:gap-4 md:p-3"
    >
      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary-100 md:size-18 md:rounded-xl">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.imageLink}`}
          alt={product.title}
          fill
          sizes="72px"
          className="object-cover object-center"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium md:text-sm">
          {product.title}
        </p>

        <div className="mt-1.5 flex flex-col items-start md:mt-2">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold md:text-sm">
              {formatPrice(product.offPrice)}
            </span>

            <span className="text-[10px] text-secondary-400 md:text-[11px]">
              تومان
            </span>
          </div>

          {product.price > product.offPrice && (
            <span className="text-[10px] text-secondary-400 line-through md:text-xs">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0">
        {product.discount > 0 && (
          <span className="rounded-md bg-blue-100 px-1.5 py-1 text-[10px] font-medium text-primary-900 md:px-2 md:text-xs">
            {toPersianDigits(product.discount)}٪ تخفیف
          </span>
        )}
      </div>
    </Link>
  );
};

export default SearchBox;
