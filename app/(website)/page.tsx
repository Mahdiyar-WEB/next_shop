import { Metadata } from "next";
import { productServices } from "services/product-services";
import ProductsContainer from "components/website/ProductsContainer";
import WebsiteBanner from "components/website/WebsiteBanner";

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

  return (
    <main className="mx-auto mb-10 w-full sm:w-[95%] 2xl:max-w-screen-2xl px-2 sm:px-0">
      <WebsiteBanner
        image="/mobile_banner.jpg"
        alt="mobile_banner"
        text="نسل جدید موبایل‌ها را کشف کنید"
      />
      <ProductsContainer
        categoryPath="mobile"
        title="موبایل"
        products={mobiles.products}
      />
      <WebsiteBanner
        image="/laptop_banner.jpg"
        alt="laptop_banner"
        text="قدرت و سرعت را با لپ‌تاپ‌های جدید تجربه کنید"
      />

      <ProductsContainer
        categoryPath="laptop"
        title="لپ تاپ"
        products={laptops.products}
      />
      <WebsiteBanner
        image="/accessories_banner.jpg"
        alt="accessories_banner"
        text="اکسسوری‌های حرفه‌ای، برای تکمیل تجربه دیجیتال شما"
      />
      <ProductsContainer
        categoryPath="accessories"
        title="لوازم جانبی"
        products={accessories.products}
      />
    </main>
  );
}
