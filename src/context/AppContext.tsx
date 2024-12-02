"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { formsType, MenuItemType, MenusType } from "@/types/types";
import { generateId } from "@/utils/generateId";

interface AppContextType {
  menus: MenusType;
  addMenu: (data: MenuItemType) => void;
  addMenuItem: (data: MenuItemType, parentId: string) => void;

  newMenuForms: formsType;
  addNewMenu: (parentId: string | null) => void;
  closeNewMenu: (id: string) => void;
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
        subItems: [],
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
            subItems: [],
          },
          {
            id: "2-1-2",
            label: "Najpopularniejsze",
            url: "promocje.pl/najpopularniejsze",
            subItems: [],
          },
        ],
      },
      {
        id: "2-2",
        label: "Zniżki specjalne",
        url: "promocje.pl/znizki-specjalne",
        subItems: [],
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
        subItems: [],
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
            subItems: [
              {
                id: "3-2-1-1",
                label: "Dla Ciebie",
                url: "polecane.pl/dla-ciebie",
                subItems: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //Menus ctx
  const [menus, setMenus] = useState<MenusType>(sampleMenus);

  const addMenu = (data: MenuItemType) => {
    setMenus((menus: MenusType) => [
      ...menus,
      {
        id: generateId(),
        subItems: [{ ...data }],
      },
    ]);
  };

  const addMenuItem = (data: MenuItemType, parentId: string) => {
    setMenus((menus: MenusType) => {
      const newArr = menus.map((menu) => {
        if (menu.id === parentId) {
          return { ...menu, subItems: [...menu.subItems, data] };
        }
        if (menu.id !== parentId && menu.subItems.length > 0) {
          addRecursive(menu.subItems);
        }
        return menu;
      });

      const addRecursive = (items: MenuItemType[]) => {
        items.map((item) => {
          if (item.id === parentId) {
          }
          if (item.id !== parentId && item.subItems.length > 0) {
            addRecursive(item.subItems);
          }
        });
      };

      console.log(menus);
      console.log(newArr);
      return newArr;
    });
  };
  
  //Forms ctx
  const [newMenuForms, setNewMenuForms] = useState<formsType>([]);

  const addNewMenu = (parentId: string | null) => {
    setNewMenuForms((menuForms) => [
      ...menuForms,
      { id: generateId(), parentId: parentId },
    ]);
  };

  const closeNewMenu = (id: string) => {
    setNewMenuForms((menuForms) => menuForms.filter((form) => form.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        menus,
        addMenu,
        addMenuItem,
        newMenuForms,
        addNewMenu,
        closeNewMenu,
      }}
    >
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
