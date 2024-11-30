import React from "react";
import NavigationItem from "./NavigationItem";

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
    <div>
      <ul>
        {navigationList.map((item) => (
          <NavigationItem key={item.id} title={item.title} link={item.link} />
        ))}
      </ul>
    </div>
  );
};

export default NavigationCard;
