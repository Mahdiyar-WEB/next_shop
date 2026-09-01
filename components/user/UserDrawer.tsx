import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "public/headerLogo.png";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const DrawerLinks = [
  {
    id: 1,
    title: "داشبورد",
    href: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "پست ها",
    href: "/profile/blogs",
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
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "نظرات",
    href: "/profile/comments",
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
          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "دسته بندی ها",
    href: "/profile/categories",
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
          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "کاربران",
    href: "/profile/users",
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
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
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
              item.href === "/profile"
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
