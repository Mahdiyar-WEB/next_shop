import { useState, useRef, useEffect } from "react";
import SortIcon from "@mui/icons-material/Sort";

type Props = {
  options: { value: string; label: string }[];
  onChange: (e: { target: { value: string } }) => void;
  value: string;
};

const Select = ({ value, onChange, options }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const target = e.target as Node;
      if (ref.current && target && !ref.current.contains(target))
        setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSelect = (val: string) => {
    onChange({ target: { value: val } });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-full px-3 text-left text-sm rounded-md text-secondary-500 bg-white flex justify-between items-center cursor-pointer"
      >
        <span className="flex gap-3 items-center font-medium text-xs md:text-sm">
          <SortIcon />  
          {selected?.label}
        </span>
        <span
          className={`${open && "rotate-180"} transition-all duration-200 ease-out`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {open && (
        <ul className="absolute z-50 mt-2 w-full bg-white rounded-md border border-secondary-200 shadow-2xl max-h-48 overflow-y-auto">
          {options.map((item) => (
            <li
              key={item.value}
              onClick={() => handleSelect(item.value)}
              className={`
                px-3 py-2 text-xs md:text-sm cursor-pointer
                hover:bg-gray-100 hover:text-primary-900
                ${item.value === value ? "bg-gray-300/50! text-primary-700 font-medium" : ""}
              `}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
