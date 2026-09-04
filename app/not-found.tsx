"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <div className="my-20 ">
        <h1 className="text-center text-xl md:text-3xl font-bold text-secondary-800">
          صفحه ای که دنبالش بودی پیدا نشد! 😢
        </h1>
        <Link
          href="/"
          className="flex w-fit text-primary-700 font-medium mx-auto justify-center items-center px-3 py-2 border border-primary-400 rounded-xl gap-2 mt-10"
        >
          <span>بازگشت به صفحه اصلی</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
