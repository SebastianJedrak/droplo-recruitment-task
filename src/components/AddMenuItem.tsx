import React from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import { useAppContext } from "@/context/AppContext";

const AddMenuItem: React.FC = () => {
  const { addNewMenu } = useAppContext();

  return (
    <Card backgroundColor="gray">
      <div className="flex flex-col items-center py-6">
        <div className="mb-8">
          <h3 className="mb-2 text-center font-bold">Menu jest puste</h3>
          <span>W tym menu jeszcze nie ma żadnych linków</span>
        </div>

        <Button title="Dodaj pozycję menu" type="button" payload={addNewMenu} />
      </div>
    </Card>
  );
};

export default AddMenuItem;
