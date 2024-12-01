import React from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import Link from "next/link";

interface AddMenuItemProps {
  action: string;
}

const AddMenuItem: React.FC<AddMenuItemProps> = ({ action }) => {
  return (
    <Card backgroundColor="gray">
      <div className="flex flex-col items-center py-6">
        <div className="mb-8">
          <h3 className="mb-2 text-center font-bold">Menu jest puste</h3>
          <span>W tym menu jeszcze nie ma żadnych linków</span>
        </div>

        {action === "redirect" && (
          <Link href="/add-menu">
            <Button title="Dodaj pozycję menu" type="button" />
          </Link>
        )}

        {action === "addMenu" && (
          <Button title="Dodaj pozycję menu" type="button" />
        )}
      </div>
    </Card>
  );
};

export default AddMenuItem;