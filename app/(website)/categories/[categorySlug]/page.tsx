import BreadCrumbs from "components/common/BreadCrumbs";
import ProductsSort from "components/ui/ProductsSort";
import ProductCard from "components/website/ProductCard";
import { productServices } from "services/product-services";
import queryString from "query-string";

export const instant = false;

const CategorySlug = async ({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { categorySlug } = await params;
  const searchOptions = await searchParams;

  const { products } = await productServices.getAll(
    `category=${categorySlug}&${queryString.stringify(searchOptions)}`,
  );
  
  return (
    <main className="mx-auto mb-10 w-full overflow-hidden 2xl:max-w-screen-2xl">
      <BreadCrumbs />
      {/* sort */}
      <ProductsSort />
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
