import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "components/common/Button";

const EmptyCart = () => {
  return (
    <section className="flex min-h-105 items-center justify-center rounded-2xl border border-secondary-100 bg-white px-5 py-12">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary-50 text-primary-900 sm:size-24">
          <ShoppingCartOutlinedIcon className="text-4xl sm:text-5xl" />
        </div>

        <h1 className="mt-6 text-base font-bold text-secondary-950 sm:text-lg">
          سبد خرید شما خالی است
        </h1>

        <p className="mt-2 text-xs leading-6 text-secondary-500 sm:text-sm">
          هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
        </p>

        <Link href="/" className="mt-6">
          <Button type="button" variant="primary">
            مشاهده محصولات
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default EmptyCart;