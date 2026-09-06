import React from "react";
import { Product } from "types/productType";
import ProductsCarousel from "./ProductsCarousel";

type Props = {
  products: Product[];
  title: string;
};

const ProductsContainer = ({ products, title }: Props) => {
  return (
    <section className="w-full xl:max-w-7xl border border-secondary-300 rounded-xl mx-auto p-5 mb-10">
      <h3 className="text-start text-xl font-medium mb-7">
        {title}
      </h3>

      <ProductsCarousel products={products} />
    </section>
  );
};

export default ProductsContainer;