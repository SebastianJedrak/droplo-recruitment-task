import React, { ReactElement } from "react";

interface ButtonProps {
  title: string;
  type: "button" | "reset" | "submit" | undefined;
  className?: string;
  payload?: (arg: any) => void;
  style?: "filled" | "outline" | "color-outline";
  icon?: ReactElement
}

const Button: React.FC<ButtonProps> = ({
  title,
  type,
  className,
  payload,
  style = "outline",
  icon
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2  rounded-lg shadow-custom-shadow flex items-center
        ${
          style === "outline" &&
          "border bg-white border-gray-300 hover:bg-gray-100 hover:text-purple-700 text-gray-500"
        }

        ${
          style === "color-outline" &&
          "border bg-white border-purple-700 hover:bg-gray-100 text-purple-700"
        }

        ${
          style === "filled" &&
          "bg-purple-700 text-white border-none hover:opacity-90"
        } 
         ${className}`}
      onClick={payload}
    >
      {icon && <div className="mr-1">{icon}</div>}
      {title}
    </button>
  );
};

export default Button;
