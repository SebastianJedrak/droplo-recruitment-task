import React from "react";

interface CardProps {
  children: React.ReactNode;
  backgroundColor: "white" | "gray" | "transparent";
  border?: "primary" | "secondary";
}

const Card: React.FC<CardProps> = ({
  backgroundColor,
  children,
  border = "primary",
}) => {
  return (
    <div
      className={`
      ${backgroundColor === "white" && "bg-white"}
      ${backgroundColor === "gray" && "bg-gray-50"}
      rounded-lg border 
      ${border === "primary" && "border-gray-300"}
      ${border === "secondary" && "border-gray-200"}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
