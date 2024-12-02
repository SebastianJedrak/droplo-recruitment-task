export interface MenuItemType {
  id: string;
  label: string;
  url: string;
  subItems?: MenuItemType[];
}

export type MenuType = { id: string; subItems?: MenuItemType[] };

export type MenusType = MenuType[];

export type formType = {
  id: string;
  parentId: string | null
};

 export type formsType =formType[]