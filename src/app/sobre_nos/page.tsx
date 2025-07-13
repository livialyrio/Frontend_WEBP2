'use client'
import Link from 'next/link';
import NavbarTabs from '@/components/navbar/navbar';
import React, { useState } from 'react';

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
         <NavbarTabs />
     
      </header>

      {/* Conteúdo principal */}
      <section className="max-w-7xl mx-auto flex flex-row items-start justify-between mt-16">
        {/* Texto */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">About us <span role="img" aria-label="kiss">💋</span></h1>
          <p className="mb-6">
            Somos uma equipe de desenvolvimento focada<br />
            em soluções duvidosas e práticas que desafiam <br /> 
            as normas de qualidade e segurança
          </p>
            
        
          <p  >
            Usamos metodologias ágeis como: prazo curto<br />
            de entrega e desespero durante compilação
          </p>
        </div>
        {/* Imagens e selo */}
        <div className="flex flex-col items-center">
          <img src="/selo_dieguinho.png" alt="Selo Castro" className="w-48 mb-2" />
          <span className="text-2xl font-bold text-center mt-2">SELO CASTRO<br />DE QUALIDADE</span>
        </div>
      </section>
    </main>
  );
}