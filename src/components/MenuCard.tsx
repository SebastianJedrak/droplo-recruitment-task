import React from "react";
import MenuItem from "./MenuItem";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { MenuType } from "@/types/menu";

interface MenuCardType {
  menu: MenuType;
}

const MenuCard: React.FC<MenuCardType> = ({ menu }) => {
  return (
    <Card backgroundColor="white">
      <ul>
        {menu.subItems?.map((item) => (
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
