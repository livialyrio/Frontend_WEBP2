'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import NavbarTabs from '@/components/navbar/navbar';

interface Solicitacao {
  id: number;
  remedio: string;
  farmacia: string;
  status: string;
  dataSolicitacao: string;
}

interface Usuario {
  nome: string;
  email: string;
  dataNascimento: string;
  cpf: string;
}

export default function UsuarioDashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Simulação de dados
    const usuarioFake: Usuario = {
      nome: 'Maria dos Anjos',
      email: 'maria@email.com',
      dataNascimento: '2003-01-10',
      cpf: '123.456.789-00'
    };
    setUsuario(usuarioFake);

    const solicitacoesFake: Solicitacao[] = [
      { id: 1, remedio: 'Dipirona', farmacia: 'Farmácia Central', status: 'Pendente', dataSolicitacao: '2025-07-10' },
      { id: 2, remedio: 'Amoxicilina', farmacia: 'Farmácia Norte', status: 'Aprovada', dataSolicitacao: '2025-07-01' },
    ];
    setSolicitacoes(solicitacoesFake);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] font-sans">
      <NavbarTabs />

      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-blue-900">Olá, {usuario?.nome}</h1>
            <div className="flex gap-3">
              <Button onClick={() => router.push('/medicamentosDisponiveis')}>Ver Medicamentos Disponíveis</Button>
              <Button onClick={() => router.push('/profile')}>Ver meu perfil</Button>
            </div>
          </div>

          <div className="space-y-2 text-gray-800">
            <p><strong>Email:</strong> {usuario?.email}</p>
            <p><strong>Data de Nascimento:</strong> {new Date(usuario?.dataNascimento || '').toLocaleDateString()}</p>
            <p><strong>CPF:</strong> {usuario?.cpf}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Minhas Solicitações</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="px-4 py-2 border">Remédio</th>
                  <th className="px-4 py-2 border">Farmácia</th>
                  <th className="px-4 py-2 border">Data</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {solicitacoes.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{s.remedio}</td>
                    <td className="px-4 py-2 border">{s.farmacia}</td>
                    <td className="px-4 py-2 border">{new Date(s.dataSolicitacao).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
