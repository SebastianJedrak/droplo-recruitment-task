import React from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import ButtonGroup from "./UI/ButtonGroup";
import { useAppContext } from "@/context/AppContext";
import EditMenuItem from "./EditMenuItem";
import { MenuItemType } from "@/types/types";
import { useDraggable, useDroppable } from "@dnd-kit/core";

interface MenuItemProps {
  menuItem: MenuItemType;
  depth?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItem, depth = 0 }) => {
  const { newMenuForms, addNewMenu, deleteMenuItem } = useAppContext();

  const filteredMenuForms = newMenuForms.filter(
    (menuForm) => menuForm.parentId === menuItem.id
  );

  const {
    attributes,
    listeners,
    setNodeRef: setNodeRefDraggable,
    transform,
    isDragging,
  } = useDraggable(menuItem);

  const { setNodeRef: setNodeRefDroppable } = useDroppable({ id: menuItem.id });

  const dndStyle = {
    transform: `translate(${transform?.x || "0"}px, ${transform?.y || "0"}px)`,
  };

  return (
    <li
      ref={setNodeRefDraggable}
      {...attributes}
      style={dndStyle}
      className={`bg-white ${isDragging && "opacity-75"} cursor-default`}
    >
      <div>
        <div
          ref={setNodeRefDroppable}
          className="flex items-center justify-between border-b border-gray-300 px-4 py-2"
        >
          <div
            className="flex items-center"
            style={{ paddingLeft: `${depth * 16}px` }}
          >
            <RiDragMove2Fill {...listeners} size={24} className="fill-gray-500 mr-2 cursor-pointer" />
            <div>
              <span className="mr-2 font-bold">{menuItem.label}</span>
              <div>{menuItem.url}</div>
            </div>
          </div>

          <ButtonGroup
            buttons={[
              {
                title: "Usuń",
                type: "button",
                payload: () => {
                  deleteMenuItem(menuItem.id);
                },
              },
              {
                title: "Edytuj",
                type: "button",
                payload: () => {
                  addNewMenu(menuItem.id, menuItem);
                },
              },
              {
                title: "Dodaj pozycję menu",
                type: "button",
                payload: () => {
                  addNewMenu(menuItem.id);
                },
              },
            ]}
          />
        </div>

        {filteredMenuForms.length > 0 && (
          <div className="p-4 border-b bg-gray-100 border-gray-300 space-y-4">
            {filteredMenuForms.map((menuForm) => (
              <EditMenuItem
                key={menuForm.id}
                id={menuForm.id}
                parentId={menuItem.id}
                menuItem={menuItem}
              />
            ))}
          </div>
        )}
        <ul>
          {menuItem.subItems &&
            menuItem.subItems.length > 0 &&
            menuItem.subItems.map((nestedMenuItem) => (
              <MenuItem
                key={nestedMenuItem.id}
                menuItem={nestedMenuItem}
                depth={depth + 1}
              />
            ))}
        </ul>
      </div>
    </li>
  );
};

export default MenuItem;
