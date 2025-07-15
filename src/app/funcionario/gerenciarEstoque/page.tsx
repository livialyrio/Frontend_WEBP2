'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Tag from '@/components/tag/Tag';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import {
  listarEstoques,
  criarEstoque,
  atualizarEstoque,
  deletarEstoque,
  listarEstoqueBaixo,
  Estoque,
} from '@/services/estoqueService';

export default function GerenciarEstoque() {
  const [filtroNome, setFiltroNome] = useState('');
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [novoEstoque, setNovoEstoque] = useState<Estoque>({
    farmaciaId: 0,
    remedioId: 0,
    quantidade_disponivel: 0,
  });
  const [estoqueEditando, setEstoqueEditando] = useState<Estoque | null>(null);

  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => {
    carregarEstoques();
  }, []);

  const carregarEstoques = async () => {
    try {
      const dados = await listarEstoques(token);
      setEstoques(dados);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdicionarEstoque = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await criarEstoque(novoEstoque, token);
      setModalAdicionarAberto(false);
      await carregarEstoques();
      setNovoEstoque({ farmaciaId: 0, remedioId: 0, quantidade_disponivel: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarEstoque = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estoqueEditando) return;
    try {
      await atualizarEstoque(estoqueEditando.estoqueId!, estoqueEditando, token);
      setModalEditarAberto(false);
      await carregarEstoques();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletar = async (id: number) => {
    try {
      await deletarEstoque(id, token);
      await carregarEstoques();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEstoqueBaixo = async () => {
    try {
      const dados = await listarEstoqueBaixo(token);
      setEstoques(dados);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Estoques</h1>
          <div className="flex gap-4">
            {/* Botão Criar */}
            <button
              onClick={() => setModalAdicionarAberto(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              + Adicionar Estoque
            </button>

            {/* Botão Voltar */}
            <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
          </div>
        </header>

        <section className="mb-4 flex gap-4 items-center flex-wrap">
          <InputTexto
            value={filtroNome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltroNome(e.target.value)}
            placeholder="Digite o nome do medicamento"
          />
          <button
            onClick={handleEstoqueBaixo}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Ver Estoques Baixos
          </button>
        </section>

        <section className="bg-white shadow rounded-lg overflow-x-auto p-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="text-blue-800">
              <tr>
                <th>Medicamento (ID)</th>
                <th>Farmácia (ID)</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {estoques.map((estoque) => (
                <tr key={estoque.estoqueId} className="bg-[#f4f7fc]">
                  <td>{estoque.remedioId}</td>
                  <td>{estoque.farmaciaId}</td>
                  <td>{estoque.quantidade_disponivel}</td>
                  <td>
                    <Tag
                      label={estoque.quantidade_disponivel > 20 ? 'Disponível' : 'Baixo'}
                      color={estoque.quantidade_disponivel > 20 ? 'verde' : 'amarelo'}
                    />
                  </td>
                  <td className="flex gap-4">
                    <button
                      onClick={() => {
                        setEstoqueEditando(estoque);
                        setModalEditarAberto(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeletar(estoque.estoqueId!)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Modal Adicionar Estoque */}
      <Modal isOpen={modalAdicionarAberto} onClose={() => setModalAdicionarAberto(false)} title="Adicionar Estoque">
        <form className="space-y-4" onSubmit={handleAdicionarEstoque}>
          <InputTexto
            placeholder="Digite o ID do Remédio"
            value={novoEstoque.remedioId ? novoEstoque.remedioId.toString() : ''}
            onChange={(e) => setNovoEstoque({ ...novoEstoque, remedioId: Number(e.target.value) })}
          />
          <InputTexto
            placeholder="Digite o ID da Farmácia"
            value={novoEstoque.farmaciaId ? novoEstoque.farmaciaId.toString() : ''}
            onChange={(e) => setNovoEstoque({ ...novoEstoque, farmaciaId: Number(e.target.value) })}
          />
          <InputTexto
            placeholder="Digite a quantidade disponível"
            type="number"
            value={novoEstoque.quantidade_disponivel ? novoEstoque.quantidade_disponivel.toString() : ''}
            onChange={(e) => setNovoEstoque({ ...novoEstoque, quantidade_disponivel: Number(e.target.value) })}
          />
          <div className="flex justify-end">
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </Modal>

      {/* Modal Editar Estoque */}
      <Modal isOpen={modalEditarAberto} onClose={() => setModalEditarAberto(false)} title="Editar Estoque">
        {estoqueEditando && (
          <form className="space-y-4" onSubmit={handleEditarEstoque}>
            <InputTexto
              placeholder="Digite o ID do Remédio"
              value={estoqueEditando.remedioId ? estoqueEditando.remedioId.toString() : ''}
              onChange={(e) =>
                setEstoqueEditando({ ...estoqueEditando, remedioId: Number(e.target.value) })
              }
            />
            <InputTexto
              placeholder="Digite o ID da Farmácia"
              value={estoqueEditando.farmaciaId ? estoqueEditando.farmaciaId.toString() : ''}
              onChange={(e) =>
                setEstoqueEditando({ ...estoqueEditando, farmaciaId: Number(e.target.value) })
              }
            />
            <InputTexto
              placeholder="Digite a quantidade disponível"
              type="number"
              value={estoqueEditando.quantidade_disponivel ? estoqueEditando.quantidade_disponivel.toString() : ''}
              onChange={(e) =>
                setEstoqueEditando({
                  ...estoqueEditando,
                  quantidade_disponivel: Number(e.target.value),
                })
              }
            />
            <div className="flex justify-end">
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        )}
      </Modal>
    </main>
  );
}
