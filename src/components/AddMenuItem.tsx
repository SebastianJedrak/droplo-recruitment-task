import React from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import { useAppContext } from "@/context/AppContext";
import { FiPlusCircle } from "react-icons/fi";


const AddMenuItem: React.FC = () => {
  const { addNewMenu } = useAppContext();

  return (
    <Card backgroundColor="gray">
      <div className="flex flex-col items-center my-6">
        <div className="mb-6">
          <h3 className="mb-1 text-center">Menu jest puste</h3>
          <span>W tym menu jeszcze nie ma żadnych linków</span>
        </div>

        <Button
          title="Dodaj pozycję menu"
          type="button"
          payload={() => {
            addNewMenu(null);
          }}
          style="filled"
          icon={<FiPlusCircle size={20}/>}
        />
      </div>
    </Card>
  );
};

export default AddMenuItem;
