import Image from "next/image";
import Link from "next/link";
import { Product } from "types/productType";
import formatPrice from "utils/formatPrice";
import toPersianDigits from "utils/toPersianDigits";
import truncateText from "utils/truncateText";

type Props = {
  product: Product;
  variant?: "slider" | "grid";
};

const ProductCard = ({ product, variant = "slider" }: Props) => {
  const counts = product.countInStock;
  const isAvailable = !!counts;
  const hasDiscount = product.discount > 0;
  const isGrid = variant === "grid";

  return (
    <Link
      href={`/product/${product.slug}`}
      draggable={false}
      className={`group flex h-full flex-col overflow-hidden border border-secondary-100 bg-white transition-all duration-300 ${
        isGrid
          ? "w-full rounded-none"
          : "w-43 shrink-0 rounded-2xl hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] sm:w-50 md:w-55"
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative aspect-square w-full overflow-hidden ${
          isGrid ? "mb-2" : "mb-4"
        }`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.imageLink}`}
          alt={product.title}
          fill
          draggable={false}
          className={`object-contain transition-transform duration-500 ease-out group-hover:scale-105 ${
            isGrid ? "p-1 lg:p-2" : "p-3"
          }`}
          sizes={
            isGrid
              ? "(max-width:1024px) 50vw, 16vw"
              : "(max-width:640px) 172px, (max-width:768px) 200px, 220px"
          }
        />

        {/* Discount */}
        {hasDiscount && (
          <p className="absolute right-2 top-2 rounded-lg bg-primary-700 px-2 py-1 text-[13px] font-semibold text-white shadow-sm">
            <span className="ms-px">{formatPrice(product.discount)}</span>٪
          </p>
        )}

        {/* Low stock */}
        {counts > 0 && counts < 3 && (
          <p className="absolute left-2 top-2 flex gap-1 rounded-lg bg-error px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
            <span>فقط</span>
            <span>{toPersianDigits(counts)}</span>
            <span>عدد در انبار</span>
          </p>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${isGrid ? "px-2 pb-2" : ""}`}>
        {/* Title */}
        <h3 className="line-clamp-2 min-h-11 text-center text-xs font-medium leading-6 text-secondary-900 transition-colors group-hover:text-primary-600 sm:text-sm">
          {truncateText(product.title, 30)}
        </h3>

        {/* Bottom Section */}
        <div
          className={`mt-auto flex flex-col items-end justify-end gap-1 ${
            isGrid ? "pt-2" : "p-3 pt-2 sm:p-3.5 sm:pt-2 md:p-4 md:pt-2"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            {/* Availability */}
            <div className="flex items-center rounded-xl border border-gray-300 px-2 py-1">
              <div className="flex items-center gap-1.5">
                <span
                  className={`size-1.5 rounded-full ${
                    isAvailable ? "bg-emerald-500" : "bg-secondary-300"
                  }`}
                />

                <span
                  className={`text-[9px] sm:text-[11px] ${
                    isAvailable ? "text-secondary-500" : "text-secondary-400"
                  }`}
                >
                  {isAvailable ? "موجود" : "ناموجود"}
                </span>
              </div>
            </div>

            {/* Original Price */}
            {hasDiscount && (
              <span className="text-[14px] text-secondary-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Final Price */}
          <p className="space-x-1">
            <span className="text-base font-extrabold tracking-tight text-secondary-950 sm:text-lg">
              {formatPrice(product.offPrice)}
            </span>

            <span className="mb-0.5 text-[10px] text-secondary-500">تومان</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
