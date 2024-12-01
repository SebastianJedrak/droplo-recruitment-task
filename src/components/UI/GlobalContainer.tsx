import React from "react";

interface GlobalContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
}

const GlobalContainer: React.FC<GlobalContainerProps> = ({
  backgroundColor,
  children,
}) => {
  return (
    <div
      className={`
        px-4 py-8 space-y-8 min-h-screen
      ${backgroundColor === "white" && "bg-white"}
      ${backgroundColor === "gray" && "bg-gray-100"}
      `}
    >
      {children}
    </div>
  );
};

export default GlobalContainer;
