"use client";

import React from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiDeleteBin6Line } from "react-icons/ri";
import InputLabel from "./forms/InputLabel";
import InputUrl from "./forms/InputUrl";
import { useAppContext } from "@/context/AppContext";
import { generateId } from "@/utils/generateId";
import { MenuItemType } from "@/types/types";

const schema = z.object({
  label: z.string().min(1, "Nazwa jest wymagane"),
  url: z.string(),
});

type FormFields = z.infer<typeof schema>;

interface EditMenuItemProps {
  id: string;
  parentId: string | null;
  menuItem?: MenuItemType;
}

const EditMenuItem: React.FC<EditMenuItemProps> = ({
  id,
  parentId,
  menuItem,
}) => {
  const { addMenu, addMenuItem, closeNewMenu } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      label: menuItem?.label || undefined,
      url: menuItem?.url || undefined,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (parentId === null) addMenu({ ...data, id: generateId(), subItems: [] });
    if (parentId !== null)
      addMenuItem({ ...data, id: generateId(), subItems: [] }, parentId);
    closeNewMenu(id);
  };
  console.log(menuItem);
  return (
    <Card backgroundColor="white">
      <div className="flex">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 space-y-1 w-11/12"
        >
          <InputLabel
            register={register}
            name="label"
            error={errors.label?.message}
          />
          <InputUrl
            register={register}
            name="url"
            error={errors.url?.message}
          />

          <div className="flex space-x-2">
            <Button
              title="Anuluj"
              type="button"
              payload={() => {
                closeNewMenu(id);
              }}
            />
            <Button title="Dodaj" type="submit" />
          </div>
        </form>
        <div className="w-1/12 flex justify-end p-6">
          <RiDeleteBin6Line
            className="fill-gray-500 size-4 cursor-pointer"
            onClick={() => {
              closeNewMenu(id);
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default EditMenuItem;
