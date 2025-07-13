'use client'

import NavbarTabs from '@/components/navbar/navbar';
import { Dropdown } from '@/components/ui/Dropdown';
import Button from '@/components/button/Button';
import React, { useState } from 'react';

const mockCards = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  nome: 'Medicamento',
}));

export default function MedicamentosDisponiveisPage() {
  const [categoria, setCategoria] = useState('Categoria');

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      {/* Top bar */}
      <header className="bg-gradient-to-r from-white to-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 text-2xl font-bold">CefetFarma</div>
          </div>
          <div className="flex-1 mx-8">
            <input
              type="text"
              placeholder="Pesquisar medicamentos, produtos e mais"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-700 hover:underline">
              Entrar / Cadastrar
            </a>
          </div>
        </div>
     
      </header>
      <NavbarTabs />
      <div className="flex justify-between items-center max-w-5xl mx-auto mt-8 mb-8">
        <Dropdown
          label={categoria}
          options={[
            { label: 'Categoria', onClick: () => setCategoria('Categoria') },
            { label: 'Analgésico', onClick: () => setCategoria('Analgésico') },
            { label: 'Antibiótico', onClick: () => setCategoria('Antibiótico') },
            { label: 'Anti-inflamatório', onClick: () => setCategoria('Anti-inflamatório') },
          ]}
        />
        <div className="flex-1 flex justify-center">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Pesquisar em serviços"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"/></svg>
            </span>
          </div>
        </div>
        <div className="w-40" /> {/* Espaço para alinhar */}
      </div>
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {mockCards.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="bg-white border rounded-xl shadow-sm w-48 h-48 flex items-center justify-center mb-4 text-xl font-medium">
              {item.nome}
            </div>
            <Button>Buscar</Button>
          </div>
        ))}
      </section>
    </main>
  );
}