import React from "react";

interface CardProps {
  children: React.ReactNode;
  backgroundColor: "white" | "gray" | "transparent";
}

const Card: React.FC<CardProps> = ({ backgroundColor, children }) => {
  return (
    <div
      className={`
      ${backgroundColor === "white" && "bg-white"}
      ${backgroundColor === "gray" && "bg-gray-50"}
      rounded-lg border border-gray-300`}
    >
      {children}
    </div>
  );
};

export default Card;
