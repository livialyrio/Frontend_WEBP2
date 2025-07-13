"use client";

import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dashboardData = [
  { name: "Remédios", total: 120 },
  { name: "Farmácias", total: 8 },
  { name: "Estoques", total: 45 },
  { name: "Usuários", total: 320 },
  { name: "Solicitações", total: 78 },
  { name: "Receitas", total: 150 },
];

export const FuncionarioDashboard = () => {
  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700">Dashboard do Funcionário</h1>

      {/* Cards de Gerenciamento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.map((item) => (
          <Link
            key={item.name}
            href={`/painel/${item.name.toLowerCase().replace("ê", "e")}`}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition border border-gray-100 hover:border-blue-500"
          >
            <div className="text-lg font-semibold text-gray-700">{item.name}</div>
            <div className="text-2xl font-bold text-blue-600 mt-2">{item.total}</div>
            <div className="text-sm text-gray-400 mt-1">Gerenciar {item.name.toLowerCase()}</div>
          </Link>
        ))}
      </div>

      {/* Gráfico com dados de exemplo */}
      <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo Geral</h2>
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
