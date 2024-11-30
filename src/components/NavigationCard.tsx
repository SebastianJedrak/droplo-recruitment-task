import React from "react";
import NavigationItem from "./NavigationItem";
import Button from "./UI/Button";

const NavigationCard: React.FC = () => {
  const navigationList = [
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
        {navigationList.map((item) => (
          <NavigationItem key={item.id} title={item.title} link={item.link} />
        ))}
      </ul>
      <Button title="Dodaj pozycję menu" type="secondary" />
    </div>
  );
};

export default NavigationCard;
