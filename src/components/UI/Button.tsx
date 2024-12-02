import React from "react";

interface ButtonProps {
  title: string;
  type: "button" | "reset" | "submit" | undefined;
  className?: string;
  payload?: (arg: any) => void;
}

const Button: React.FC<ButtonProps> = ({ title, type, className, payload }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 border-2 rounded-lg border-gray-300 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700  ${className}`}
      onClick={payload}
    >
      {title}
    </button>
  );
};

export default Button;
