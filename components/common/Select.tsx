"use client";

import { useEffect, useRef, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";

type Props = {
  options: { value: string; label: string }[];
  onChange: (e: { target: { value: string } }) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
};

const Select = ({
  value,
  onChange,
  options,
  placeholder = "انتخاب کنید",
  disabled = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const target = e.target as Node;

      if (ref.current && target && !ref.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSelect = (val: string) => {
    onChange({ target: { value: val } });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative h-full w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`h-full w-full rounded-md bg-white px-3 text-left text-sm text-secondary-500 flex items-center justify-between ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <span className="flex items-center gap-3 text-xs font-medium md:text-sm">
          <SortIcon />

          <span className={selected ? "text-secondary-500" : "text-secondary-400"}>
            {selected?.label ?? placeholder}
          </span>
        </span>

        <span
          className={`${open ? "rotate-180" : ""} transition-all duration-200 ease-out`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && !disabled && (
        <ul className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-secondary-200 bg-white shadow-2xl">
          {options.length ? (
            options.map((item) => (
              <li
                key={item.value}
                onClick={() => handleSelect(item.value)}
                className={`cursor-pointer px-3 py-2 text-xs hover:bg-gray-100 hover:text-primary-900 md:text-sm ${item.value === value ? "bg-gray-300/50! font-medium text-primary-700" : ""}`}
              >
                {item.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-3 text-xs text-secondary-400 md:text-sm">
              گزینه‌ای وجود ندارد
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Select;