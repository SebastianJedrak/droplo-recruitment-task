"use client";

import MenuCard from "@/components/MenuCard";
import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { MenuType } from "@/types/menu";
import { generateId } from "@/utils/generateId";

export default function Home() {
  const { menus } = useAppContext();

  const [newMenuForms, setNewMenuForms] = useState<{ id: string }[]>([]);
  const addNewMenu = () => {
    setNewMenuForms((menuForms) => [
      ...menuForms,
      { id: generateId() },
    ]);
  };

  return (
    <>
      <AddMenuItem payload={addNewMenu} />
      {newMenuForms.map((menuForm) => (
        <EditMenuItem key={menuForm.id} id={menuForm.id} />
      ))}
      {menus.map((menu: MenuType) => (
        <MenuCard key={menu.id} menu={menu} />
      ))}
    </>
  );
}
