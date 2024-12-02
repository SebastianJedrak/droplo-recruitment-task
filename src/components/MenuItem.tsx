import React from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import ButtonGroup from "./UI/ButtonGroup";
import { useAppContext } from "@/context/AppContext";
import EditMenuItem from "./EditMenuItem";

interface MenuItemProps {
  id: string;
  label: string;
  url?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, label, url }) => {
  const { newMenuForms, addNewMenu } = useAppContext();

  return (
    <li className="flex justify-between items-center border-b border-gray-300 px-4 py-2">
      <div className="flex items-center">
        <RiDragMove2Fill size={24} className="fill-gray-500 mr-2" />
        <div>
          <span className="mr-2 font-bold">{label}</span>
          <div>{url}</div>
        </div>
      </div>
      <ButtonGroup
        buttons={[
          { title: "Usuń", type: "button" },
          { title: "Edytuj", type: "button" },
          {
            title: "Dodaj pozycję menu",
            type: "button",
            payload: () => {
              addNewMenu(id);
            },
          },
        ]}
      />
      {newMenuForms
        .filter((menuForm) => menuForm.parentId === id)
        .map((menuForm) => (
          <EditMenuItem key={menuForm.id} id={menuForm.id} />
        ))}
    </li>
  );
};

export default MenuItem;
