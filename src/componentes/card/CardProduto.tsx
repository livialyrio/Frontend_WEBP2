import React from 'react';

export default function CardProduto() {
  return (
    <div className="border rounded shadow p-4 w-64"> 
      <img src="https://via.placeholder.com/150" className="w-full h-40 object-cover rounded" /> 
      <h2 className="mt-2 text-lg font-semibold">Produto Exemplo</h2> 
      <p className="text-gray-600">R$ 49,99</p> 
      <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Comprar</button> 
    </div>
  );
}