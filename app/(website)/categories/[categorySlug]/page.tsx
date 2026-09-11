import BreadCrumbs from "components/common/BreadCrumbs";
import ProductsSort from "components/ui/ProductsSort";
import ProductCard from "components/website/ProductCard";
import { productServices } from "services/product-services";
import queryString from "query-string";
import ProductTag from "components/website/ProductTag";

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
  const { products, tags } = await productServices.getAll(
    `category=${categorySlug}&${queryString.stringify(searchOptions)}`,
  );

  return (
    <main className="mx-auto mb-10 w-full sm:w-[95%] 2xl:max-w-screen-2xl px-2 sm:px-0 overflow-hidden">
      <BreadCrumbs />
      <div className="flex flex-col xl:flex-row xl:items-center pb-5 gap-5">
        {/* sort */}
        <ProductsSort />

        {/* tags */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-2">
          <h2 className="text-sm text-nowrap font-semibold text-slate-800">
            فیلتر بر اساس برچسب:
          </h2>
          <div className="flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible">
            {tags
              .slice()
              .sort()
              .map((productTag) => (
                <ProductTag value={productTag} key={productTag} />
              ))}
          </div>
        </div>
      </div>
      {/* product container */}
      <div className="grid grid-cols-12 overflow-hidden border-l border-t border-secondary-100">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-span-6 border-b border-r border-secondary-100 md:col-span-4 lg:col-span-3 xl:col-span-2"
          >
            <ProductCard product={product} variant="grid" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategorySlug;
