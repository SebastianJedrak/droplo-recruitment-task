"use client";

import MenuCard from "@/components/MenuCard";
import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";
import { useAppContext } from "./context/AppContext";
import { useState } from "react";

export default function Home() {
  const { state, setState } = useAppContext();

  const [newMenuForms, setNewMenuForms] = useState<{ id: string }[]>([]);
  const addNewMenu = () => {
    setNewMenuForms((menuForms) => [
      ...menuForms,
      { id: String(menuForms.length) },
    ]);
  };

  return (
    <>
      <AddMenuItem payload={addNewMenu} />
      {newMenuForms.map((menuForm) => (
        <EditMenuItem key={menuForm.id} id={menuForm.id} />
      ))}
      <MenuCard />
    </>
  );
}
