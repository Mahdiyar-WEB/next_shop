import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "public/headerLogo.png";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";

const DrawerLinks = [
  {
    id: 1,
    title: "داشبورد",
    href: "/dashboard",
    icon: <AppsOutlinedIcon />,
  },
  {
    id: 2,
    title: "سفارش ها",
    href: "/dashboard/orders",
    icon: <ShoppingBagOutlinedIcon />,
  },
  {
    id: 3,
    title: "آدرس ها",
    href: "/dashboard/addresses",
    icon: <LocationOnOutlinedIcon />,
  },
  {
    id: 4,
    title: "علاقه‌مندی‌ ها",
    href: "/profile/categories",
    icon: <BookmarkBorderOutlinedIcon />,
  },
];

function CollapseButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "جمع کردن منو" : "باز کردن منو"}
      onClick={onToggle}
      className={`
        hidden lg:flex
        absolute -left-3 top-1/2 -translate-y-1/2
        z-20 h-7 w-7
        items-center justify-center
        rounded-full
        border border-secondary-200
        bg-white
        shadow-sm
        transition-all
        hover:border-primary-200 hover:text-primary-700 hover:shadow-md
        ${isOpen ? "rotate-180" : ""}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
}

function MobileCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      aria-label="بستن منو"
      onClick={onClose}
      className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl text-secondary-500 transition-colors hover:bg-secondary-100 hover:text-secondary-900 lg:hidden"
    >
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
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

function DrawerLogo({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`flex h-20.25 shrink-0 items-center border-b border-secondary-200 px-3.5`}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-12  pointer-events-none">
          <Image src={HeaderLogo} fill alt="header-logo" />
        </div>

        <div
          className={`
            overflow-hidden whitespace-nowrap transition-all duration-300
            ${isOpen ? "max-w-37.5 opacity-100" : "max-w-0 opacity-0"}
          `}
        >
          <h2 className="font-semibold text-secondary-800">ویرا</h2>

          <p className="text-xs text-secondary-500">پنل کاربری</p>
        </div>
      </div>
    </div>
  );
}

function DrawerItem({
  item,
  isOpen,
  active,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  active: boolean;
  item: { href: string; title: string; icon: ReactNode };
}) {
  return (
    <li className="list-none">
      <Link
        prefetch={false}
        href={item.href}
        onClick={onClose}
        title={!isOpen ? item.title : ""}
        className={`
          group relative
          flex items-center gap-3
          rounded-xl
          px-3 py-2.5
          font-medium
          transition-colors duration-300

          ${
            active
              ? " text-primary-900 shadow-md border border-secondary-200"
              : "text-secondary-600 hover:bg-gray-100 hover:text-secondary-900"
          }
        `}
      >
        {active && (
          <span className="absolute right-0 top-2 bottom-2 w-1 rounded-l-full bg-primary-900" />
        )}

        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          {item.icon}
        </div>

        <span
          className={`
            overflow-hidden whitespace-nowrap transition-all duration-300
            ${isOpen ? "opacity-100" : "w-0 opacity-0"}
          `}
        >
          {item.title}
        </span>
      </Link>
    </li>
  );
}

function DrawerFooter({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div className="border-t border-secondary-200 bg-gray-100 p-3">
      <DrawerItem
        isOpen={isOpen}
        onClose={onClose}
        active={false}
        item={{
          title: "صفحه اصلی",
          href: "/",
          icon: (
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
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          ),
        }}
      />
    </div>
  );
}

export default function UserDrawer({
  isOpen,
  onToggle,
  onClose,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        relative flex h-full min-h-dvh flex-col
        border-l border-secondary-200
        bg-white
        shadow-xl shadow-secondary-200/70
        transition-all duration-300 ease-out
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      <CollapseButton isOpen={isOpen} onToggle={onToggle} />
      <MobileCloseButton onClose={onClose} />

      <DrawerLogo isOpen={isOpen} />

      <ul className="flex-1 space-y-2 overflow-y-auto p-3">
        {DrawerLinks.map((item) => (
          <DrawerItem
            key={item.id}
            item={item}
            isOpen={isOpen}
            active={
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href)
            }
            onClose={onClose}
          />
        ))}
      </ul>

      <DrawerFooter isOpen={isOpen} onClose={onClose} />
    </aside>
  );
}
