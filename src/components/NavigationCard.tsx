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
    <div className="rounded-lg border-2 border-gray-300">
      <ul>
        {navigationList.map((item) => (
          <NavigationItem key={item.id} title={item.title} link={item.link} />
        ))}
      </ul>
      <button
        type="button"
        className="m-4 px-4 py-2 border-2 rounded-lg border-gray-300 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-purple-500 dark:focus:text-white"
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
};

export default NavigationCard;
