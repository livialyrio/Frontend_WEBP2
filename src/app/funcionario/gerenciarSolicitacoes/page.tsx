'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';

interface Solicitacao {
  id: number;
  usuarioId: number;
  remedioId: number;
  farmaciaId: number;
  justificativa: string;
  dataCriacao: string;
}

export default function GerenciarSolicitacoes() {
  const router = useRouter();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [filtroUsuarioId, setFiltroUsuarioId] = useState('');
  const [filtroSolicitacaoId, setFiltroSolicitacaoId] = useState('');
  const [ordenarPorData, setOrdenarPorData] = useState<'ASC' | 'DESC'>('DESC');
  const [novaSolicitacao, setNovaSolicitacao] = useState<Partial<Solicitacao>>({});
  const [editandoSolicitacao, setEditandoSolicitacao] = useState<Partial<Solicitacao>>({});
  const [solicitacoesOriginais, setSolicitacoesOriginais] = useState<Solicitacao[]>([]);

useEffect(() => {
  const dadosIniciais = [
    {
      id: 1,
      usuarioId: 1,
      remedioId: 2,
      farmaciaId: 1,
      justificativa: 'Dor de cabeça',
      dataCriacao: '2024-07-12T10:00:00Z',
    },
    {
      id: 2,
      usuarioId: 2,
      remedioId: 1,
      farmaciaId: 2,
      justificativa: 'Febre',
      dataCriacao: '2024-07-13T09:00:00Z',
    },
  ];
  setSolicitacoes(dadosIniciais);
  setSolicitacoesOriginais(dadosIniciais);
}, []);

    function restaurarLista() {
    setSolicitacoes(solicitacoesOriginais);
    setFiltroUsuarioId('');
    setFiltroSolicitacaoId('');
  }
  function buscarPorUsuario() {
    const resultado = solicitacoes.filter(
      (s) => s.usuarioId === Number(filtroUsuarioId)
    );
    setSolicitacoes(resultado);
  }

  function buscarPorSolicitacaoId() {
    const resultado = solicitacoes.filter(
      (s) => s.id === Number(filtroSolicitacaoId)
    );
    setSolicitacoes(resultado);
  }

  function ordenarPorDataFunc() {
    const ordenado = [...solicitacoes].sort((a, b) => {
      return ordenarPorData === 'ASC'
        ? new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime()
        : new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime();
    });
    setSolicitacoes(ordenado);
  }

  function criarSolicitacao(e: React.FormEvent) {
    e.preventDefault();
    const nova: Solicitacao = {
      id: solicitacoes.length + 1,
      usuarioId: Number(novaSolicitacao.usuarioId),
      remedioId: Number(novaSolicitacao.remedioId),
      farmaciaId: Number(novaSolicitacao.farmaciaId),
      justificativa: novaSolicitacao.justificativa || '',
      dataCriacao: new Date().toISOString(),
    };
    setSolicitacoes([...solicitacoes, nova]);
    setModalAberto(false);
  }

  function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    setSolicitacoes((prev) =>
      prev.map((s) =>
        s.id === editandoSolicitacao.id
          ? { ...s, ...editandoSolicitacao } as Solicitacao
          : s
      )
    );
    setModalEdicaoAberto(false);
  }

  function removerSolicitacao(id: number) {
    setSolicitacoes(solicitacoes.filter((s) => s.id !== id));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Solicitações</h1>
          <div className="flex gap-3">
            <Button onClick={() => setModalAberto(true)}>Nova Solicitação</Button>
            <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <InputTexto
            placeholder="Buscar por ID da solicitação"
            value={filtroSolicitacaoId}
            onChange={(e) => setFiltroSolicitacaoId(e.target.value)}
          />
          <Button onClick={buscarPorSolicitacaoId}>Buscar por ID</Button>

          <InputTexto
            placeholder="Buscar por ID de usuário"
            value={filtroUsuarioId}
            onChange={(e) => setFiltroUsuarioId(e.target.value)}
          />
          <Button onClick={buscarPorUsuario}>Buscar por Usuário</Button>

           <Button onClick={restaurarLista}>Todos os registros</Button>

          <select
            className="border rounded px-3 py-2"
            value={ordenarPorData}
            onChange={(e) => {
              setOrdenarPorData(e.target.value as 'ASC' | 'DESC');
              ordenarPorDataFunc();
            }}
          >
            <option value="DESC">Mais recentes</option>
            <option value="ASC">Mais antigas</option>
          </select>
        </div>

        <table className="w-full text-left bg-white border">
          <thead className="bg-gray-100 text-blue-800">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Usuário</th>
              <th className="p-2">Remédio</th>
              <th className="p-2">Farmácia</th>
              <th className="p-2">Justificativa</th>
              <th className="p-2">Data</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((s) => (
              <tr key={s.id} className="border-t hover:bg-blue-50">
                <td className="p-2">{s.id}</td>
                <td className="p-2">{s.usuarioId}</td>
                <td className="p-2">{s.remedioId}</td>
                <td className="p-2">{s.farmaciaId}</td>
                <td className="p-2">{s.justificativa}</td>
                <td className="p-2">{new Date(s.dataCriacao).toLocaleDateString()}</td>
                <td className="p-2">
                  <select
                    onChange={(e) => {
                      const opcao = e.target.value;
                      setEditandoSolicitacao(s);
                      if (opcao === 'editar') setModalEdicaoAberto(true);
                      else if (opcao === 'remover') removerSolicitacao(s.id);
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

        <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Nova Solicitação">
          <form onSubmit={criarSolicitacao} className="space-y-4">
            <InputTexto placeholder="ID do usuário" onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, usuarioId: Number(e.target.value) })} />
            <InputTexto placeholder="ID do remédio" onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, remedioId: Number(e.target.value) })} />
            <InputTexto placeholder="ID da farmácia" onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, farmaciaId: Number(e.target.value) })} />
            <InputTexto placeholder="Justificativa" onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, justificativa: e.target.value })} />
            <Button type="submit">Salvar</Button>
          </form>
        </Modal>

        <Modal isOpen={modalEdicaoAberto} onClose={() => setModalEdicaoAberto(false)} title="Editar Solicitação">
          <form onSubmit={salvarEdicao} className="space-y-4">
            <InputTexto placeholder="ID do usuário" value={editandoSolicitacao.usuarioId?.toString()} onChange={(e) => setEditandoSolicitacao({ ...editandoSolicitacao, usuarioId: Number(e.target.value) })} />
            <InputTexto placeholder="ID do remédio" value={editandoSolicitacao.remedioId?.toString()} onChange={(e) => setEditandoSolicitacao({ ...editandoSolicitacao, remedioId: Number(e.target.value) })} />
            <InputTexto placeholder="ID da farmácia" value={editandoSolicitacao.farmaciaId?.toString()} onChange={(e) => setEditandoSolicitacao({ ...editandoSolicitacao, farmaciaId: Number(e.target.value) })} />
            <InputTexto placeholder="Justificativa" value={editandoSolicitacao.justificativa || ''} onChange={(e) => setEditandoSolicitacao({ ...editandoSolicitacao, justificativa: e.target.value })} />
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </Modal>
      </div>
    </main>
  );
}
