import React from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import ButtonGroup from "./UI/ButtonGroup";
import Badge from "./UI/Badge";

interface NavigationItemProps {
  key: string;
  title: string;
  link: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  key,
  title,
  link,
}) => {
  return (
    <li className="flex justify-between items-center border-b border-gray-300 px-4 py-2">
      <div className="flex items-center">
        <RiDragMove2Fill />
        <div>
          <div>
            {title}
            <Badge title="kolekcja" type="primary" />
          </div>
          <div>{link}</div>
        </div>
      </div>
      <ButtonGroup
        buttons={[
          { title: "Usuń", type: "secondary" },
          { title: "Edytuj", type: "secondary" },
          { title: "Dodaj pozycję menu", type: "secondary" },
        ]}
      />
    </li>
  );
};

export default NavigationItem;
