"use client";

import { useState } from "react";
import cn from "classnames";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export const InputField = ({
  label,
  type,
  value,
  onChange,
  required = false,
  className,
}: InputFieldProps) => {
  const [error, setError] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setError(null);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={label} className="font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={handleInputChange}
        className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required={required}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};