'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FuncionarioDashboard } from "@/components/dashboard/FuncionarioDashboard";

interface Funcionario {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  cpf: string;
  farmacia: string;
  funcionario: boolean;
}

export default function Funcionario() {
  const router = useRouter();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);

  useEffect(() => {
    async function buscarFuncionario() {
      try {
        const dados: Funcionario = {
          id: 1,
          nome: 'Maria dos Anjos',
          email: 'mariah@email.com',
          dataNascimento: '2003-01-10',
          cpf: '123.456.789-00',
          farmacia: 'Farmácia Central',
          funcionario: true,
        };

        if (dados.funcionario) {
          setFuncionario(dados); 
        } else {
          router.push('/login'); // se não for funcionário, redireciona
        }
      } catch (err) {
        console.error('Erro ao buscar dados do funcionário:', err);
        router.push('/login');
      }
    }

    buscarFuncionario();
  }, [router]);

  if (!funcionario) return <p className="p-4">Carregando dados...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-900">Bem-vindo funcionário</h1>
          <button
            onClick={() => router.push('/')}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Início
          </button>
        </div>

        <div className="space-y-2 text-gray-800">
          <p><strong>Nome:</strong> {funcionario.nome}</p>
          <p><strong>Email:</strong> {funcionario.email}</p>
          <p><strong>Data de Nascimento:</strong> {new Date(funcionario.dataNascimento).toLocaleDateString()}</p>
          <p><strong>CPF:</strong> {funcionario.cpf}</p>
          <p><strong>Farmácia:</strong> {funcionario.farmacia}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/funcionario/GerenciarRemedio')}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Gerenciar Remédio
          </button>
          <button
            onClick={() => router.push('/funcionario/gerenciarFarmacia')}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Gerenciar Farmácias
          </button>
          <button
            onClick={() => router.push('/funcionario/gerenciarEstoque')}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Gerenciar Estoques
          </button>
          <button
            onClick={() => router.push('/funcionario/gerenciarUsuario')}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Gerenciar Usuários
          </button>
          <button
            onClick={() => router.push('/funcionario/gerenciarSolicitacoes')}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Gerenciar Solicitações
          </button>
          <button
            onClick={() => router.push('funcionario/GerenciarReceitas')}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Gerenciar Receitas
          </button>
          <button
            onClick={() => router.push('funcionario/gerenciarDoacoesRemedios')}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Gerenciar Doações - Remédios
          </button>
        </div>

        {/* Dashboard do Funcionário */}
        <section className="mt-8">
          <FuncionarioDashboard />
        </section>
      </div>
    </main>
  );
}
