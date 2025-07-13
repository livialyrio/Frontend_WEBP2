import React from 'react';

export default function CardProduto() {
  return (
    <div className="border rounded shadow p-4 w-64"> 
      <img src="https://via.placeholder.com/150" className="w-full h-40 object-cover rounded" /> 
      <h2 className="mt-2 text-lg font-semibold">Produto Exemplo</h2> 
    </div>
  );
}