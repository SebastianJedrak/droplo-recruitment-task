"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { formsType, MenuItemType, MenusType } from "@/types/types";
import { generateId } from "@/utils/generateId";

interface AppContextType {
  menus: MenusType;
  addMenu: (data: MenuItemType) => void;
  dropSortMenu: (draggedItemId: string, droppedParentId: string) => void;
  changeMenuItem: (
    data: MenuItemType,
    parentId: string,
    action: "edit" | "add"
  ) => void;
  deleteMenuItem: (id: string) => void;

  newMenuForms: formsType;
  addNewMenu: (parentId: string | null, menuItem?: MenuItemType) => void;
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
  //MENUS CTX
  const [menus, setMenus] = useState<MenusType>(sampleMenus);

  //add single new menu with one subItem
  const addMenu = (data: MenuItemType) => {
    setMenus((menus: MenusType) => [
      ...menus,
      {
        id: generateId(),
        subItems: [{ ...data }],
      },
    ]);
  };

  //handle the drag and drop feature
  const dropSortMenu = (draggedItemId: string, droppedParentId: string) => {
    //you need to find an item to pass it to changeMenuItem
    const findRecursive = (
      menuItems: MenuItemType[] | MenusType
    ): MenuItemType | undefined => {
      for (const item of menuItems) {
        if (item.id === draggedItemId) {
          //return result
          return item as MenuItemType;
        }

        if (item.subItems && item.subItems.length > 0) {
          //search in nested items
          const found = findRecursive(item.subItems);
          if (found) {
            return found;
          }
        }
      }

      //return undefined if not found
      return undefined;
    };

    const draggedItem: MenuItemType | undefined = findRecursive(menus);
    if (!draggedItem) return;

    //delete item from original form and add it to dropped place
    deleteMenuItem(draggedItemId);
    changeMenuItem(draggedItem, droppedParentId, "add");
  };

  //handle edit and add actions
  const changeMenuItem = (
    data: MenuItemType,
    parentId: string,
    action: "edit" | "add"
  ) => {
    const changeRecursive = (items: MenuItemType[]): MenuItemType[] => {
      return items.map((item) => {
        if (item.id === parentId) {
          //change correct item, depends on action
          if (action === "add") {
            return {
              ...item,
              subItems: [...(item.subItems || []), data],
            };
          }
          if (action === "edit") {
            return data;
          }

          //return item fallback
          return { ...item };
        }

        //continue changeRecursive if not found correct item 
        if (item.subItems && item.subItems.length > 0) {
          return {
            ...item,
            subItems: changeRecursive(item.subItems),
          };
        }

        return item;
      });
    };

    setMenus((menus: MenusType) => {
      let parentFound = false;

      //check if correct item is in first level and use parentFound if is
      const newMenus = menus.map((menu) => {
        if (menu.id === parentId) {
          parentFound = true;
          if (action === "add") {
            return { ...menu, subItems: [...menu.subItems, data] };
          }
          if (action === "edit") {
            return data;
          }
        }
        return menu;
      });

      //start changeRecursive if correct item is not first level
      if (!parentFound) {
        return newMenus.map((menu) => {
          return {
            ...menu,
            subItems: changeRecursive(menu.subItems),
          };
        });
      }

      return newMenus;
    });
  };

  //handle delete action
  const deleteMenuItem = (id: string) => {
    setMenus((menus: MenusType) => {
      const deleteRecursive = (items: MenuItemType[]): MenuItemType[] => {
        //check if one of subItems is the target
        const itemFound = items.some((item) => item.id === id);

        //delete the target
        if (itemFound) {
          return items.filter((item) => item.id !== id);
        }

        return items.map((item) => {
          if (item.subItems && item.subItems.length > 0) {
            return {
              ...item,
              //continue recursive for children
              subItems: deleteRecursive(item.subItems),
            };
          }
          return item;
        });
      };

      const newMenus = menus.map((menu) => {
        return {
          ...menu,
          //start recursive for children
          subItems: deleteRecursive(menu.subItems),
        };
      });

      return newMenus;
    });
  };

  //Forms ctx
  const [newMenuForms, setNewMenuForms] = useState<formsType>([]);

  //adds addNewMenu form to correct place based on parentId
  const addNewMenu = (parentId: string | null, menuItem?: MenuItemType) => {
    setNewMenuForms((menuForms) => [
      ...menuForms,
      { id: generateId(), parentId, menuItem},
    ]);
  };

  //handle closing menu
  const closeNewMenu = (id: string) => {
    setNewMenuForms((menuForms) => menuForms.filter((form) => form.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        menus,
        addMenu,
        dropSortMenu,
        changeMenuItem,
        deleteMenuItem,
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
  //throw error if context is used outside Provider
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
