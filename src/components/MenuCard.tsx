import React from "react";
import MenuItem from "./MenuItem";
import Button from "./UI/Button";
import Card from "./UI/Card";

interface MenuCardType {
  menu: any;
}

const MenuCard: React.FC<MenuCardType> = ({menu}) => {
  console.log(menu)
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
    <Card backgroundColor="white">
      <ul>
        {menu.menuItems.map((item: any) => (
          <MenuItem key={item.id} label={item.label} url={item.url} />
        ))}
      </ul>
      <div className="m-4">
        <Button title="Dodaj pozycję menu" type="button" />
      </div>
    </Card>
  );
};

export default MenuCard;
