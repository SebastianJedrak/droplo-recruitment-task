import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="rounded-lg border-2 border-gray-300">{children}</div>;
};

export default Card;
