import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

interface InputLinkProps {
  register: UseFormRegister<any>;
  error?: string;
}

const InputLink: React.FC<InputLinkProps> = ({ register, error }) => {
  return (
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
      <p className={`text-red-500 ${error ? "" : "invisible"}`}>
        Błąd: {error}
      </p>
    </div>
  );
};

export default InputLink;
