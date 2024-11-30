import React from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import ButtonGroup from "./UI/ButtonGroup";
import Badge from "./UI/Badge";

interface MenuItemProps {
  title: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  link,
}) => {
  return (
    <li className="flex justify-between items-center border-b border-gray-300 px-4 py-2">
      <div className="flex items-center">
        <RiDragMove2Fill size={24} className="fill-gray-500 mr-2"/>
        <div>
          <div>
            <span className="mr-2 font-bold">{title}</span>
            <Badge title="kolekcja" type="primary" />
          </div>
          <div>{link}</div>
        </div>
      </div>
      <ButtonGroup
        buttons={[
          { title: "Usuń", type: "button" },
          { title: "Edytuj", type: "button" },
          { title: "Dodaj pozycję menu", type: "button" },
        ]}
      />
    </li>
  );
};

export default MenuItem;
