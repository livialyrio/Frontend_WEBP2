'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';
import {
  listarDoacoesRemedios,
  buscarDoacaoPorId,
  listarDoacoesPorUsuario,
  criarDoacaoRemedio,
  atualizarDoacaoRemedio,
  deletarDoacaoRemedio,
} from '@/services/doacoesRemediosService';

interface DoacaoRemedio {
  doacaoRemedioId?: number;
  solicitacaoId?: number;
  usuarioId: number;
  remedioId: number;
  quantidade: number;
  data_doacao?: string;
  data_fim_tratamento: string;
}

export default function GerenciarDoacoesRemedios() {
  const router = useRouter();
  const [doacoes, setDoacoes] = useState<DoacaoRemedio[]>([]);
  const [listaCompleta, setListaCompleta] = useState<DoacaoRemedio[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [filtroUsuarioId, setFiltroUsuarioId] = useState('');
  const [filtroDoacaoId, setFiltroDoacaoId] = useState('');
  const [novaDoacao, setNovaDoacao] = useState<Partial<DoacaoRemedio>>({});
  const [editandoDoacao, setEditandoDoacao] = useState<Partial<DoacaoRemedio>>({});
  const [erro, setErro] = useState<string | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => {
    async function carregarDoacoes() {
      try {
        const data = await listarDoacoesRemedios(token);
        setDoacoes(data);
        setListaCompleta(data);
        setErro(null);
      } catch (error) {
        console.error('Erro ao carregar doações', error);
        setErro('NetworkError when attempting to fetch resource');
      }
    }

    carregarDoacoes();
  }, []);

  async function buscarPorUsuario() {
    try {
      const data = await listarDoacoesPorUsuario(Number(filtroUsuarioId), token);
      setDoacoes(data);
      setErro(null);
    } catch (error) {
      console.error('Erro ao buscar por usuário', error);
      setErro('NetworkError when attempting to fetch resource');
    }
  }

  async function buscarPorId() {
    try {
      const data = await buscarDoacaoPorId(Number(filtroDoacaoId), token);
      setDoacoes([data]);
      setErro(null);
    } catch (error) {
      console.error('Erro ao buscar por ID', error);
      setErro('NetworkError when attempting to fetch resource');
    }
  }

  function restaurarLista() {
    setDoacoes(listaCompleta);
    setFiltroUsuarioId('');
    setFiltroDoacaoId('');
    setErro(null);
  }

  async function criarNovaDoacao(e: React.FormEvent) {
    e.preventDefault();
    try {
      await criarDoacaoRemedio(novaDoacao as DoacaoRemedio, token);
      const atualizada = await listarDoacoesRemedios(token);
      setListaCompleta(atualizada);
      setDoacoes(atualizada);
      setModalAberto(false);
      setErro(null);
    } catch (error) {
      console.error('Erro ao criar doação', error);
      setErro('NetworkError when attempting to fetch resource');
    }
  }

  async function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!editandoDoacao.doacaoRemedioId) return;
      await atualizarDoacaoRemedio(editandoDoacao.doacaoRemedioId, editandoDoacao as DoacaoRemedio, token);
      const atualizada = await listarDoacoesRemedios(token);
      setListaCompleta(atualizada);
      setDoacoes(atualizada);
      setModalEdicaoAberto(false);
      setErro(null);
    } catch (error) {
      console.error('Erro ao editar doação', error);
      setErro('NetworkError when attempting to fetch resource');
    }
  }

  async function removerDoacao(id: number) {
    try {
      await deletarDoacaoRemedio(id, token);
      const atualizada = listaCompleta.filter(d => d.doacaoRemedioId !== id);
      setListaCompleta(atualizada);
      setDoacoes(atualizada);
      setErro(null);
    } catch (error) {
      console.error('Erro ao remover doação', error);
      setErro('NetworkError when attempting to fetch resource');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {erro && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 font-semibold">
            {erro}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Relação Doações - Remédios</h1>
          <div className="flex gap-3">
            <Button onClick={() => setModalAberto(true)}>Nova Doação</Button>
            <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <InputTexto placeholder="Buscar por ID da doação" value={filtroDoacaoId} onChange={(e) => setFiltroDoacaoId(e.target.value)} />
          <Button onClick={buscarPorId}>Buscar por ID</Button>

          <InputTexto placeholder="Buscar por ID de usuário" value={filtroUsuarioId} onChange={(e) => setFiltroUsuarioId(e.target.value)} />
          <Button onClick={buscarPorUsuario}>Buscar por Usuário</Button>

          <Button onClick={restaurarLista}>Todos os registros</Button>
        </div>

        <table className="w-full text-left bg-white border">
          <thead className="bg-gray-100 text-blue-800">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Solicitação</th>
              <th className="p-2">Usuário</th>
              <th className="p-2">Remédio</th>
              <th className="p-2">Quantidade</th>
              <th className="p-2">Doação</th>
              <th className="p-2">Fim Tratamento</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {doacoes.map((d) => (
              <tr key={d.doacaoRemedioId} className="border-t hover:bg-blue-50">
                <td className="p-2">{d.doacaoRemedioId}</td>
                <td className="p-2">{d.solicitacaoId}</td>
                <td className="p-2">{d.usuarioId}</td>
                <td className="p-2">{d.remedioId}</td>
                <td className="p-2">{d.quantidade}</td>
                <td className="p-2">{d.data_doacao}</td>
                <td className="p-2">{d.data_fim_tratamento}</td>
                <td className="p-2">
                  <select
                    onChange={(e) => {
                      const opcao = e.target.value;
                      setEditandoDoacao(d);
                      if (opcao === 'editar') {
                        setModalEdicaoAberto(true);
                      } else if (opcao === 'remover') {
                        removerDoacao(d.doacaoRemedioId!);
                      }
                    }}
                    defaultValue=""
                    className="border rounded px-2 py-1"
                  >
                    <option value="" disabled>Ações</option>
                    <option value="editar">Editar</option>
                    <option value="remover">Remover</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Nova Doação">
          <form onSubmit={criarNovaDoacao} className="space-y-4">
            <InputTexto placeholder="ID da solicitação" onChange={(e) => setNovaDoacao({ ...novaDoacao, solicitacaoId: Number(e.target.value) })} />
            <InputTexto placeholder="ID do usuário" onChange={(e) => setNovaDoacao({ ...novaDoacao, usuarioId: Number(e.target.value) })} />
            <InputTexto placeholder="ID do remédio" onChange={(e) => setNovaDoacao({ ...novaDoacao, remedioId: Number(e.target.value) })} />
            <InputTexto placeholder="Quantidade" onChange={(e) => setNovaDoacao({ ...novaDoacao, quantidade: Number(e.target.value) })} />
            <InputTexto placeholder="Data da doação (YYYY-MM-DD)" onChange={(e) => setNovaDoacao({ ...novaDoacao, data_doacao: e.target.value })} />
            <InputTexto placeholder="Data fim do tratamento (YYYY-MM-DD)" onChange={(e) => setNovaDoacao({ ...novaDoacao, data_fim_tratamento: e.target.value })} />
            <Button type="submit">Salvar</Button>
          </form>
        </Modal>

        <Modal isOpen={modalEdicaoAberto} onClose={() => setModalEdicaoAberto(false)} title="Editar Doação">
          <form onSubmit={salvarEdicao} className="space-y-4">
            <InputTexto placeholder="Solicitação ID" value={editandoDoacao.solicitacaoId?.toString() || ''} onChange={(e) => setEditandoDoacao({ ...editandoDoacao, solicitacaoId: Number(e.target.value) })} />
            <InputTexto placeholder="Usuário ID" value={editandoDoacao.usuarioId?.toString() || ''} onChange={(e) => setEditandoDoacao({ ...editandoDoacao, usuarioId: Number(e.target.value) })} />
            <InputTexto placeholder="Remédio ID" value={editandoDoacao.remedioId?.toString() || ''} onChange={(e) => setEditandoDoacao({ ...editandoDoacao, remedioId: Number(e.target.value) })} />
            <InputTexto placeholder="Quantidade" value={editandoDoacao.quantidade?.toString() || ''} onChange={(e) => setEditandoDoacao({ ...editandoDoacao, quantidade: Number(e.target.value) })} />
            <InputTexto placeholder="Data da Doação" value={editandoDoacao.data_doacao || ''} onChange={(e) => setEditandoDoacao({ ...editandoDoacao, data_doacao: e.target.value })} />
            <InputTexto placeholder="Data fim do tratamento" value={editandoDoacao.data_fim_tratamento || ''} onChange={(e) => setEditandoDoacao({ ...editandoDoacao, data_fim_tratamento: e.target.value })} />
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </Modal>
      </div>
    </main>
  );
}
