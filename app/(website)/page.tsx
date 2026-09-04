import { Metadata } from "next";
import { productServices } from "services/product-services";

export const metadata: Metadata = {
  title: "خانه",
};

const fetchProducts = async () => {
  try {
    const [mobiles, laptops, accessories] = await Promise.all([
      productServices.getAll("category=mobile&limit=10"),
      productServices.getAll("category=laptop&limit=10"),
      productServices.getAll("category=accessories&limit=10"),
    ]);

    return { mobiles, laptops, accessories };
  } catch (error) {
    throw new Error("خطا در بارگذاری اطلاعات");
  }
};

export default async function Home() {
  const { accessories, laptops, mobiles } = await fetchProducts();

  return <div className="h-[2000px] text-center">main</div>;
}
