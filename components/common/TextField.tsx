"use client";

import { ComponentProps, ReactNode, useId } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { RegisterFormValues } from "../../app/(auth)/login/_components/AuthForm";

type Props = ComponentProps<"input"> & {
  label: string;
  field?: ControllerRenderProps<RegisterFormValues>;
  error?: boolean;
  helperText?: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
};

const Textfield = ({
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  onBlur,
  field,
  placeholder,
  fullWidth = false,
  error = false,
  helperText,
  icon,
  id,
  disabled,
  className,
  ...rest
}: Props) => {
  const generatedId = useId();

  const inputId = id ?? name ?? generatedId;

  // React Hook Form
  const inputValue = field?.value ?? value ?? "";
  const inputOnChange = field?.onChange ?? onChange;
  const inputOnBlur = field?.onBlur ?? onBlur;
  const inputName = field?.name ?? name;

  const hasValue =
    inputValue !== undefined &&
    inputValue !== null &&
    String(inputValue).length > 0;

  const hasPlaceholder = Boolean(placeholder);

  const isRtl = dir === "rtl";

  return (
    <div
      className={`
        relative
        group

        ${fullWidth ? "w-full" : "w-full"}

        ${className ?? ""}
      `}
    >
      {/* Input + Icon */}
      <div
        className={`
          flex
          w-full
          items-stretch
         flex-row-reverse
        `}
      >
        {/* Icon */}
        {icon && (
          <div
            className={`
              shrink-0
              flex
              items-center
              justify-center

              min-w-13
              px-3
              py-3

              bg-white
              border

              transition-all
              duration-200
              ease-in-out

              ${
                error
                  ? `
                    border-red-500
                    text-red-500
                  `
                  : `
                    border-gray-300
                    text-secondary-700

                    group-hover:border-primary-300
                    group-hover:text-primary-700

                    group-focus-within:border-primary-300
                    group-focus-within:text-primary-700
                  `
              }

              ${isRtl ? "rounded-r-xl border-l-0" : "rounded-l-xl border-r-0"}
            `}
          >
            {icon}
          </div>
        )}

        {/* Input */}
        <div
          className={`
            relative
            min-w-0
            flex-1

            ${isRtl ? "order-1" : "order-2"}
          `}
        >
          <input
            {...rest}
            ref={field?.ref}
            id={inputId}
            name={inputName}
            type={rest.type ?? "text"}
            disabled={disabled}
            dir={dir}
            value={inputValue}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            autoComplete={
              rest.type === "email"
                ? "email"
                : inputName === "name"
                  ? "given-name"
                  : inputName === "lastName"
                    ? "family-name"
                    : inputName === "phone"
                      ? "tel"
                      : "off"
            }
            placeholder={placeholder}
            className={`
              peer
              block
              w-full
              min-w-0
              leading-8
              px-4
              py-3
              outline-none
              bg-white
              text-secondary-900
              border
              border-gray-300
              transition-all
              duration-200
              ease-in-out

              ${isRtl ? "text-right" : "text-left"}

              ${icon ? (isRtl ? "rounded-l-xl" : "rounded-r-xl") : "rounded-xl"}

              ${
                error
                  ? `
                    border-red-500
                    focus:border-red-500
                  `
                  : `
                    border-gray-100

                    group-hover:border-primary-300
                    focus:border-primary-300
                  `
              }

              focus:shadow-input-focus

              disabled:cursor-not-allowed
              disabled:bg-gray-50
              disabled:text-gray-400
            `}
          />

          {/* Floating Label */}
          <label
            htmlFor={inputId}
            className={`
              pointer-events-none

              absolute
              z-10

              bg-white
              px-2

              text-xs
              sm:text-sm
              font-semibold

              transition-all
              duration-150
              ease-in-out

              ${isRtl ? "right-3" : "left-3"}

              ${
                hasValue || hasPlaceholder
                  ? "-top-3"
                  : "top-4 peer-focus:-top-3"
              }

              ${
                error
                  ? "text-red-500"
                  : `
                    text-secondary-600
                    peer-focus:text-primary-700
                  `
              }
            `}
          >
            {label}
          </label>
        </div>
      </div>

      {/* Helper / Error */}
      {helperText && (
        <div
          className={`
      flex
      items-center
      justify-start
      gap-1

      px-2
      pt-1.5

      text-xs
      text-right
      direction-rtl

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

export default Textfield;
