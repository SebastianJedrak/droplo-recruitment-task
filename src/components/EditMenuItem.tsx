"use client";

import React from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiSearch } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

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
          <div>
            <label htmlFor="menu" className="block mb-1 font-bold">
              Menu
            </label>
            <input
              id="menu"
              type="text"
              placeholder="np. Promocje"
              {...register("menu")}
              className="w-full pl-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className={`text-red-500 ${errors.menu || "invisible"}`}>
              Błąd: {errors.menu?.message}
            </p>
          </div>

          <div>
            <label htmlFor="link" className="block mb-1 font-bold">
              Link
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="link"
                type="text"
                placeholder="Wklej lub wyszukaj"
                {...register("link")}
                className="w-full pl-8 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <p className={`text-red-500 ${errors.link || "invisible"}`}>
              Błąd: {errors.link?.message}
            </p>

            <div className="flex space-x-2">
              <Button title="Anuluj" type="button" />
              <Button title="Dodaj" type="submit" />
            </div>
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
