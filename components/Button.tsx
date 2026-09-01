import React, { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "danger";
};

const buttonVariants = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
};

const Button = ({
  type = "button",
  onClick,
  children,
  className,
  variant = "primary",
  disabled,
  ...rest
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${buttonVariants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
