import React from "react";
import { Product } from "types/productType";
import ProductsCarousel from "./ProductsCarousel";
import Link from "next/link";

type Props = {
  products: Product[];
  title: string;
  categoryPath: string;
};

const ProductsContainer = ({ products, title, categoryPath }: Props) => {
  return (
    <section className="mx-auto mb-10 w-full overflow-hidden rounded-2xl bg-white px-4 py-5 sm:px-6 sm:py-6 xl:max-w-7xl">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h2 className="relative pr-3 text-base font-bold text-secondary-950 sm:text-lg md:text-xl">
          {title}

          <span className="absolute right-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary-500" />
        </h2>

        <Link
          href={`/categories/${categoryPath}`}
          className="text-xs font-medium text-primary-600 transition-colors hover:text-primary-700 sm:text-sm"
        >
          مشاهده همه
        </Link>
      </div>

      <ProductsCarousel products={products} />
    </section>
  );
};

export default ProductsContainer;
