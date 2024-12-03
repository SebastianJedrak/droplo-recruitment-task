import React from "react";
import MenuItem from "./MenuItem";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { MenuItemType, MenuType } from "@/types/types";
import { useAppContext } from "@/context/AppContext";
import EditMenuItem from "./EditMenuItem";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";

interface MenuCardType {
  menu: MenuType;
}

const MenuCard: React.FC<MenuCardType> = ({ menu }) => {
  const { newMenuForms, addNewMenu, dropSortMenu } = useAppContext();

  const filteredMenuForms = newMenuForms.filter(
    (menuForm) => menuForm.parentId === menu.id
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const draggedItemId = active.id as string;
    const droppedParentId = over.id as string;
    const draggedItem = active as unknown as MenuItemType;
    dropSortMenu(draggedItemId, droppedParentId, draggedItem);
  };

  useDroppable({ id: menu.id });

  return (
    <Card backgroundColor="white">
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        id={"dnd-ctx"}
      >
        <ul>
          {menu.subItems?.map((menuItem) => (
            <MenuItem key={menuItem.id} menuItem={menuItem} />
          ))}
        </ul>
      </DndContext>

      <div className="m-4">
        <Button
          title="Dodaj pozycję menu"
          type="button"
          payload={() => addNewMenu(menu.id)}
        />
      </div>
      {filteredMenuForms.length > 0 && (
        <div className="p-4 border-t bg-gray-100 border-gray-300 space-y-4">
          {filteredMenuForms.map((menuForm) => (
            <EditMenuItem
              key={menuForm.id}
              id={menuForm.id}
              parentId={menu.id}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default MenuCard;
