'use client';
import Link from 'next/link';
import NavbarTabs from '@/components/navbar/navbar';
import React, { useState } from 'react';
import Image from 'next/image';

export default function MedicamentosDisponiveisPage() {
  const [categoria, setCategoria] = useState('Categoria');

  return (
    <main className="min-h-screen bg-gray-50 font-sans">

      <header className="bg-gradient-to-r from-white to-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/CefetFarma.png"
              alt="Logo CefetFarma"
              width={150}
              height={50}
              priority
            />
          </div>
          <div className="flex-1 mx-8">
            <input
              type="text"
              placeholder="Pesquisar medicamentos, produtos e mais"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Link href="/login" className="text-sm text-gray-700 hover:underline">
                Entrar
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/cadastro" className="text-sm text-gray-700 hover:underline">
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
        <NavbarTabs />
      </header>


      <section className="max-w-7xl mx-auto flex flex-row items-start justify-between mt-16 px-4">

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">
            About us <span role="img" aria-label="kiss">💋</span>
          </h1>
          <p className="mb-6">
            Somos uma equipe de desenvolvimento focada<br />
            em soluções duvidosas e práticas que desafiam <br />
            as normas de qualidade e segurança
          </p>
          <p>
            Usamos metodologias ágeis como: prazo curto<br />
            de entrega e desespero durante compilação
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/selo_dieguinho.png" alt="Selo Castro" className="w-48 mb-2" />
          <span className="text-2xl font-bold text-center mt-2">
            SELO CASTRO<br />DE QUALIDADE
          </span>
        </div>
      </section>
    </main>
  );
}
