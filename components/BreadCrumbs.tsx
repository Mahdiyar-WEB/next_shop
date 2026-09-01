"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels = {
  blogs: "بلاگ‌ها",
  category: "دسته‌بندی",
  profile: "داشبورد",
  dashboard: "داشبورد",
  create: "ایجاد پست",
  edit: "ویرایش پست",
  login: "ورود",
  comments: "نظرات",
  users: "کاربران",
  categories: "دسته‌بندی‌ها",
};

const BreadCrumbs = ({ slugTitle = "" }) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="breadcrumb"
      className={`mb-5 text-sm h-full bg-white w-fit px-3 py-2 rounded-xl shadow-sm border border-gray-100`}
    >
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link
            href="/"
            className="text-secondary-400 hover:text-secondary-700"
          >
            خانه
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          const isLast = index === segments.length - 1;

          const label =
            isLast && slugTitle
              ? slugTitle
              : ((labels as Record<string, string>)[segment] ??
                decodeURIComponent(segment));

          return (
            <li key={href} className="flex items-center gap-2">
              <span>/</span>

              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-secondary-600"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-secondary-400 hover:text-secondary-700"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
