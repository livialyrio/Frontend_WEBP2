'use client';

import { InputTexto } from '@/components/ui/InputText';
import Button from '@/components/button/Button';
import NavbarTabs from '@/components/navbar/navbar';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function UsuarioProfile() {
  const [index, setIndex] = useState(0);
  const imagens = ['/advil.png', '/amoxilina.png', '/anaflex.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

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
            <InputTexto placeholder="Pesquisar medicamentos, produtos e mais" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Bem-vindo Fulano</span>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Editar perfil
            </a>
            <Image src="/cesta.png" alt="Cesta" width={24} height={24} />
          </div>
        </div>
        <NavbarTabs />
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <aside className="w-64 bg-white shadow rounded-lg p-4 space-y-4 text-sm text-gray-700 font-medium">
          <Button className="w-full text-left">📦 Minhas solicitações</Button>
          <Button className="w-full text-left">📍 Meus endereços</Button>
          <Button className="w-full text-left">📜 Histórico</Button>
          <Button className="w-full text-left">👤 Meus dados</Button>
          <Button className="w-full text-left text-red-500 hover:text-red-600">🚪 Sair</Button>
        </aside>

        <section className="flex-1 space-y-6">
          <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-blue-700">Bem-vindo</h2>
              <p className="text-gray-800 text-sm mt-1">Fulano da Silva</p>
            </div>
            <Button>Editar perfil</Button>
          </div>

          <div className="bg-white shadow rounded-lg p-4 relative">
            <h3 className="text-blue-800 font-bold mb-3">Últimas solicitações:</h3>
            <div className="relative w-full h-60 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={imagens[index]}
                alt={`Medicamento ${index + 1}`}
                className="w-full h-full object-contain transition-all duration-500"
              />

              <button
                onClick={() => setIndex((prev) => (prev - 1 + imagens.length) % imagens.length)}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
                aria-label="Anterior"
              >
                <img src="/right 1.png" alt="Anterior" className="w-5 h-5 rotate-180" />
              </button>

              <button
                onClick={() => setIndex((prev) => (prev + 1) % imagens.length)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
                aria-label="Próximo"
              >
                <img src="/right 1.png" alt="Próximo" className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-blue-800">Endereço</h4>
                <Button className="text-xs px-3 py-1">Editar</Button>
              </div>
              <p className="text-gray-700 text-sm">Rua dos algoritmos, 123</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
