import Image from "next/image";
import Link from "next/link";
import { Product } from "types/productType";
import formatPrice from "utils/formatPrice";
import truncateText from "utils/truncateText";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const isAvailable = product.countInStock > 0;
  const hasDiscount = product.discount > 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      draggable={false}
      className="group flex h-full w-43 shrink-0 flex-col overflow-hidden rounded-2xl border border-secondary-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] sm:w-50 md:w-55"
    >
      {/* Product Image */}
      <div className="relative mb-4 aspect-square w-full overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.imageLink}`}
          alt={product.title}
          fill
          draggable={false}
          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="
            (max-width: 640px) 172px,
            (max-width: 768px) 200px,
            220px
          "
        />

        {/* Discount */}
        {hasDiscount && (
          <p className="absolute right-2 top-2 rounded-lg bg-primary-700 px-2 py-1 text-[13px] font-semibold text-white shadow-sm">
            <span className="ms-px">{formatPrice(product.discount)}</span>٪
          </p>
        )}
      </div>

      {/* Title */}
      <h3 className="line-clamp-2 min-h-11 text-xs sm:text-sm font-medium leading-6 text-secondary-900 transition-colors group-hover:text-primary-600">
        {truncateText(product.title, 30)}
      </h3>

      {/* Below Section */}
      <div className="p-3 pt-2 sm:p-3.5 sm:pt-2 md:p-4 md:pt-2 flex flex-col items-end justify-end gap-1">
        <div className="flex items-center justify-between w-full">
          {/* Availability */}
          <div className="flex border border-gray-300 rounded-xl py-1 px-2 items-center justify-between">
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

          {/* Price */}
          {hasDiscount && (
            <div className="text-end">
              <span className="text-[14px] text-secondary-400 line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          )}
        </div>
        {/* Off Price */}
        <p className="space-x-1">
          <span className="text-base font-extrabold tracking-tight text-secondary-950 sm:text-lg">
            {formatPrice(product.offPrice)}
          </span>
          <span className="mb-0.5 text-[10px] text-secondary-500">تومان</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
