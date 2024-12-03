"use client";

import MenuCard from "@/components/MenuCard";
import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";
import { useAppContext } from "../context/AppContext";
import { MenuItemType, MenuType } from "@/types/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

export default function Home() {
  const { menus, newMenuForms, dropSortMenu } = useAppContext();

  const handleDragStart = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflowY = "hidden";

    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    document.body.style.overflowY = "unset";
    document.body.style.paddingRight = "";

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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        id="dnd-ctx"
        autoScroll={false}
      >
        {menus.map((menu: MenuType) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </DndContext>
    </>
  );
}
