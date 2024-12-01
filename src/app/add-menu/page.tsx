"use client";

import EditMenuItem from "@/components/EditMenuItem";
import AddMenuItem from "@/components/AddMenuItem";
import GlobalContainer from "@/components/UI/GlobalContainer";
import { useState } from "react";

export default function AddMenu() {
  const [forms, setForms] = useState<{ id: number }[]>([]);

  const addForm = () => {
    setForms((forms) => [...forms, { id: forms.length }]);
  };

  return (
    <GlobalContainer backgroundColor="gray">
      <AddMenuItem action="addMenu" payload={addForm}/>
      {forms.map((form) => {
        return (
          <div key={form.id}>
            <EditMenuItem />
          </div>
        );
      })}
    </GlobalContainer>
  );
}
