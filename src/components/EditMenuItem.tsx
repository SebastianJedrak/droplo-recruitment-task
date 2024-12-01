"use client";

import React from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiDeleteBin6Line } from "react-icons/ri";
import InputLink from "./forms/InputLink";
import InputMenu from "./forms/InputMenu";

const schema = z.object({
  menu: z.string().min(1, "Menu jest wymagane"),
  link: z.string().min(1, "Link jest wymagany"),
});

type FormFields = z.infer<typeof schema>;

const EditMenuItem: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Card backgroundColor="white">
      <div className="flex">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 space-y-1 w-11/12"
        >
          <InputMenu register={register} error={errors.menu?.message} />
          <InputLink register={register} error={errors.link?.message} />

          <div className="flex space-x-2">
            <Button title="Anuluj" type="button" />
            <Button title="Dodaj" type="submit" />
          </div>
        </form>
        <div className="w-1/12 flex justify-end p-6">
          <RiDeleteBin6Line className="fill-gray-500 size-4" />
        </div>
      </div>
    </Card>
  );
};

export default EditMenuItem;
