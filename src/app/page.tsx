'use client';
import Link from 'next/link';
import Image from 'next/image';
import NavbarTabs from '../components/navbar/navbar'; 
import BannerRotativo from '@/components/banner/BannerRotativo'; 
import FaleConoscoButton from '@/components/fale_conosco/faleConosco';

export default function HomePage() {
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
              placeholder="Pesquisar"
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <BannerRotativo />
      </div>
    </main>
  );
}