import React from 'react';

export default function TabelaFiltros() {
  return (
    <div className="p-4"> 
      <div className="flex justify-between mb-2"> 
        <input type="text" placeholder="Buscar..." className="border px-3 py-2 rounded w-1/3" /> 
        <select className="border px-2 py-2 rounded"> 
          <option>Todos</option> 
          <option>Ativos</option> 
          <option>Inativos</option> 
        </select> 
      </div> 
      <table className="w-full table-auto border border-collapse"> 
        <thead className="bg-gray-100"> 
          <tr> 
            <th className="border px-4 py-2 text-left">Nome</th> 
            <th className="border px-4 py-2 text-left">Status</th> 
            <th className="border px-4 py-2 text-left">Ações</th> 
          </tr> 
        </thead> 
        <tbody> 
          <tr className="hover:bg-gray-50"> 
            <td className="border px-4 py-2">Maria Silva</td> 
            <td className="border px-4 py-2"><span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Ativo</span></td> 
            <td className="border px-4 py-2"> 
              <button className="text-blue-600 hover:underline mr-2">Editar</button> 
              <button className="text-red-600 hover:underline">Excluir</button> 
            </td> 
          </tr> 
        </tbody> 
      </table> 
      <div className="flex justify-end mt-2 gap-2"> 
        <button className="px-3 py-1 border rounded">Anterior</button> 
        <button className="px-3 py-1 border rounded bg-gray-200">Próximo</button> 
      </div> 
    </div>
  );
}