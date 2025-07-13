"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', id: 'home', label: 'Conheça o programa' },
  { href: '/solicitacoes', id: 'solicitacao', label: 'Faça sua solicitação' },
  { href: '/medicamentosDisponiveis', id: 'medicamentos', label: 'Medicamentos disponíveis' },
  {href: '/sobre_nos', label: 'Sobre nós'}
];

export default function NavbarTabs() {
  const pathname = usePathname();

  return (
    <div>
      <nav className="bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-6 text-sm font-medium text-gray-700">
          {tabs.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative py-2 transition-colors ${
                pathname === href
                  ? 'text-blue-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                  : 'hover:text-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {pathname === '/' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-xl text-gray-700 font-bold mb-2">Conheça o programa</h1>
            <p className="text-gray-700">
              Bem-vinda ao nosso programa social de medicamentos!
            </p>
          </div>
        </div>
      )}

      {pathname === '/solicitacoes' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-xl text-gray-700 font-bold mb-2">Faça sua solicitação</h1>
            <p className="text-gray-700">
              Preencha o formulário abaixo para solicitar o medicamento desejado.
            </p>
          </div>
        </div>
      )}

      {pathname === '/medicamentosDisponiveis' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-xl text-gray-700 font-bold mb-2">Medicamentos disponíveis</h1>
            <p className="text-gray-700">
              Confira a lista dos medicamentos que temos disponíveis no programa.
            </p>
          </div>
        </div>
      )}
      {pathname === '/sobre_nos' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-xl text-gray-700 font-bold mb-2"></h1>
            <p className="text-gray-700">
             
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
