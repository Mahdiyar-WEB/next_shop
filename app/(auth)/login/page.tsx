"use client";
import Image from "next/image";
import AuthForm from "./_components/AuthForm";

const Auth = () => {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="col-span-2 lg:col-span-1">
        <AuthForm />
      </div>
      <div className="relative hidden overflow-hidden bg-primary-900 lg:col-span-1 lg:flex">
        <div className="flex w-full flex-col items-center justify-center px-10 text-center">
          {/* Logo */}
          <div className="mb-8 relative h-48 w-48 rounded-3xl bg-white shadow-lg">
            <Image
              src="/logo.svg"
              alt="Vira"
              fill
              className="object-center object-cover"
            />
          </div>

          {/* Text */}
          <h1 className="text-4xl font-bold text-white">
            خریدی ساده، مطمئن و سریع
          </h1>

          <p className="mt-4 max-w-md text-lg leading-8 text-white/80">
            ویرا؛ فروشگاه آنلاین محصولات دیجیتال و کالاهای مورد نیاز شما
          </p>

          {/* Feature */}
          <div className="mt-10 flex gap-8 text-sm text-white/90">
            <span>✓ ارسال سریع</span>
            <span>✓ ضمانت اصالت</span>
            <span>✓ پرداخت امن</span>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />
      </div>
    </main>
  );
};

export default Auth;
