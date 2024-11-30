import React from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";

const EditMenuItem: React.FC = () => {

  return (
    <Card>
      <form></form>
      <div className="m-4">
        <Button title="Anuluj" type="secondary" />
        <Button title="Dodaj" type="primary" />
      </div>
    </Card>
  );
};

export default EditMenuItem;
