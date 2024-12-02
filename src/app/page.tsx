"use client";

import MenuCard from "@/components/MenuCard";
import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";
import { useAppContext } from "../context/AppContext";
import { MenuType } from "@/types/types";

export default function Home() {
  const { menus, newMenuForms } = useAppContext();

  return (
    <>
      <AddMenuItem />
      {newMenuForms.filter(menuForm => menuForm.parentId === null).map((menuForm) => (
        <EditMenuItem key={menuForm.id} id={menuForm.id} />
      ))}
      {menus.map((menu: MenuType) => (
        <MenuCard key={menu.id} menu={menu} />
      ))}
    </>
  );
}
