import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputLabelProps {
  register: UseFormRegister<any>;
  name: string;
  error?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ register, name, error }) => {
  return (
    <div>
      <label htmlFor="menu" className="block mb-1">
        Menu
      </label>
      <input
        id={name}
        type="text"
        placeholder="np. Promocje"
        {...register(name)}
        className="w-full pl-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700"
      />
      <p style={{fontSize: 14}} className={`text-red-500 ${error ? "" : "invisible"}`}>
        Błąd: {error}
      </p>
    </div>
  );
};

export default InputLabel;
