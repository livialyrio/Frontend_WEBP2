'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';

interface DoacaoRemedio {
  id: number;
  solicitacaoId: number;
  usuarioId: number;
  remedioId: number;
  quantidade: number;
  data_doacao: string;
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

  useEffect(() => {
    const dadosIniciais = [
      {
        id: 1,
        solicitacaoId: 1,
        usuarioId: 1,
        remedioId: 2,
        quantidade: 2,
        data_doacao: '2025-06-01',
        data_fim_tratamento: '2025-07-01',
      },
    ];
    setDoacoes(dadosIniciais);
    setListaCompleta(dadosIniciais);
  }, []);

  function buscarPorUsuario() {
    const resultado = listaCompleta.filter(d => d.usuarioId === Number(filtroUsuarioId));
    setDoacoes(resultado);
  }

  function buscarPorId() {
    const resultado = listaCompleta.filter(d => d.id === Number(filtroDoacaoId));
    setDoacoes(resultado);
  }

  function restaurarLista() {
    setDoacoes(listaCompleta);
    setFiltroUsuarioId('');
    setFiltroDoacaoId('');
  }

  function criarDoacao(e: React.FormEvent) {
    e.preventDefault();
    const nova: DoacaoRemedio = {
      id: listaCompleta.length + 1,
      solicitacaoId: Number(novaDoacao.solicitacaoId),
      usuarioId: Number(novaDoacao.usuarioId),
      remedioId: Number(novaDoacao.remedioId),
      quantidade: Number(novaDoacao.quantidade),
      data_doacao: novaDoacao.data_doacao || '',
      data_fim_tratamento: novaDoacao.data_fim_tratamento || '',
    };
    const novaLista = [...listaCompleta, nova];
    setListaCompleta(novaLista);
    setDoacoes(novaLista);
    setModalAberto(false);
  }

  function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    const novaLista = listaCompleta.map(d =>
      d.id === editandoDoacao.id ? { ...d, ...editandoDoacao } as DoacaoRemedio : d
    );
    setListaCompleta(novaLista);
    setDoacoes(novaLista);
    setModalEdicaoAberto(false);
  }

  function removerDoacao(id: number) {
    const novaLista = listaCompleta.filter(d => d.id !== id);
    setListaCompleta(novaLista);
    setDoacoes(novaLista);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
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
              <tr key={d.id} className="border-t hover:bg-blue-50">
                <td className="p-2">{d.id}</td>
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
                      if (opcao === 'editar' || opcao === 'editarParcial') {
                        setModalEdicaoAberto(true);
                      } else if (opcao === 'remover') {
                        removerDoacao(d.id);
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
          <form onSubmit={criarDoacao} className="space-y-4">
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