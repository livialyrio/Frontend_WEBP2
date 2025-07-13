'use client';
import BannerRotativo from '@/componentes/banner/BannerRotativo';
import Link from 'next/link';
import NavbarTabs from '../componentes/navbar/navbar';
import FaleConoscoButton from '@/componentes/fale_conosco/faleConosco';

export default function HomePage() {
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
              placeholder="Pesquisar"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none placeholder-[#9eb8dc]"
            />
          </div>
          <div className="flex items-center gap-4">
        <a
          href="http://localhost:5000/login?redirect=http://localhost:3005"
          className="text-sm text-gray-700 hover:underline"
        >
          Entrar / Cadastrar
        </a>


         <FaleConoscoButton />

          </div>
        </div>
         <NavbarTabs />
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <BannerRotativo />
      </div>
    </main>
  );
}