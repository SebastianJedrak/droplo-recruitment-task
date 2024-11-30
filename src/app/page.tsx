import MenuCard from "@/components/MenuCard";
import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";

export default function Home() {
  return <div className="space-y-8">
    <MenuCard />
    <EditMenuItem />
    <AddMenuItem />
  </div>;
}
