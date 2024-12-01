"use client"

import MenuCard from "@/components/MenuCard";
import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";
import { useAppContext } from "./context/AppContext";

export default function Home() {
  const { state, setState } = useAppContext();

  console.log(state)
  return (
    <>
      <MenuCard />
      <EditMenuItem />
      <AddMenuItem />
    </>
  );
}
