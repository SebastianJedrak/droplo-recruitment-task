"use client";

import MenuCard from "@/components/MenuCard";
import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";
import { useAppContext } from "../context/AppContext";
import { MenuItemType, MenuType } from "@/types/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

export default function Home() {
  const { menus, newMenuForms, dropSortMenu } = useAppContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
console.log(active, over)
    if (!over) return;
    if (active.id === over.id) return;

    const draggedItemId = active.id as string;
    const droppedParentId = over.id as string;
    const draggedItem = active as unknown as MenuItemType;
    dropSortMenu(draggedItemId, droppedParentId, draggedItem);
  };


  return (
    <>
      <AddMenuItem />
      {newMenuForms
        .filter((menuForm) => menuForm.parentId === null)
        .map((menuForm) => (
          <EditMenuItem key={menuForm.id} id={menuForm.id} parentId={null} />
        ))}
      <DndContext
        onDragEnd={handleDragEnd}
      >
        {menus.map((menu: MenuType) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </DndContext>
    </>
  );
}
