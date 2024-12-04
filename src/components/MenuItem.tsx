import React from "react";
import ReactDOM from "react-dom";
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

  const { setNodeRef: setNodeRefDroppable, isOver } = useDroppable({
    id: menuItem.id,
  });

  const dndStyle = {
    transform: `translate(${transform?.x || "0"}px, ${transform?.y || "0"}px)`,
  };

  const portalContent = (
    <li
      ref={setNodeRefDraggable}
      {...attributes}
      style={dndStyle}
      className={`${isDragging && "opacity-75"} cursor-default bg-white`}
    >
      <div>
        <div
          ref={setNodeRefDroppable}
          className={`flex items-center justify-between border-b border-gray-300 px-6 py-4 ${
            isOver && "border-b-2 border-purple-700"
          }`}
        >
          <div className="flex items-center">
            <RiDragMove2Fill
              {...listeners}
              className="fill-gray-400 cursor-pointer size-5"
            />
            <div className="ml-4">
              <h4 className="mb-1">{menuItem.label}</h4>
              <span>{menuItem.url}</span>
            </div>
          </div>
          {!isDragging && (
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
          )}
        </div>

        {!isDragging && filteredMenuForms.length > 0 && (
          <div className="py-5 pr-6 pl-16  border-b bg-gray-50 border-gray-300 space-y-4">
            {filteredMenuForms.map((menuForm) => (
              <EditMenuItem
                key={menuForm.id}
                id={menuForm.id}
                parentId={menuItem.id}
              />
            ))}
          </div>
        )}

        {!isDragging && (
          <ul className="bg-gray-50" style={{ paddingLeft: `${depth * 64}px` }}>
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
        )}
      </div>
    </li>
  );

  return (
    <>
      {isDragging
        ? ReactDOM.createPortal(
            portalContent,
            document.getElementById("portal")!
          )
        : portalContent}
    </>
  );
};

export default MenuItem;
