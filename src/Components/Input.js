import React from "react";
import icons from "../utils/icons";

const {RiLockFill } = icons
const Input = ({ label, name, value, setValue, type, invalidFields, setInvalidFields, onKeyDown, icon}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-96 p-2.5 pl-10"
        value={value}
        onChange={(e) => setValue((prve) => ({ ...prve, [e.target.name]: e.target.value }))}
        onFocus={() => setInvalidFields([])}
        onKeyDown={onKeyDown}
      />
      {invalidFields.length > 0 &&
        invalidFields.some((i) => i.name === type) && (
          <span className="text-red-500 italic">{invalidFields.find((i) => i.name === type)?.message}</span>
        )}
    </div>
  );
};

export default Input;
