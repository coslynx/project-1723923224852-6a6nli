"use client";

import { useState } from "react";
import cn from "classnames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  type = "button",
  onClick,
  disabled = false,
  className,
  children,
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (onClick) {
      await onClick();
    }
    setIsLoading(false);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        className
      )}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};