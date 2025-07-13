import React from 'react';

export interface InputTextoProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputTexto: React.FC<InputTextoProps> = ({
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      {...props}
      className={`border border-gray-300 rounded px-4 py-2 w-full placeholder:text-gray-500 ${className}`}
    />
  );
};
