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
      className=" group flex h-full w-43 shrink-0 flex-col overflow-hidden rounded-2xl border border-secondary-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] sm:w-50 md:w-55"
    >
      {/* تصویر */}
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

        {/* تخفیف */}
        {hasDiscount && (
          <span className="absolute right-2 top-2 rounded-lg bg-primary-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            {formatPrice(product.discount)}٪
          </span>
        )}
      </div>

      {/* عنوان */}
      <h3 className="line-clamp-2  min-h-11 text-sm font-medium leading-6 text-secondary-900 transition-colors group-hover:text-primary-600">
        {truncateText(product.title, 30)}
      </h3>

      {/* پایین کارت */}
      <div className="mt-1 p-3 sm:p-3.5 md:p-4">
        {/* وضعیت موجودی */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${
                isAvailable ? "bg-emerald-500" : "bg-secondary-300"
              }`}
            />

            <span
              className={`text-[11px] ${
                isAvailable ? "text-secondary-500" : "text-secondary-400"
              }`}
            >
              {isAvailable ? "موجود" : "ناموجود"}
            </span>
          </div>
        </div>

        {/* قیمت */}
        <div className="flex items-end justify-end gap-1">
          <span className="text-base font-extrabold tracking-tight text-secondary-950 sm:text-lg">
            {formatPrice(product.offPrice)}
          </span>

          <span className="mb-0.5 text-[10px] text-secondary-500">تومان</span>
        </div>

        {/* قیمت قبل */}
        {hasDiscount && (
          <div className="mt-1 text-end">
            <span className="text-[11px] text-secondary-400 line-through">
              {formatPrice(product.price)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
