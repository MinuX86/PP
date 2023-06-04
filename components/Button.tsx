import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  useMemo,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

//example of tailwind-variants - https://www.tailwind-variants.org/docs/composing-components

// type ButtonVariants = Omit<VariantProps<typeof buyButton>, "color" | "size"> &
//   Required<Pick<VariantProps<typeof buyButton>, "color" | "size">>;

type buttonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonVariants = {
  color: "primary" | "secondary" | "success";
  size: "small" | "medium" | "large";
  isSquared?: boolean;
};

type props = PropsWithChildren &
  ButtonVariants &
  buttonProps & {
    buttonType: "base" | "secondary";
  };

const Button = ({
  children,
  buttonType = "base",
  color,
  size,
  isSquared,
  ...props
}: props): JSX.Element => {
  const styleType = useMemo(() => {
    switch (buttonType) {
      case "secondary": {
        return buyButton({ color, size, isSquared });
      }
      default:
      case "base": {
        return baseButton({ color, size });
      }
    }
  }, [buttonType, color, size, isSquared]);

  return (
    <button className={styleType} {...props}>
      {children}
    </button>
  );
};

const baseButton = tv({
  base: [
    "font-semibold",
    "dark:text-white",
    "py-1",
    "px-3",
    "rounded-full",
    "active:opacity-80",
    "bg-zinc-100",
    "hover:bg-zinc-200",
    "dark:bg-zinc-800",
    "dark:hover:bg-zinc-800",
  ],
  variants: {
    color: {
      primary: "bg-blue-500 hover:bg-blue-700",
      secondary: "bg-purple-500 hover:bg-purple-700",
      success: "bg-green-500 hover:bg-green-700",
    },
    size: {
      small: "py-0 px-2 text-xs",
      medium: "py-1 px-3 text-sm",
      large: "py-1.5 px-3 text-md",
    },
  },
});

const buyButton = tv({
  extend: baseButton,
  base: [
    "text-sm",
    "text-white",
    "rounded-lg",
    "shadow-lg",
    "uppercase",
    "tracking-wider",
    "bg-blue-500",
    "hover:bg-blue-600",
    "shadow-blue-500/50",
    "dark:bg-blue-500",
    "dark:hover:bg-blue-600",
  ],
  variants: {
    isSquared: {
      true: "rounded-sm",
    },
  },
});

export default Button;
