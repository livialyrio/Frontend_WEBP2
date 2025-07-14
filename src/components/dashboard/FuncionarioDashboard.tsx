"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dashboardData = [
  { name: "Remédios", total: 120 },
  { name: "Farmácias", total: 8 },
  { name: "Estoques", total: 45 },
  { name: "Usuários", total: 320 },
  { name: "Solicitações", total: 78 },
  { name: "Receitas", total: 150 },
  { name: "Doações-remed", total: 69 },
];

export const FuncionarioDashboard = () => {
  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 text-center">Resumo do sistema</h1>

      {/* Cards de Gerenciamento - apenas informativos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dashboardData.map((item) => (
          <div
            key={item.name}
            className="bg-white p-3 rounded-xl shadow-sm transition border border-gray-200"
          >
            <div className="text-base font-medium text-gray-700">{item.name}</div>
            <div className="text-xl font-bold text-blue-600 mt-1">{item.total}</div>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Resumo Geral</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
