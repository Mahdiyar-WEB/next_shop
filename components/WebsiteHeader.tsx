"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "stores/user-store";

const RootLayoutHeader = () => {
  const { user, isLoading } = useUserStore();
  console.log("🚀 ~ RootLayoutHeader ~ user:", user)

  return (
    <header className="sticky top-4 z-50 w-[95%] 2xl:max-w-screen-2xl mx-auto mb-10 ">
      <div className="bg-white backdrop-blur-md border border-secondary-200/80 shadow-md shadow-secondary-200/50 rounded-2xl px-4 md:px-8 min-h-17">
        <nav className="flex items-center justify-between min-h-17">
          <div className="flex items-center gap-6 md:gap-8 min-w-0">
            <Link
              href="/"
              className="hidden md:flex items-center gap-1"
            >
              <Image src='/logo.webp' width={200} height={200} alt="logo" className="w-10 h-9 border" />
              <span className="font-black text-xl text-secondary-900 whitespace-nowrap">
                ویرا
              </span>
            </Link>

            <ul className="flex items-center gap-6 md:gap-8">
              <li>
                <HeaderLink path="/" text="خانه" />
              </li>
              <li>
                <HeaderLink path="/blogs" text="بلاگ‌ها" />
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end min-w-33 h-12 shrink-0">
            {isLoading ? (
              <div className="w-17.5 md:w-22.5 h-10 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>
            ) : user ? (
              <Link
                href="/profile"
                className="h-10 px-3 flex items-center gap-2 rounded-xl bg-primary-800 text-white font-semibold hover:scale-105 active:scale-[0.98] transition-transform duration-200 ease-in-out"
              >
                <span className="whitespace-nowrap">پروفایل</span>
                <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden border border-white bg-white">
                  <Image
                    alt="profile"
                    width={44}
                    height={44}
                    src="/avatar.svg"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="h-10 px-5 md:px-8 flex items-center justify-center rounded-xl bg-blue-500 text-white font-bold shadow-lg active:scale-[0.98] transition-all duration-200 shrink-0"
              >
                ورود
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

const HeaderLink = ({
  path = "/",
  text,
  className = "",
  prefetch = "auto",
}: {
  path: string;
  text: string;
  className?: string;
  prefetch?: "auto";
}) => {
  const pathName = usePathname();

  const active =
    path === "/"
      ? pathName === "/"
      : pathName === path || pathName.startsWith(`${path}/`);

  return (
    <Link
      prefetch={prefetch}
      href={path}
      className={`relative inline-flex items-center h-10 font-medium transition-colors duration-200 ${
        active
          ? "text-primary-700"
          : "text-secondary-900 hover:text-primary-500"
      } ${className}`}
    >
      {text}
      {active && (
        <span className="absolute bottom-0 right-0 w-full h-0.5 bg-primary-700 rounded-full" />
      )}
    </Link>
  );
};

export default RootLayoutHeader;
