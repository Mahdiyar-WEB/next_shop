"use client";

import Image from "next/image";
import Link from "next/link";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { Product } from "types/productType";
import formatPrice from "utils/formatPrice";
import toPersianDigits from "utils/toPersianDigits";
import { useAddToCart, useRemoveFromCart } from "hooks/use-cart";
import QuantityCounter from "./QuantityCounter";

type Props = {
  product: Product;
  quantity: number;
};

const CartItem = ({ product, quantity }: Props) => {
  const addProduct = useAddToCart();
  const removeProduct = useRemoveFromCart();

  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.imageLink}`;

  const handleIncrease = () => {
    if (quantity >= product.countInStock) return;

    addProduct.mutate(product._id);
  };

  const handleDecrease = () => {
    removeProduct.mutate(product._id);
  };

  const isPending = addProduct.isPending || removeProduct.isPending;

  return (
    <article className="relative flex gap-3 p-4 sm:gap-5 sm:p-6">
      <Link
        href={`/product/${product.slug}`}
        className="relative size-24 shrink-0 sm:size-32"
      >
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="128px"
          className="object-contain"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 pe-8 text-xs font-semibold leading-6 text-secondary-900 transition-colors hover:text-primary-700 sm:text-sm"
        >
          {product.title}
        </Link>

        <div className="mt-2 flex items-center gap-1 text-[10px] text-secondary-500 sm:text-xs">
          <span
            className={`size-1.5 rounded-full ${
              product.countInStock > 0 ? "bg-emerald-500" : "bg-secondary-300"
            }`}
          />

          <span>
            موجودی: {toPersianDigits(product.countInStock)} عدد
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          <QuantityCounter
            quantity={quantity}
            max={product.countInStock}
            disabled={isPending}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <div className="text-end">
            {product.price !== product.offPrice && (
              <p className="text-xs text-secondary-400 line-through">
                {formatPrice(product.price)}
              </p>
            )}

            <p className="mt-1 whitespace-nowrap">
              <span className="text-sm font-extrabold text-secondary-950 sm:text-base">
                {formatPrice(product.offPrice)}
              </span>
              <span className="ms-1 text-[9px] text-secondary-500">
                تومان
              </span>
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          const requests = Array.from({ length: quantity }, () =>
            removeProduct.mutateAsync(product._id),
          );

          Promise.all(requests);
        }}
        aria-label="حذف محصول"
        className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-secondary-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:right-4 sm:top-4"
      >
        <DeleteOutlineIcon className="text-lg" />
      </button>
    </article>
  );
};

export default CartItem;