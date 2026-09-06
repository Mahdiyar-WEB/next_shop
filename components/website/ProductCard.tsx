import Image from "next/image";
import Link from "next/link";
import { Product } from "types/productType";
import formatPrice from "utils/formatPrice";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      draggable={false}
      className="group flex h-full w-[180px] shrink-0 flex-col bg-white p-3 sm:w-[210px] sm:p-4 md:w-[230px]"
    >
      {/* تصویر */}
      {/* <div className="relative mb-4 aspect-square w-full overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.imageLink}`}
          alt={product.title}
          fill
          draggable={false}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 180px, (max-width: 768px) 210px, 230px"
        />
      </div> */}

      {/* عنوان */}
      <h3 className="mb-3 line-clamp-2 min-h-[44px] text-sm leading-6 text-secondary-900">
        {product.title}
      </h3>

      {/* تخفیف + قیمت */}
      <div className="mt-auto">
        {product.discount > 0 && (
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-primary-500 px-2 py-0.5 text-xs font-medium text-white">
              {formatPrice(product.discount)}٪
            </span>

            <span className="text-xs text-secondary-400">
              {product.countInStock > 0 ? "موجود" : "ناموجود"}
            </span>
          </div>
        )}

        {/* قیمت نهایی */}
        <div className="flex items-center justify-end gap-1">
          <span className="text-base font-bold text-secondary-900">
            {formatPrice(product.offPrice)}
          </span>

          <span className="text-xs text-secondary-600">تومان</span>
        </div>

        {/* قیمت قبل */}
        {product.discount > 0 && (
          <div className="mt-1 text-end">
            <span className="text-xs text-secondary-400 line-through">
              {formatPrice(product.price)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
