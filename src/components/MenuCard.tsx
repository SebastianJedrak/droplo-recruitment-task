import React from "react";
import MenuItem from "./MenuItem";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { MenuType } from "@/types/types";
import { useAppContext } from "@/context/AppContext";
import EditMenuItem from "./EditMenuItem";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface MenuCardType {
  menu: MenuType;
}

const MenuCard: React.FC<MenuCardType> = ({ menu }) => {
  const { newMenuForms, addNewMenu } = useAppContext();

  const filteredMenuForms = newMenuForms.filter(
    (menuForm) => menuForm.parentId === menu.id
  );

  return (
    <Card backgroundColor="white">
      <DndContext collisionDetection={closestCorners}>
        <ul>
          <SortableContext items={menu.subItems} strategy={verticalListSortingStrategy}>
            {menu.subItems?.map((menuItem) => (
              <MenuItem key={menuItem.id} menuItem={menuItem} />
            ))}
          </SortableContext>
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
