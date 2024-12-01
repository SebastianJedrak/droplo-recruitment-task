"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  menus: any;
  setMenus: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menus, setMenus] = useState<
    { id: string; menuItems: [{ id: string; label: string; url: string }] }[]
  >([
    { id: "1", menuItems: [{ id: "11", label: "test", url: "test" }] },
    { id: "2", menuItems: [{ id: "12", label: "test2", url: "test2" }] },
  ]);

  return (
    <AppContext.Provider value={{ menus, setMenus }}>
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
