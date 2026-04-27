import React from 'react'

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
      />
    </div>
  );
};


export default Input