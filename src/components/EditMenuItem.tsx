"use client";

import React from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormFields {
  menu: string;
  link: string;
}

const EditMenuItem: React.FC = () => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <div>
          <label htmlFor="menu" className="block">
            Menu
          </label>
          <input id="menu" type="text" {...register("menu")} />
        </div>

        <div>
          <label htmlFor="link" className="block">
            Link
          </label>
          <input id="link" type="text" {...register("link")} />
        </div>

        <div className="flex justify-end space-x-2">
          <Button title="Anuluj" type="button" />
          <Button title="Dodaj" type="submit" />
        </div>
      </form>
    </Card>
  );
};

export default EditMenuItem;
