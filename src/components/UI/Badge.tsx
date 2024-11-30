import React from "react";

interface BadgeProps {
  title: string;
  type: string;
}

const Badge: React.FC<BadgeProps> = ({ title, type }) => {
  return (
    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs text-purple-700 ring-1 ring-inset ring-purple-700/10 font-semibold">
      {title}
    </span>
  );
};

export default Badge;
