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

    if (!over) return;

    const draggedItemId = active.id as string;
    const droppedParentId = over.id as string;

    if (draggedItemId === droppedParentId) return;

    dropSortMenu(draggedItemId, droppedParentId);
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
        onDragEnd={handleDragEnd} id="dnd-ctx"
      >
        {menus.map((menu: MenuType) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </DndContext>
    </>
  );
}
