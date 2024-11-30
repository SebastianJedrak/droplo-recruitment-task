import React from "react";
import MenuItem from "./MenuItem";
import Button from "./UI/Button";

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
    <div className="rounded-lg border-2 border-gray-300">
      <ul>
        {menuList.map((item) => (
          <MenuItem key={item.id} title={item.title} link={item.link} />
        ))}
      </ul>
      <div className="m-4">
        <Button title="Dodaj pozycję menu" type="secondary" />
      </div>
    </div>
  );
};

export default MenuCard;
