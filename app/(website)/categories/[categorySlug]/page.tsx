import BreadCrumbs from "components/common/BreadCrumbs";
import ProductCard from "components/website/ProductCard";
import { productServices } from "services/product-services";

export const instant = false;

const CategorySlug = async ({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) => {
  const { categorySlug } = await params;

  const { products } = await productServices.getAll(`category=${categorySlug}`);
  return (
    <main className="mx-auto mb-10 w-full overflow-hidden 2xl:max-w-screen-2xl">
      <BreadCrumbs />
      {/* product container */}
      <div className="grid grid-cols-12">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-span-12 sm:col-span-6 lg:col-span-2 "
          >
            <ProductCard product={product} variant="grid" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategorySlug;
