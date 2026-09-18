"use client";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import toPersianDigits from "utils/toPersianDigits";

type Props = {
  quantity: number;
  max: number;
  disabled?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
};

const QuantityCounter = ({
  quantity,
  max,
  disabled = false,
  onIncrease,
  onDecrease,
}: Props) => {
  const canIncrease = quantity < max;

  return (
    <div className="flex h-9 items-center overflow-hidden rounded-xl border border-secondary-200 bg-white sm:h-10">
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled || !canIncrease}
        className="flex size-9 items-center justify-center text-primary-900 transition-colors hover:bg-primary-50 disabled:cursor-not-allowed disabled:text-secondary-300 sm:size-10"
        aria-label="افزایش تعداد"
      >
        <AddIcon className="text-base" />
      </button>

      <span className="min-w-8 text-center text-xs font-bold text-secondary-900 sm:text-sm">
        {toPersianDigits(quantity)}
      </span>

      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled}
        className="flex size-9 items-center justify-center text-primary-900 transition-colors hover:bg-primary-50 disabled:cursor-not-allowed disabled:text-secondary-300 sm:size-10"
        aria-label="کاهش تعداد"
      >
        <RemoveIcon className="text-base" />
      </button>
    </div>
  );
};

export default QuantityCounter;