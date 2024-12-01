import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";

export default function Home() {
  return <div className="space-y-8 bg-gray-100">
    <EditMenuItem />
    <AddMenuItem action="addMenu"/>
  </div>;
}
