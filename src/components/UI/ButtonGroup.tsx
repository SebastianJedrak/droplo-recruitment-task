import React from "react";
import Button from "./Button";

interface ButtonGroupProps {
  buttons: { title: string; type: string }[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <div className="flex">
      {buttons.map((button, index) => (
        <Button
          key={index}
          title={button.title}
          type={button.type}
          className={`
            ${index === 0 ? "rounded-l-lg rounded-r-none" : ""} 
            ${
              index === buttons.length - 1 ? "rounded-r-lg rounded-l-none" : ""
            } 
            ${
              index > 0 && index < buttons.length - 1
                ? "rounded-none border-x-0"
                : ""
            }
          `}
        />
      ))}
    </div>
  );
};

export default ButtonGroup;
