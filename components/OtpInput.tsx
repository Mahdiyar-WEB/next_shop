"use client";

import { useEffect, useRef, useState } from "react";
import toEnglishDigits from "utils/toEnglishDigits";
import toPersianDigits from "utils/toPersianDigits";

type OtpInputProps = {
  length: number;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
};

const OtpInput = ({
  length,
  value = "",
  onChange,
  onBlur,
  error = false,
  helperText,
  disabled = false,
}: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const normalizeOtp = (value: string) => {
    return toEnglishDigits(value).replace(/\D/g, "").slice(0, length);
  };

  const createOtpArray = (value: string) => {
    const normalizedValue = normalizeOtp(value);

    return Array.from({ length }, (_, index) => normalizedValue[index] ?? "");
  };

  const [otp, setOtp] = useState<string[]>(() => createOtpArray(value));

  // Sync external value with internal state
  useEffect(() => {
    const normalizedValue = normalizeOtp(value);

    setOtp((currentOtp) => {
      const currentValue = currentOtp.join("");

      if (currentValue === normalizedValue) {
        return currentOtp;
      }

      return createOtpArray(normalizedValue);
    });
  }, [value, length]);

  const updateOtp = (nextOtp: string[]) => {
    setOtp(nextOtp);

    onChange?.(nextOtp.join(""));
  };

  const changeOtpHandler = (inputValue: string, index: number) => {
    const normalizedValue = toEnglishDigits(inputValue)
      .replace(/\D/g, "")
      .slice(-1);

    const nextOtp = [...otp];

    nextOtp[index] = normalizedValue;

    updateOtp(nextOtp);

    if (normalizedValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const keyDownHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key !== "Backspace") return;

    event.preventDefault();

    const nextOtp = [...otp];

    // اگر خانه مقدار دارد، فقط خودش پاک شود
    if (otp[index]) {
      nextOtp[index] = "";

      updateOtp(nextOtp);

      return;
    }

    // اگر خانه خالی است، برو خانه قبلی
    if (index > 0) {
      nextOtp[index - 1] = "";

      updateOtp(nextOtp);

      inputRefs.current[index - 1]?.focus();
    }
  };

  const pasteHandler = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    event.preventDefault();

    const pastedValue = toEnglishDigits(event.clipboardData.getData("text"))
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pastedValue) return;

    const nextOtp = [...otp];

    pastedValue.split("").forEach((digit, offset) => {
      if (index + offset < length) {
        nextOtp[index + offset] = digit;
      }
    });

    updateOtp(nextOtp);

    const nextIndex = Math.min(index + pastedValue.length, length - 1);

    inputRefs.current[nextIndex]?.focus();
  };

  const blurHandler = () => {
    onBlur?.();
  };

  return (
    <div className="w-full">
      {/* OTP Inputs */}
      <div dir="ltr" className="flex w-full gap-2 sm:gap-3">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            autoFocus={index === 0}
            maxLength={1}
            value={toPersianDigits(otp[index] ?? "")}
            placeholder="-"
            disabled={disabled}
            onChange={(event) => changeOtpHandler(event.target.value, index)}
            onKeyDown={(event) => keyDownHandler(event, index)}
            onPaste={(event) => pasteHandler(event, index)}
            onBlur={blurHandler}
            onFocus={(event) => event.target.select()}
            className={`
                h-11
                min-w-0
                flex-1
                rounded-lg
                border
                bg-white
                text-center
                text-base
                font-semibold
                outline-none
                transition-all
                duration-200

                sm:h-12
                sm:text-lg

                ${
                  error
                    ? `
                      border-red-500
                      text-red-600
                      placeholder:text-red-300

                      focus:border-red-500
                      focus:ring-2
                      focus:ring-red-500/15
                    `
                    : `
                      border-gray-300
                      text-gray-900
                      placeholder:text-gray-400

                      hover:border-gray-500
                      focus:border-primary-800
                      focus:ring-2
                      focus:ring-primary-800/15
                    `
                }

                disabled:cursor-not-allowed
                disabled:bg-gray-100
                disabled:opacity-60
              `}
          />
        ))}
      </div>

      {/* Helper / Error */}
      {helperText && (
        <div
          dir="rtl"
          className={`
            mt-1.5
            flex
            items-center
            justify-start
            gap-1
            px-2

            text-right
            text-xs

            ${error ? "text-red-500" : "text-secondary-500"}
          `}
        >
          {error && <span className="font-bold">*</span>}

          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
};

export default OtpInput;
