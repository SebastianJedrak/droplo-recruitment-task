import React from "react";

interface CardProps {
  children: React.ReactNode;
  backgroundColor: string;
}

const Card: React.FC<CardProps> = ({ backgroundColor, children }) => {
  return (
    <div
      className={`
      ${backgroundColor === "white" && "bg-white"}
      ${backgroundColor === "gray" && "bg-gray-100"}
      rounded-lg border-2 border-gray-300 background-black`}
    >
      {children}
    </div>
  );
};

export default Card;
