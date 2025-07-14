import React from 'react';

interface CardProdutoProps {
  nome: string;
  imagem: string;
}

export default function CardProduto({ nome, imagem }: CardProdutoProps) {
  return (
    <div className="border rounded shadow p-4 flex flex-col items-center">
      <img
        src={imagem}
        alt={nome}
        className="w-24 h-24 object-contain mb-2"
      />
      <h2 className="mt-2 text-lg font-semibold text-center">{nome}</h2>
    </div>
  );
}
