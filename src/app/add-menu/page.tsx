"use client";

import AddMenuItem from "@/components/AddMenuItem";
import GlobalContainer from "@/components/UI/GlobalContainer";
import Card from "@/components/UI/Card";
import InputMenu from "@/components/forms/InputMenu";
import InputLink from "@/components/forms/InputLink";
import Button from "@/components/UI/Button";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  menus: z.array(
    z.object({
      menu: z.string().min(1, "Menu jest wymagane"),
      link: z.string().min(1, "Link jest wymagany"),
    })
  ),
});

type FormFields = z.infer<typeof schema>;

export default function AddMenu() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      menus: [{ menu: "", link: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menus",
  });

  const addForm = () => {
    append({ menu: "", link: "" });
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <GlobalContainer backgroundColor="gray">
      <AddMenuItem action="addMenu" payload={addForm} />
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-1 w-full">
        {fields.map((item, index) => (
          <Card key={item.id} backgroundColor="white">
            <div className="flex">
              <InputMenu
                register={register}
                name={`menus.${index}.menu`}
                error={errors.menus?.[index]?.menu?.message}
              />
              <InputLink
                register={register}
                name={`menus.${index}.link`}
                error={errors.menus?.[index]?.link?.message}
              />
            </div>
          </Card>
        ))}
        <div className="flex space-x-2">
          <Button title="Anuluj" type="button" />
          <Button title="Dodaj" type="submit" />
        </div>
      </form>
    </GlobalContainer>
  );
}
