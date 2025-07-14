'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';
import Alert from '@/components/alertas/alerta';

import {
  listarSolicitacoes,
  criarSolicitacao,
  atualizarSolicitacao,
  removerSolicitacao,
} from '@/services/solicitacoesService'; 
import { Solicitacao, CriarSolicitacaoPayload } from '@/services/solicitacoesService';

export default function GerenciarSolicitacoes() {
  const router = useRouter();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [filtroUsuarioId, setFiltroUsuarioId] = useState('');
  const [filtroSolicitacaoId, setFiltroSolicitacaoId] = useState('');
  const [ordenarPorData, setOrdenarPorData] = useState<'ASC' | 'DESC'>('DESC');
  const [novaSolicitacao, setNovaSolicitacao] = useState<CriarSolicitacaoPayload>({
    usuarioId: 0,
    remedioId: 0,
    farmaciaId: 0,
    justificativa: '',
  });
  const [editandoSolicitacao, setEditandoSolicitacao] = useState<Solicitacao | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [alerta, setAlerta] = useState<string | null>(null);


  useEffect(() => {
    async function carregarSolicitacoes() {
      try {
        const token = localStorage.getItem('token') || '';
        const dados = await listarSolicitacoes(token);
        setSolicitacoes(dados);
      } catch (err: any) {
        console.error('Erro ao carregar solicitações:', err);
        setErro('Erro ao carregar solicitações. Verifique sua autenticação.'); 
      }
    }
    carregarSolicitacoes();
  }, []);

  async function criar(e: React.FormEvent) {
    e.preventDefault();

    const { usuarioId, remedioId, farmaciaId, justificativa } = novaSolicitacao;
    if (!usuarioId || !remedioId || !farmaciaId || !justificativa.trim()) {
      setAlerta('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const token = localStorage.getItem('token') || '';
      const nova = await criarSolicitacao(novaSolicitacao, token);
      setSolicitacoes([...solicitacoes, nova]);
      setModalAberto(false);
      setNovaSolicitacao({ usuarioId: 0, remedioId: 0, farmaciaId: 0, justificativa: '' });
      setErro(null);
      setAlerta(null);
    } catch (err: any) {
      console.error('Erro ao criar solicitação:', err);
      setErro('Erro ao criar solicitação.');
    }
  }

  async function salvarEdicao(e: React.FormEvent) {
    e.preventDefault();
    if (!editandoSolicitacao) return;
    try {
      const token = localStorage.getItem('token') || '';
      const atualizada = await atualizarSolicitacao(editandoSolicitacao.id, editandoSolicitacao, token);
      setSolicitacoes(prev => prev.map(s => s.id === atualizada.id ? atualizada : s));
      setModalEdicaoAberto(false);
      setErro(null);
    } catch (err: any) {
      console.error('Erro ao editar:', err);
      setErro('Erro ao editar solicitação.');
    }
  }

  async function remover(id: number) {
    try {
      const token = localStorage.getItem('token') || '';
      await removerSolicitacao(id, token);
      setSolicitacoes(prev => prev.filter(s => s.id !== id));
    setErro(null); 
    } catch (err: any) {
      console.error('Erro ao remover:', err);
      setErro('Erro ao remover solicitação.');
    }
  }

async function buscarPorUsuario() {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await fetch(`http://localhost:3001/solicitacoes/usuario/${filtroUsuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erro ao buscar por usuário');
      const data = await res.json();
      setSolicitacoes(data);
      setErro(null); 
    } catch (err: any) {
      console.error('Erro ao buscar por usuário:', err);
      setErro(err.message || 'Erro ao buscar por usuário');
    }
  }

  async function buscarPorSolicitacaoId() {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await fetch(`http://localhost:3001/solicitacoes/${filtroSolicitacaoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erro ao buscar por ID da solicitação');
      const data = await res.json();
      setSolicitacoes([data]); 
      setErro(null);
    } catch (err: any) {
      console.error('Erro ao buscar por ID da solicitação:', err);
      setErro(err.message || 'Erro ao buscar por ID da solicitação');
    }
  }

  function ordenarPorDataFunc() {
    const ordenado = [...solicitacoes].sort((a, b) => {
      return ordenarPorData === 'ASC'
        ? new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime()
        : new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime();
    });
    setSolicitacoes(ordenado);
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

        {erro && (
          <Alert variant="error">{erro}</Alert>
        )}

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

          <Button onClick={() => window.location.reload()}>Todos os registros</Button>

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
                      if (opcao === 'editar') {
                        setEditandoSolicitacao(s);
                        setModalEdicaoAberto(true);
                      } else if (opcao === 'remover') {
                        remover(s.id);
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

 <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Nova Solicitação">
          <form onSubmit={criar} className="space-y-4">
            {alerta && <Alert variant="warning">{alerta}</Alert>}
            <InputTexto
              placeholder="ID do usuário"
              onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, usuarioId: Number(e.target.value) })}
            />
            <InputTexto
              placeholder="ID do remédio"
              onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, remedioId: Number(e.target.value) })}
            />
            <InputTexto
              placeholder="ID da farmácia"
              onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, farmaciaId: Number(e.target.value) })}
            />
            <InputTexto
              placeholder="Justificativa"
              onChange={(e) => setNovaSolicitacao({ ...novaSolicitacao, justificativa: e.target.value })}
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Modal>

        <Modal isOpen={modalEdicaoAberto} onClose={() => setModalEdicaoAberto(false)} title="Editar Solicitação">
          {editandoSolicitacao && (
            <form onSubmit={salvarEdicao} className="space-y-4">
              <InputTexto
                placeholder="ID do usuário"
                value={editandoSolicitacao.usuarioId.toString()}
                onChange={(e) => setEditandoSolicitacao({ ...editandoSolicitacao, usuarioId: Number(e.target.value) })}
              />
              <InputTexto
                placeholder="ID do remédio"
                value={editandoSolicitacao.remedioId.toString()}
                onChange={(e) => setEditandoSolicitacao({ ...editandoSolicitacao, remedioId: Number(e.target.value) })}
              />
              <InputTexto
                placeholder="ID da farmácia"
                value={editandoSolicitacao.farmaciaId.toString()}
                onChange={(e) => setEditandoSolicitacao({ ...editandoSolicitacao, farmaciaId: Number(e.target.value) })}
              />
              <InputTexto
                placeholder="Justificativa"
                value={editandoSolicitacao.justificativa}
                onChange={(e) => setEditandoSolicitacao({ ...editandoSolicitacao, justificativa: e.target.value })}
              />
              <Button type="submit">Salvar Alterações</Button>
            </form>
          )}
        </Modal>
      </div>
    </main>
  );
}
