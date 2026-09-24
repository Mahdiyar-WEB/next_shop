"use client";
import Image from "next/image";
import { Product } from "types/productType";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LinkIcon from "@mui/icons-material/Link";
import Button from "components/common/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { useLikeProduct } from "hooks/products/use-products";
import { useUserStore } from "stores/user-store";
import toPersianDigits from "utils/toPersianDigits";
import formatPrice from "utils/formatPrice";
import Badge from "components/common/Badge";
import Link from "next/link";
import { useAddToCart, useCart } from "hooks/use-cart";

type Props = {
  product: Product & { isBookmarked: boolean };
};

const SingleProduct = ({ product }: Props) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    product.isBookmarked,
  );
  const { mutateAsync: likeProduct } = useLikeProduct();
  const { mutateAsync: addToCart } = useAddToCart();
  const { data: cartDetails } = useCart();
  const { user, setUser } = useUserStore();

  const handleBookmark = () => {
    if (!user) {
      toast.error("ابتدار وارد حساب خود شوید");
      return;
    }
    const action = !isBookmarked;
    setIsBookmarked(action);
    likeProduct(product._id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        setIsBookmarked(!action);
        toast.error(error.message);
      },
    });
  };

  const handleShare = async () => {
    await navigator.share({
      title: product.title,
      text: product.title,
      url: window.location.href,
    });
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("لینک محصول کپی شد");
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("ابتدار وارد حساب خود شوید");
      return;
    }
    addToCart(product._id, {
      onSuccess: (data) => {
        setUser(data.user);
        toast.success("محصول به سبد خرید اضافه شد");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const hasDiscount = !!product.discount;

  const isProductInCart = !!cartDetails?.cart.products.find(
    (cartProduct) => cartProduct.productId._id === product._id,
  );

  return (
    <section className="flex">
      <div className="flex flex-col gap-4 mt-5 py-5 px-1.5 border border-l-0 border-gray-300 rounded-r-lg h-fit ">
        <Tooltip
          placement="right"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "black",
              },
            },
            arrow: {
              sx: {
                color: "black",
              },
            },
          }}
          describeChild
          title="ذخیره محصول"
        >
          <Button
            onClick={handleBookmark}
            variant="secondary"
            className="p-1.5 shadow-none bg-transparent"
          >
            {isBookmarked ? (
              <BookmarkIcon className="size-6! text-primary-900" />
            ) : (
              <BookmarkBorderOutlinedIcon
                className={`size-6! text-primary-900`}
              />
            )}
          </Button>
        </Tooltip>
        <Tooltip
          placement="right"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "black",
              },
            },
            arrow: {
              sx: {
                color: "black",
              },
            },
          }}
          describeChild
          title="اشتراک گذاری"
        >
          <Button
            onClick={handleShare}
            variant="secondary"
            className="p-1.5 shadow-none bg-transparent"
          >
            <ShareOutlinedIcon className="size-6! text-primary-900" />
          </Button>
        </Tooltip>
        <Tooltip
          placement="right"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "black",
              },
            },
            arrow: {
              sx: {
                color: "black",
              },
            },
          }}
          describeChild
          title="کپی لینک"
        >
          <Button
            onClick={handleCopyLink}
            variant="secondary"
            className="p-1.5 shadow-none bg-transparent"
          >
            <LinkIcon className="size-6! text-primary-900" />
          </Button>
        </Tooltip>
      </div>
      {/* image */}
      <div className="relative border border-gray-300 rounded-lg overflow-hidden w-1/3 aspect-square pointer-events-none">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.imageLink}`}
          alt={product.title}
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-2 mx-5">
        {/* brand */}
        <p className="space-x-1">
          <span>برند:</span>
          <span>{product.brand}</span>
        </p>
        {/* title */}
        <h2 className="font-bold text-2xl">{product.title}</h2>
        {/* description */}
        <h3 className="text-secondary-400 text-sm mb-2">
          {product.description}
        </h3>
        <hr className="text-secondary-100 mb-2" />
        {/* tags */}
        <h4 className="grid col-span-2 text-lg font-semibold">برچسب‌ها</h4>
        <div className="flex gap-1.5 mb-4">
          {product.tags.map((tag, index) => {
            return (
              <Link
                href={`/categories/${product.category.englishTitle}?tags=${tag}`}
                key={index}
              >
                <Badge title={tag} />
              </Link>
            );
          })}
        </div>
        {/* features */}
        <div className="grid grid-cols-2 gap-2">
          <h4 className="grid col-span-2 text-lg font-semibold">ویژگی‌ها</h4>
          {product.features.map((feature) => {
            return (
              <div
                key={feature.englishTitle}
                className="grid col-span-2 xl:col-span-1 bg-gray-200/80 p-2 rounded-md"
              >
                <p className="flex flex-col gap-1 text-xs sm:text-sm">
                  <span className="text-secondary-400">{feature.title}</span>
                  <span>{feature.value}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* add to cart menu */}
      <div className="flex flex-col border min-w-72 h-fit gap-y-4 border-gray-300 bg-gray-100 py-5 px-4 rounded-md">
        {/* seller */}
        <p className="text-lg font-semibold ">فروشنده</p>
        <div className="flex items-center gap-3 ">
          <Image
            src="/logo.webp"
            width={50}
            height={50}
            alt="logo"
            className="w-9 h-8 border"
          />
          <span className="font-medium text-secondary-600">ویرا</span>
        </div>
        <hr className="text-secondary-200 " />
        {/* price */}
        <div className="flex flex-col gap-1 items-end justify-center ">
          {hasDiscount && (
            <p className="flex gap-3">
              <span className="text-secondary-400 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="bg-primary-700 text-white text-sm space-x-1 rounded-xl px-3 py-0.5">
                {toPersianDigits(product.discount)}%
              </span>
            </p>
          )}
          <p className="flex gap-1 items-center">
            <span className="font-semibold text-lg">
              {formatPrice(product.offPrice)}
            </span>
            <span className="text-sm">تومان</span>
          </p>
        </div>
        {/* count in stock message */}
        {product.countInStock < 3 && product.countInStock > 0 && (
          <p className="flex gap-x-1 text-sm text-error font-medium">
            <span>🔥تنها</span>
            <span>{toPersianDigits(product.countInStock)}</span>
            <span>عدد در انبار باقی مانده</span>
          </p>
        )}
        {/* add to cart button */}
        {product.countInStock === 0 ? (
          <Button disabled className="w-full">
            اتمام موجودی
          </Button>
        ) : isProductInCart ? (
          <Link href="/cart" className="mt-auto">
            <Button className="w-full">ادامه خرید</Button>
          </Link>
        ) : (
          <Button onClick={handleAddToCart} className="mt-auto">
            افزودن به سبد خرید
          </Button>
        )}
      </div>
    </section>
  );
};

export default SingleProduct;
