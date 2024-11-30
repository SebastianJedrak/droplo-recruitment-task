import React from "react";

interface ButtonProps {
  title: string;
  type: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, type, className }) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 border-2 rounded-lg border-gray-300 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-purple-500 dark:focus:text-white ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
