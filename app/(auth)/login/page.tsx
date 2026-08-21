"use client";

import Image from "next/image";
import Link from "next/link";
import AuthForm from "./_components/AuthForm";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Auth = () => {
  return (
    <main className="min-h-dvh bg-gray-50">
      <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
        {/* ========================================= */}
        {/* Form Side */}
        {/* ========================================= */}

        <div className="order-2 flex min-h-dvh flex-col lg:order-1">
          {/* Mobile / Tablet Header */}
          <div className="relative overflow-hidden bg-primary-900 px-5 py-6 lg:hidden">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-white/10" />

            <div className="pointer-events-none absolute -bottom-20 -left-14 size-48 rounded-full bg-white/10" />

            <div className="relative z-10 mx-auto w-full max-w-175">
              {/* Top */}
              <div className="flex items-center justify-between gap-4">
                {/* Home */}
                <Link
                  href="/"
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    border-white/15
                    bg-white/10
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-white

                    transition-all
                    hover:border-white/25
                    hover:bg-white/15
                  "
                >
                  <span>
                    <ArrowRightAltIcon />
                  </span>
                  <span>خانه</span>
                </Link>
                {/* Logo */}
                <Link
                  href="/"
                  className="
                    flex
                    items-center
                    gap-2
                    transition-opacity
                    hover:opacity-90
                  "
                >
                  <span className="text-lg font-bold text-white">ویرا</span>
                  <div
                    className="
                      relative
                      size-10
                      overflow-hidden
                      rounded-xl
                      bg-white
                      shadow-md
                    "
                  >
                    <Image
                      src="/logo.svg"
                      alt="Vira"
                      fill
                      priority
                      className="object-contain p-1.5"
                    />
                  </div>
                </Link>
              </div>

              {/* Intro */}
              <div className="mt-6">
                <h1 className="text-xl font-bold text-white sm:text-2xl">
                  خریدی ساده، مطمئن و سریع
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                  ویرا؛ فروشگاه آنلاین محصولات دیجیتال و کالاهای مورد نیاز شما
                </p>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/85 sm:text-sm">
                  <span>✓ ارسال سریع</span>
                  <span>✓ ضمانت اصالت</span>
                  <span>✓ پرداخت امن</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex min-h-0 flex-1 items-center justify-center bg-white px-4 py-5 sm:px-6 sm:py-8">
            <AuthForm />
          </div>
        </div>

        {/* ========================================= */}
        {/* Desktop Brand Side */}
        {/* ========================================= */}

        <div className="relative order-1 hidden overflow-hidden bg-primary-900 lg:order-2 lg:flex">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-white/10" />

          <div className="relative z-10 flex w-full flex-col items-center justify-center px-10 text-center">
            {/* Home */}
            <div className="absolute right-3 top-8">
              <Link
                href="/"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-white

                  transition-all
                  hover:border-white/25
                  hover:bg-white/15
                "
              >
                <span>
                  <ArrowRightAltIcon />
                </span>
                <span>بازگشت به خانه</span>
              </Link>
            </div>

            {/* Logo */}
            <Link href="/">
              <div
                className="
                  relative
                  mb-8
                  size-44
                  overflow-hidden
                  rounded-4xl
                  bg-white
                  shadow-xl
                  transition-transform
                  duration-300
                  hover:scale-105
                "
              >
                <Image
                  src="/logo.svg"
                  alt="Vira"
                  fill
                  priority
                  className="object-contain p-5"
                />
              </div>
            </Link>

            {/* Text */}
            <h1 className="text-4xl font-bold text-white">
              خریدی ساده، مطمئن و سریع
            </h1>

            <p className="mt-4 max-w-md text-lg leading-8 text-white/80">
              ویرا؛ فروشگاه آنلاین محصولات دیجیتال و کالاهای مورد نیاز شما
            </p>

            {/* Features */}
            <div className="mt-10 flex gap-8 text-sm text-white/90">
              <span>✓ ارسال سریع</span>
              <span>✓ ضمانت اصالت</span>
              <span>✓ پرداخت امن</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
