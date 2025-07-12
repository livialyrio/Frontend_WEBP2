import React from 'react';

interface InputTextoProps {
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const InputTexto: React.FC<InputTextoProps> = ({
  placeholder = "Digite seu nome",
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="border border-gray-300 rounded px-4 py-2 w-full placeholder:text-gray-500"
    />
  );
};
