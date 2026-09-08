import BreadCrumbs from "components/common/BreadCrumbs";
import SingleProduct from "components/website/SingleProduct";
import React from "react";
import { productServices } from "services/product-services";

export const instant = false;

const ProductSlug = async ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  const { productSlug } = await params;

  const { product } = await productServices.getBySlug(productSlug);
  return (
    <main className="mx-auto mb-10 w-full overflow-hidden 2xl:max-w-screen-2xl">
      <BreadCrumbs />
      <SingleProduct product={product} />
    </main>
  );
};

export default ProductSlug;
