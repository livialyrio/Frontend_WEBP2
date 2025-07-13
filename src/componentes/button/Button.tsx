
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
