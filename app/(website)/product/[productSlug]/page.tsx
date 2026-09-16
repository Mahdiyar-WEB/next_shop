import BreadCrumbs from "components/common/BreadCrumbs";
import SimilarProducts from "components/website/SimilarProducts";
import SingleProduct from "components/website/SingleProduct";
import { productServices } from "services/product-services";

export const instant = false;

const ProductSlug = async ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  const { productSlug } = await params;

  const { product, similarProducts } =
    await productServices.getBySlug(productSlug);
  return (
    <main className="mx-auto mb-10 w-full overflow-hidden 2xl:max-w-screen-2xl">
      <BreadCrumbs />
      <SingleProduct product={product} />
      <SimilarProducts products={similarProducts} />
    </main>
  );
};

export default ProductSlug;
