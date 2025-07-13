'use client';

import { useEffect, useState } from 'react';
import { Dropdown } from '@/components/ui/Dropdown';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Tag from '@/components/tag/Tag';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button'; 
import {
  listarEstoques,
  criarEstoque,
  atualizarEstoque,
} from '@/service/estoqueService';

interface Estoque {
  id?: number;
  remedioId: number;
  farmaciaId: number;
  quantidade: number;
}

export default function GerenciarEstoque() {
  const [filtroNome, setFiltroNome] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [novoEstoque, setNovoEstoque] = useState<Partial<Estoque>>({});
  const [modoEdicao, setModoEdicao] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function carregar() {
      const dados = await listarEstoques();
      setEstoques(dados);
    }
    carregar();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (modoEdicao && novoEstoque.id) {
        await atualizarEstoque(novoEstoque.id, novoEstoque as Estoque);
      } else {
        await criarEstoque(novoEstoque as Estoque);
      }
      const atualizados = await listarEstoques();
      setEstoques(atualizados);
      setModalAberto(false);
      setModoEdicao(false);
      setNovoEstoque({});
    } catch (err) {
      alert('Erro ao salvar o estoque');
    }
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Estoques</h1>
          <div className="flex gap-2">
            <Button onClick={() => setModalAberto(true)}>+ Adicionar Estoque</Button>
            <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
          </div>
        </header>

        <section className="mb-4 flex gap-4 items-center flex-wrap">
          <InputTexto
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            placeholder="Filtrar por nome do medicamento"
          />

          <Dropdown
            label="Filtrar por status"
            options={[]}
          />
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
              {estoques.map((item) => (
                <tr key={item.id} className="bg-[#f4f7fc]">
                  <td>{item.remedioId}</td>
                  <td>{item.farmaciaId}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    <Tag
                      label={
                        item.quantidade === 0
                          ? 'Esgotado'
                          : item.quantidade < 3
                          ? 'Baixo'
                          : 'Disponível'
                      }
                      color={
                        item.quantidade === 0
                          ? 'vermelho'
                          : item.quantidade < 3
                          ? 'amarelo'
                          : 'verde'
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setNovoEstoque(item);
                        setModoEdicao(true);
                        setModalAberto(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <Modal
        isOpen={modalAberto}
        onClose={() => {
          setModalAberto(false);
          setModoEdicao(false);
          setNovoEstoque({});
        }}
        title={modoEdicao ? 'Editar Estoque' : 'Novo Estoque'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputTexto
            placeholder="ID do Remédio"
            type="number"
            value={novoEstoque.remedioId ?? ''}
            onChange={(e) => setNovoEstoque({ ...novoEstoque, remedioId: Number(e.target.value) })}
          />
          <InputTexto
            placeholder="ID da Farmácia"
            type="number"
            value={novoEstoque.farmaciaId ?? ''}
            onChange={(e) => setNovoEstoque({ ...novoEstoque, farmaciaId: Number(e.target.value) })}
          />
          <InputTexto
            placeholder="Quantidade"
            type="number"
            value={novoEstoque.quantidade ?? ''}
            onChange={(e) => setNovoEstoque({ ...novoEstoque, quantidade: Number(e.target.value) })}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
