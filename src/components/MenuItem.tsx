import React from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import ButtonGroup from "./UI/ButtonGroup";
import { useAppContext } from "@/context/AppContext";
import EditMenuItem from "./EditMenuItem";
import { MenuItemType } from "@/types/types";

interface MenuItemProps {
  menuItem: MenuItemType;
  depth?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItem, depth = 1 }) => {
  console.log(depth);
  const { newMenuForms, addNewMenu } = useAppContext();

  const filteredMenuForms = newMenuForms.filter(
    (menuForm) => menuForm.parentId === menuItem.id
  );

  const depthPaddingLeft = `${depth * 4}`;

  return (
    <div>
      <li className="flex justify-between items-center border-b border-gray-300 px-4 py-2">
        <div className="flex items-center">
          <RiDragMove2Fill size={24} className="fill-gray-500 mr-2" />
          <div>
            <span className="mr-2 font-bold">{menuItem.label}</span>
            <div>{menuItem.url}</div>
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
                addNewMenu(menuItem.id);
              },
            },
          ]}
        />
      </li>
      {filteredMenuForms.length > 0 && (
        <div className="p-4 border-b bg-gray-100 border-gray-300 space-y-4">
          {filteredMenuForms.map((menuForm) => (
            <EditMenuItem key={menuForm.id} id={menuForm.id} />
          ))}
        </div>
      )}
      <div className={`pl-${depthPaddingLeft}`}>
        {menuItem.subItems &&
          menuItem.subItems.length > 0 &&
          menuItem.subItems.map((nestedMenuItem) => (
            <MenuItem
              key={nestedMenuItem.id}
              menuItem={nestedMenuItem}
              depth={depth + 1}
            />
          ))}
      </div>
    </div>
  );
};

export default MenuItem;
