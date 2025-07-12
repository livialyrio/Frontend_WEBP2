import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"> 
      Enviar 
    </button>
  );
}