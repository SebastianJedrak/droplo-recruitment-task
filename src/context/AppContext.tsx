"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { formsType, MenuItemType, MenusType } from "@/types/types";
import { generateId } from "@/utils/generateId";

interface AppContextType {
  menus: MenusType;
  addMenu: (data: MenuItemType) => void;
  dropSortMenu: (draggedItemId: string, droppedParentId: string) => void;
  addMenuItem: (data: MenuItemType, parentId: string) => void;
  deleteMenuItem: (id: string) => void;
  editMenuItem: (menuItem: MenuItemType, parentId: string) => void;

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

  const dropSortMenu = (draggedItemId: string, droppedParentId: string) => {
    const findRecursive = (
      menuItems: MenuItemType[] | MenusType
    ): MenuItemType | undefined => {
      for (const item of menuItems) {
        if (item.id === draggedItemId) {
          return item as MenuItemType;
        }

        if (item.subItems && item.subItems.length > 0) {
          const found = findRecursive(item.subItems);
          if (found) {
            return found;
          }
        }
      }

      return undefined;
    };

    const draggedItem: MenuItemType | undefined = findRecursive(menus);
    if (!draggedItem) return;

    deleteMenuItem(draggedItemId);

    addMenuItem(draggedItem, droppedParentId);
  };

  const addMenuItem = (data: MenuItemType, parentId: string) => {
    const addRecursive = (items: MenuItemType[]): MenuItemType[] => {
      return items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            subItems: [...(item.subItems || []), data],
          };
        }

        if (item.subItems && item.subItems.length > 0) {
          return {
            ...item,
            subItems: addRecursive(item.subItems),
          };
        }

        return item;
      });
    };

    setMenus((menus: MenusType) => {
      let parentFound = false;

      const newMenus = menus.map((menu) => {
        if (menu.id === parentId) {
          parentFound = true;
          return { ...menu, subItems: [...menu.subItems, data] };
        }
        return menu;
      });

      if (!parentFound) {
        return newMenus.map((menu) => {
          return {
            ...menu,
            subItems: addRecursive(menu.subItems),
          };
        });
      }

      return newMenus;
    });
  };

  const deleteMenuItem = (id: string) => {
    setMenus((menus: MenusType) => {
      const deleteRecursive = (items: MenuItemType[]): MenuItemType[] => {
        const itemFound = items.some((item) => item.id === id);

        if (itemFound) {
          return items.filter((item) => item.id !== id);
        }

        return items.map((item) => {
          if (item.subItems && item.subItems.length > 0) {
            return {
              ...item,
              subItems: deleteRecursive(item.subItems),
            };
          }
          return item;
        });
      };

      const newMenus = menus.map((menu) => {
        return {
          ...menu,
          subItems: deleteRecursive(menu.subItems),
        };
      });

      return newMenus;
    });
  };

  const editMenuItem = (menuItem: MenuItemType, parentId: string) => {
    const editRecursive = (items: MenuItemType[]): MenuItemType[] => {
      return items.map((item) => {
        if (item.id === menuItem.id) {
          return menuItem;
        }

        if (item.subItems && item.subItems.length > 0) {
          return {
            ...item,
            subItems: editRecursive(item.subItems),
          };
        }

        return item;
      });
    };

    setMenus((menus: MenusType) => {
      let itemFound = false;

      const newMenus = menus.map((menu) => {
        if (menu.id === menuItem.id) {
          itemFound = true;
          return menuItem;
        }
        return menu;
      });

      if (!itemFound) {
        return newMenus.map((menu) => ({
          ...menu,
          subItems: editRecursive(menu.subItems),
        }));
      }

      return newMenus;
    });
  };

  //Forms ctx
  const [newMenuForms, setNewMenuForms] = useState<formsType>([]);

  const addNewMenu = (parentId: string | null, menuItem?: MenuItemType) => {
    setNewMenuForms((menuForms) => [
      ...menuForms,
      { id: generateId(), parentId: parentId, menuItem: menuItem },
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
        dropSortMenu,
        addMenuItem,
        deleteMenuItem,
        editMenuItem,
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
