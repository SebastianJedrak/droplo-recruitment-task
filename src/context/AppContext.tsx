"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { MenuItemType, MenusType, MenuType } from "@/types/menu";
import { generateId } from "@/utils/generateId";

interface AppContextType {
  menus: any;
  addMenu: (data: MenuItemType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const sampleMenus: MenusType = [
  {
    id: "1",
    subItems: [
      {
        id: "1-1",
        label: "Diamenty Forbesa",
        url: "forbes.pl",
      },
    ],
  },
  {
    id: "2",
    subItems: [
      {
        id: "2-1",
        label: "Promocje",
        url: "",
        subItems: [
          {
            id: "2-1-1",
            label: "Ostatnie 7 dni",
            url: "promocje.pl/ostatnie-7-dni",
          },
          {
            id: "2-1-2",
            label: "Najpopularniejsze",
            url: "promocje.pl/najpopularniejsze",
          },
        ],
      },
      {
        id: "2-2",
        label: "Zniżki specjalne",
        url: "promocje.pl/znizki-specjalne",
      },
    ],
  },
  {
    id: "3",
    subItems: [
      {
        id: "3-1",
        label: "Nowości",
        url: "nowosci.pl",
      },
      {
        id: "3-2",
        label: "Polecane",
        url: "polecane.pl",
        subItems: [
          {
            id: "3-2-1",
            label: "Dla Ciebie",
            url: "polecane.pl/dla-ciebie",
          },
        ],
      },
    ],
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menus, setMenus] = useState<MenusType>(sampleMenus);

  const addMenu = (data: MenuItemType) => {
    setMenus((menus: MenusType) => [
      ...menus,
      {
        id: generateId(),
        subItems: [{ ...data, id: generateId() }],
      },
    ]);
  };

  return (
    <AppContext.Provider value={{ menus, addMenu }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};