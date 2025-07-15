'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavbarTabs from '@/components/navbar/navbar';
import { Dropdown } from '@/components/ui/Dropdown';
import React, { useState } from 'react';
import CardProduto from '@/components/card/CardProduto';
import FaleConoscoButton from '@/components/fale_conosco/faleConosco';

type CategoriaMedicamento = 'Analgésico' | 'Antibiótico' | 'Anti-inflamatório';

const medicamentosPorCategoria: Record<
  CategoriaMedicamento,
  { id: number; nome: string; imagem: string }[]
> = {
  Analgésico: [
    { id: 1, nome: 'Advil', imagem: '/advil.png' },
    { id: 2, nome: 'Paracetamol', imagem: '/paracetamol.png' },
    { id: 3, nome: 'Neosa', imagem: '/neosa-muscular-cards.png' },
    { id: 4, nome: 'Buscoduo', imagem: '/buscoduo.png' },
    { id: 5, nome: 'Anaflex', imagem: '/anaflex.png' },
    { id: 6, nome: 'Flanax', imagem: '/Flanax.png' },
    { id: 7, nome: 'Stepsils', imagem: '/stepsils.png' },
    { id: 8, nome: 'Tylenol', imagem: '/tylenol.png' },
  ],
  Antibiótico: [
    { id: 1, nome: 'Amoxicilina', imagem: '/amoxilina.png' },
    { id: 2, nome: 'Azitromicina', imagem: '/azitromicina.png' },
    { id: 3, nome: 'Cefalexina', imagem: '/cefalexina.png' },
    { id: 4, nome: 'Bactrim', imagem: '/bactrim.png' },
    { id: 5, nome: 'Zinnat', imagem: '/zinnat.png' },
    { id: 6, nome: 'Metronidazol', imagem: '/metronidazol.png' },
    { id: 7, nome: 'Ciprofloxacino', imagem: '/ciprofloxacino.png' },
    { id: 8, nome: 'Clavulin', imagem: '/clavulin.png' },
  ],
  'Anti-inflamatório': [
    { id: 1, nome: 'Diclofenaco', imagem: '/diclofenaco.png' },
    { id: 2, nome: 'Ibuprofeno', imagem: '/ibuprofeno.png' },
    { id: 3, nome: 'Naproxeno', imagem: '/naproxeno.png' },
    { id: 4, nome: 'Cetoprofeno', imagem: '/cetoprofeno.png' },
    { id: 5, nome: 'Piroxicam', imagem: '/piroxicam.png' },
    { id: 6, nome: 'Indometacina', imagem: '/indometacina.png' },
    { id: 7, nome: 'Meloxicam', imagem: '/meloxicam.png' },
    { id: 8, nome: 'Nimesulida', imagem: '/nimesulida.png' },
  ],
};

export default function MedicamentosDisponiveisPage() {
  const [categoria, setCategoria] = useState<'Categoria' | CategoriaMedicamento>('Categoria');

  const medicamentos =
    categoria !== 'Categoria' ? medicamentosPorCategoria[categoria] : [];

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-r from-white to-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          <div className="flex items-center gap-2">
            <Image
              src="/CefetFarmaLogo.png"
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
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none placeholder-[#9eb8dc]"
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
            <FaleConoscoButton />
          </div>
        </div>
        <NavbarTabs />
      </header>


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
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="w-40" />
      </div>

      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {medicamentos.length > 0 ? (
          medicamentos.map((item) => (
            <CardProduto key={item.id} nome={item.nome} imagem={item.imagem} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Selecione uma categoria para visualizar os medicamentos.
          </div>
        )}
      </section>
    </main>
  );
}
