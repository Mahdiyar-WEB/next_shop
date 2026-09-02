"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLogout } from "hooks/use-auth";
import useDelayedLoading from "hooks/useDelayedLoading";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useUserStore } from "stores/user-store";
import { User } from "types/userType";

const pageTitles = [
  {
    href: "/profile/blogs",
    title: "مدیریت پست ها",
    description: "ساخت، ویرایش و بررسی محتوای سایت",
  },
  {
    href: "/profile/comments",
    title: "مدیریت نظرات",
    description: "بررسی بازخوردها و پاسخ های کاربران",
  },
  {
    href: "/profile/categories",
    title: "مدیریت دسته بندی ها",
    description: "سازماندهی ساختار محتوایی بلاگ",
  },
  {
    href: "/profile/users",
    title: "مدیریت کاربران",
    description: "مشاهده و ویرایش اطلاعات کاربران",
  },
  {
    href: "/dashboard",
    title: "داشبورد",
    description: "نمای کلی حساب",
  },
];

function getPageTitle(pathname: string) {
  return (
    pageTitles.find((item) =>
      item.href === "/profile"
        ? pathname === item.href
        : pathname.startsWith(item.href),
    ) ?? pageTitles.at(-1)
  );
}

function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="باز کردن منو"
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary-200 bg-white text-secondary-700 shadow-sm transition-colors hover:bg-secondary-100 lg:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
}

function HeaderTitle({
  title,
  description,
  className = "",
}: {
  title: string | undefined;
  description: string | undefined;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-start leading-tight ${className}`}>
      <h1 className="text-base font-bold text-secondary-900 lg:text-xl">
        {title}
      </h1>
      <p className="mt-1 hidden text-xs text-secondary-500 sm:block">
        {description}
      </p>
    </div>
  );
}

function ProfileButton({
  user,
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
  user: User | null;
}) {
  return (
    <button
      type="button"
      aria-label="باز کردن منوی پروفایل"
      onClick={onToggle}
      className="flex items-center gap-2 rounded-2xl border border-transparent p-1 transition-colors hover:border-secondary-200 hover:bg-secondary-50"
    >
      <Image
        alt="profile"
        width={44}
        height={44}
        src={user?.avatar || "/avatar.svg"}
        // placeholder={user?.avatar ? "blur" : "empty"}
        // blurDataURL={user?.avatarBlurDataURL || ""}
        className="h-11 w-11 rounded-2xl border border-secondary-200 object-cover object-center"
      />

      <div className="hidden min-w-0 flex-col items-start leading-tight md:flex">
        <span className="max-w-32 truncate text-sm font-semibold text-secondary-900">
          {user?.name || "کاربر"}
        </span>
        <span className="max-w-36 truncate text-xs text-secondary-500">
          {user?.email || ""}
        </span>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`size-4 transition-transform duration-200 ${
          open ? "rotate-180" : ""
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-2xl p-1">
      <div className="flex items-center gap-2 animate-pulse">
        <span className="block h-11 w-11 rounded-2xl bg-secondary-200" />
        <div className="hidden md:flex md:flex-col md:gap-2">
          <span className="block h-4 w-24 rounded-lg bg-secondary-200" />
          <span className="block h-3 w-32 rounded-lg bg-secondary-100" />
        </div>
        <span className="hidden h-4 w-4 rounded bg-secondary-100 md:block" />
      </div>
    </div>
  );
}

function ProfileMenuItem({
  children,
  icon,
  href,
  onClick,
  variant = "default",
}: {
  children: ReactNode;
  icon: ReactNode;
  href?: string;
  onClick: () => void;
  variant?: "default" | "danger";
}) {
  const className =
    variant === "danger"
      ? "flex w-full items-center gap-3 px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
      : "flex w-full items-center gap-3 px-4 py-3 text-secondary-700 transition-colors hover:bg-secondary-50";

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

function ProfileMenu({
  user,
  onClose,
  onLogout,
}: {
  user: User;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-secondary-200 bg-white shadow-xl"
    >
      <div className="border-b border-secondary-100 px-4 py-3">
        <p className="font-semibold text-secondary-900">{user?.name}</p>
        <p className="text-xs text-secondary-500">{user?.email}</p>
      </div>

      <ProfileMenuItem
        href={`/dashboard/profile`}
        onClick={onClose}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z"
            />
          </svg>
        }
      >
        ویرایش اطلاعات
      </ProfileMenuItem>

      <ProfileMenuItem
        variant="danger"
        onClick={onLogout}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        }
      >
        خروج از حساب
      </ProfileMenuItem>
    </motion.div>
  );
}

function HeaderProfile({
  user,
  isLoading,
  open,
  onToggle,
  onClose,
  onLogout,
}: {
  user: User | null;
  isLoading: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
}) {
  const showLoading = useDelayedLoading(isLoading, 180);

  return (
    <div className="relative min-h-13">
      <AnimatePresence mode="wait" initial={false}>
        {showLoading ? (
          <motion.div
            key="profile-skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProfileSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="profile-content"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ProfileButton user={user} open={open} onToggle={onToggle} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showLoading && open && user && (
          <ProfileMenu user={user} onClose={onClose} onLogout={onLogout} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UserHeader({
  onMobileToggle,
}: {
  onMobileToggle: () => void;
}) {
  const { user, isLoading } = useUserStore();
  const { mutate: logout } = useLogout();
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { setUser } = useUserStore();

  const onLogoutHandler = () => {
    setOpen(false);
    logout();
    setUser(null);
    router.replace("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <MobileMenuButton onClick={onMobileToggle} />
        <HeaderTitle
          title={pageTitle?.title}
          description={pageTitle?.description}
          className="min-w-0"
        />
      </div>

      <div ref={menuRef}>
        <HeaderProfile
          user={user}
          isLoading={isLoading}
          open={open}
          onToggle={() => setOpen((prev) => !prev)}
          onClose={() => setOpen(false)}
          onLogout={onLogoutHandler}
        />
      </div>
    </div>
  );
}
