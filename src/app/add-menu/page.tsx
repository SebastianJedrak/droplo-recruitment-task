import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";
import GlobalContainer from "@/components/UI/GlobalContainer";

export default function Home() {
  return (
    <GlobalContainer backgroundColor="gray">
      <EditMenuItem />
      <AddMenuItem action="addMenu" />
    </GlobalContainer>
  );
}
