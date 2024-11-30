import React from "react";
import MenuItem from "./MenuItem";
import Button from "./UI/Button";
import Card from "./UI/Card";

const MenuCard: React.FC = () => {
  const menuList = [
    {
      id: "1",
      title: "Promocje",
      link: "/promocje",
    },
    {
      id: "2",
      title: "Diamenty forbesa",
      link: "/diamenty-forbesa",
    },
  ];
  return (
    <Card>
      <ul>
        {menuList.map((item) => (
          <MenuItem key={item.id} title={item.title} link={item.link} />
        ))}
      </ul>
      <div className="m-4">
        <Button title="Dodaj pozycję menu" type="secondary" />
      </div>
    </Card>
  );
};

export default MenuCard;
