// src/app/usuarios/page.tsx
"use client";

import React from "react";
import Navbar from "@/componentes/navbar/navbar";
import Button from "@/componentes/button/Button";
import Card from "@/componentes/card/CardProduto";
import Tag from "@/componentes/tag/Tag";

export default function GerenciarUsuarios() {
  const usuarios = [
    {
      id: 1,
      nome: "Carlos Andrade",
      email: "carlos@email.com",
      perfil: "Administrador",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Maria Sapekinha",
      email: "maria@email.com",
      perfil: "Funcionário",
      status: "Inativo",
    },
  ];

  const acoes = [
    "Ações",
    "Editar Perfil",
    "Alterar Status",
    "Remover",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
       
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Gerenciar Usuários</h1>

          <div className="flex flex-col gap-4 mb-6">
            <Button className="w-fit">Cadastrar Usuário</Button>

            <input
              type="text"
              placeholder="Buscar por nome"
              className="border rounded px-4 py-2"
            />
            <Button className="w-fit">Buscar</Button>
          </div>

          <div className="overflow-auto rounded shadow">
            <table className="w-full border border-gray-300 bg-white">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Nome</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Perfil</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-t">
                    <td className="px-4 py-2 border">{usuario.id}</td>
                    <td className="px-4 py-2 border">{usuario.nome}</td>
                    <td className="px-4 py-2 border">{usuario.email}</td>
                    <td className="px-4 py-2 border">{usuario.perfil}</td>
                    <td className="px-4 py-2 border">
                      
                    </td>
                    <td className="px-4 py-2 border">
                      <select className="border rounded px-2 py-1">
                        {acoes.map((acao) => (
                          <option key={acao}>{acao}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
      </div>
    </main>
  );
}
