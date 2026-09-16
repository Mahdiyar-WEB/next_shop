import { Product } from "types/productType";
import ProductsCarousel from "./ProductsCarousel";

const SimilarProducts = ({ products }: { products: Product[] }) => {
  return (
    <div className="mt-10">
      {/* title */}
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-primary-800 rounded-full h-3 w-3"></div>
        <h2 className="text-xl font-bold">محصولات مشابه</h2>
      </div>
      {/* container */}
      <ProductsCarousel products={products} />
    </div>
  );
};

export default SimilarProducts;
