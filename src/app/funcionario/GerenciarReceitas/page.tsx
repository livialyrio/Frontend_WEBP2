'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import Modal from '@/components/Modal_Simples/Modal';
import TabelaFiltros from '@/components/tabela/TabelaFiltros';
import { InputTexto } from '@/components/ui/InputText';


import {
  listarReceitas,
  buscarReceitaPorId,
  criarReceita,
  atualizarReceita,
  removerReceita,
  verificarValidadeReceita,
} from '@/services/ReceitasService'; 

interface Receita {
  idSolicitacao: number;
  descricao: string;
  data: string;
  validade: string;
}

interface ReceitaEditando extends Partial<Receita> {
  campoParaAtualizar?: keyof Receita; 
}

export default function GerenciarReceita() {
  const router = useRouter();
  const [receitas, setReceitas] = useState<Receita[]>([]);

  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalBuscarAberto, setModalBuscarAberto] = useState(false);
  const [modalAtualizarCompletoAberto, setModalAtualizarCompletoAberto] = useState(false);
  const [modalAtualizarParcialAberto, setModalAtualizarParcialAberto] = useState(false);
  const [modalRemoverAberto, setModalRemoverAberto] = useState(false);
  const [modalVerificarValidadeAberto, setModalVerificarValidadeAberto] = useState(false);

  const [novaReceitaData, setNovaReceitaData] = useState<Partial<Receita>>({});
  const [receitaEditando, setReceitaEditando] = useState<ReceitaEditando>({}); 
  const [filtroIdSolicitacao, setFiltroIdSolicitacao] = useState('');

  const [receitasExibidas, setReceitasExibidas] = useState<Receita[]>([]);
  const [mensagemAcao, setMensagemAcao] = useState(''); 
  const [mensagemValidade, setMensagemValidade] = useState(''); 

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => {
    handleListarTodasReceitas();
  }, []);

  const resetAllStates = () => {
    setModalCriarAberto(false);
    setModalBuscarAberto(false);
    setModalAtualizarCompletoAberto(false);
    setModalAtualizarParcialAberto(false);
    setModalRemoverAberto(false);
    setModalVerificarValidadeAberto(false);

    setNovaReceitaData({});
    setReceitaEditando({});
    setFiltroIdSolicitacao('');

    setReceitasExibidas([]);
    setMensagemAcao('');
    setMensagemValidade('');
  };

  const handleAdicionarReceita = async (e: React.FormEvent) => {
    e.preventDefault();
    const { idSolicitacao, descricao, data, validade } = novaReceitaData;

    if (!idSolicitacao || !descricao || !data || !validade) {
      setMensagemAcao('Por favor, preencha todos os campos para criar a receita.');
      return;
    }

    try {
      const nova = await criarReceita(
        {
          idSolicitacao: Number(idSolicitacao),
          descricao,
          data,
          validade,
        },
        token
      );
      setReceitas(prev => [...prev, nova]);
      setMensagemAcao(`Receita ID ${nova.idSolicitacao} criada com sucesso!`);
      resetAllStates();
      handleListarTodasReceitas();
    } catch (error: any) {
      setMensagemAcao(error.message || 'Erro ao criar receita');
    }
  };

  const handleRemoverReceita = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = Number(filtroIdSolicitacao);
    if (isNaN(id)) {
      setMensagemAcao('Por favor, insira um ID de solicitação válido para remover.');
      return;
    }

    try {
      await removerReceita(id, token);
      setMensagemAcao(`Receita com ID ${id} removida com sucesso!`);
      setReceitas(prev => prev.filter(r => r.idSolicitacao !== id));
      resetAllStates();
      handleListarTodasReceitas();
    } catch (error: any) {
      setMensagemAcao(error.message || `Receita com ID ${id} não encontrada.`);
    }
  };

  const handleAtualizarReceitaCompleta = async (e: React.FormEvent) => {
    e.preventDefault();
    const { idSolicitacao, descricao, data, validade } = receitaEditando;

    if (!idSolicitacao || !descricao || !data || !validade) {
      setMensagemAcao('Por favor, preencha todos os campos para atualizar a receita.');
      return;
    }

    try {
      await atualizarReceita(idSolicitacao, { descricao, data, validade }, token);
      setMensagemAcao(`Receita ID ${idSolicitacao} atualizada por completo com sucesso!`);
      resetAllStates();
      handleListarTodasReceitas();
    } catch (error: any) {
      setMensagemAcao(error.message || 'Erro ao atualizar receita');
    }
  };

  const handleAtualizarCampoReceita = async (e: React.FormEvent) => {
    e.preventDefault();
    const { idSolicitacao, campoParaAtualizar } = receitaEditando;

    if (!idSolicitacao || !campoParaAtualizar || !receitaEditando[campoParaAtualizar as keyof Receita]) {
      setMensagemAcao('Por favor, selecione um campo e insira um novo valor.');
      return;
    }

    try {
      const payload: any = {
        [campoParaAtualizar]: receitaEditando[campoParaAtualizar],
      };
      await atualizarReceita(idSolicitacao, payload, token);
      setMensagemAcao(`Campo '${campoParaAtualizar}' da receita ID ${idSolicitacao} atualizado com sucesso!`);
      resetAllStates();
      handleListarTodasReceitas();
    } catch (error: any) {
      setMensagemAcao(error.message || 'Erro ao atualizar campo da receita');
    }
  };

  const handleListarTodasReceitas = async () => {
    resetAllStates();
    try {
      const res = await listarReceitas(token);
      setReceitas(res);
      setReceitasExibidas(res);
    } catch (error: any) {
      setMensagemAcao(error.message || 'Erro ao listar receitas');
    }
  };

  const handleBuscarReceitaPorId = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = Number(filtroIdSolicitacao);
    if (isNaN(id)) {
      setMensagemAcao('Por favor, insira um ID de solicitação válido para buscar.');
      setReceitasExibidas([]);
      return;
    }
    try {
      const encontrada = await buscarReceitaPorId(id, token);
      setReceitasExibidas(encontrada ? [encontrada] : []);
      setMensagemAcao(encontrada ? '' : `Receita com ID ${id} não encontrada.`);
    } catch (error: any) {
      setReceitasExibidas([]);
      setMensagemAcao(error.message || `Receita com ID ${id} não encontrada.`);
    }
  };

  const verificarValidadeReceitas = async () => {
    resetAllStates();
    setModalVerificarValidadeAberto(true);

    try {
      const todasReceitas = await listarReceitas(token);
      if (!todasReceitas || todasReceitas.length === 0) {
        setMensagemValidade('Nenhuma receita cadastrada para verificar a validade.');
        return;
      }

      let validas = 0;
      let vencidas = 0;
      const hoje = new Date();

      for (const receita of todasReceitas) {
        try {
          const resp = await verificarValidadeReceita(receita.idSolicitacao, token);
          if (resp && resp.valida) validas++;
          else vencidas++;
        } catch {
          vencidas++;
        }
      }

      setMensagemValidade(`Receitas válidas: ${validas} | Receitas vencidas: ${vencidas}`);
    } catch {
      setMensagemValidade('Erro ao verificar validade das receitas.');
    }
  };

  const colunasTabela = [
    { header: 'ID da Solicitação', accessor: 'idSolicitacao' },
    { header: 'Descrição', accessor: 'descricao' },
    { header: 'Data', accessor: 'data' },
    { header: 'Validade', accessor: 'validade' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Receitas</h1>
          <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <Button onClick={() => { resetAllStates(); setModalCriarAberto(true); }}>Criar Receita</Button>
          <Button onClick={() => { resetAllStates(); setModalBuscarAberto(true); }}>Buscar Receita (por ID)</Button>
          <Button onClick={handleListarTodasReceitas}>Listar Todas as Receitas</Button>
          <Button onClick={verificarValidadeReceitas}>Verificar Validade</Button>
        </div>

        {mensagemAcao && (
          <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
            {mensagemAcao}
          </div>
        )}

        <h2 className="text-2xl font-bold text-blue-800 mb-4">Receitas Cadastradas</h2>
        <table className="w-full text-left bg-white border">
          <thead className="bg-gray-100 text-blue-800">
            <tr>
              <th className="p-2">ID da Solicitação</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Data</th>
              <th className="p-2">Validade</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {receitas.length > 0 ? (
              receitas.map((r) => (
                <tr key={r.idSolicitacao} className="border-t hover:bg-blue-50">
                  <td className="p-2">{r.idSolicitacao}</td>
                  <td className="p-2">{r.descricao}</td>
                  <td className="p-2">{r.data}</td>
                  <td className="p-2">{r.validade}</td>
                  <td className="p-2">
                    <select
                      onChange={async (e) => {
                        const opcao = e.target.value;
                        setReceitaEditando(r);

                        if (opcao === 'atualizarParcial') {
                          setModalAtualizarParcialAberto(true);
                        } else if (opcao === 'atualizarCompleto') {
                          setModalAtualizarCompletoAberto(true);
                        } else if (opcao === 'remover') {
                          if (window.confirm(`Tem certeza que deseja remover a receita ID ${r.idSolicitacao}?`)) {
                            try {
                              await removerReceita(r.idSolicitacao, token);
                              setMensagemAcao(`Receita ID ${r.idSolicitacao} removida com sucesso!`);
                              handleListarTodasReceitas();
                            } catch (error: any) {
                              setMensagemAcao(error.message || `Receita ID ${r.idSolicitacao} não encontrada.`);
                            }
                          }
                        }
                        e.target.value = "";
                      }}
                      defaultValue=""
                      className="border rounded px-2 py-1"
                    >
                      <option value="" disabled>
                        Ações
                      </option>
                      <option value="atualizarParcial">Atualizar campo específico</option>
                      <option value="atualizarCompleto">Atualizar por completo</option>
                      <option value="remover">Remover</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Nenhuma receita cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {receitasExibidas.length > 0 && receitasExibidas.length !== receitas.length && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Resultados da Busca</h2>
            <TabelaFiltros data={receitasExibidas} columns={colunasTabela} />
          </div>
        )}

        <Modal isOpen={modalCriarAberto} onClose={() => resetAllStates()} title="Criar Nova Receita">
          <form onSubmit={handleAdicionarReceita} className="space-y-4">
            <InputTexto placeholder="ID da Solicitação" type="number" value={novaReceitaData.idSolicitacao?.toString() || ''} onChange={e => setNovaReceitaData({ ...novaReceitaData, idSolicitacao: Number(e.target.value) })} />
            <InputTexto placeholder="Descrição" value={novaReceitaData.descricao || ''} onChange={e => setNovaReceitaData({ ...novaReceitaData, descricao: e.target.value })} />
            <InputTexto placeholder="Data (YYYY-MM-DD)" type="date" value={novaReceitaData.data || ''} onChange={e => setNovaReceitaData({ ...novaReceitaData, data: e.target.value })} />
            <InputTexto placeholder="Validade (YYYY-MM-DD)" type="date" value={novaReceitaData.validade || ''} onChange={e => setNovaReceitaData({ ...novaReceitaData, validade: e.target.value })} />
            <Button type="submit">Adicionar Receita</Button>
          </form>
          {mensagemAcao && <p className="mt-4 text-red-600">{mensagemAcao}</p>}
        </Modal>

        <Modal isOpen={modalBuscarAberto} onClose={() => resetAllStates()} title="Buscar Receita por ID">
          <form onSubmit={handleBuscarReceitaPorId} className="space-y-4">
            <InputTexto placeholder="ID da Solicitação" type="number" value={filtroIdSolicitacao} onChange={e => setFiltroIdSolicitacao(e.target.value)} />
            <Button type="submit">Buscar</Button>
          </form>
          {receitasExibidas.length > 0 && (
            <div className="mt-4">
              <TabelaFiltros data={receitasExibidas} columns={colunasTabela} />
            </div>
          )}
          {mensagemAcao && filtroIdSolicitacao.trim() !== '' && receitasExibidas.length === 0 && (
            <p className="mt-2 text-red-600">{mensagemAcao}</p>
          )}
        </Modal>

        <Modal isOpen={modalAtualizarCompletoAberto} onClose={() => resetAllStates()} title="Atualizar Receita Completa">
          <form onSubmit={handleAtualizarReceitaCompleta} className="space-y-4">
            <InputTexto placeholder="ID da Solicitação" type="number" value={receitaEditando.idSolicitacao?.toString() || ''} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
            <InputTexto placeholder="Nova Descrição" value={receitaEditando.descricao || ''} onChange={e => setReceitaEditando({ ...receitaEditando, descricao: e.target.value })} />
            <InputTexto placeholder="Nova Data (YYYY-MM-DD)" type="date" value={receitaEditando.data || ''} onChange={e => setReceitaEditando({ ...receitaEditando, data: e.target.value })} />
            <InputTexto placeholder="Nova Validade (YYYY-MM-DD)" type="date" value={receitaEditando.validade || ''} onChange={e => setReceitaEditando({ ...receitaEditando, validade: e.target.value })} />
            <Button type="submit">Salvar Alterações</Button>
          </form>
          {mensagemAcao && <p className="mt-4 text-red-600">{mensagemAcao}</p>}
        </Modal>

        <Modal isOpen={modalAtualizarParcialAberto} onClose={() => resetAllStates()} title="Atualizar Campo Específico da Receita">
          <form onSubmit={handleAtualizarCampoReceita} className="space-y-4">
            <InputTexto placeholder="ID da Solicitação" type="number" value={receitaEditando.idSolicitacao?.toString() || ''} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
            <select
              value={receitaEditando.campoParaAtualizar || ''}
              onChange={(e) => setReceitaEditando({ ...receitaEditando, campoParaAtualizar: e.target.value as keyof Receita })}
              className="border rounded px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Selecione o campo a atualizar</option>
              <option value="descricao">Descrição</option>
              <option value="data">Data</option>
              <option value="validade">Validade</option>
            </select>
            {receitaEditando.campoParaAtualizar && (
              <InputTexto
                placeholder={`Novo valor para ${receitaEditando.campoParaAtualizar}`}
                value={receitaEditando[receitaEditando.campoParaAtualizar] !== undefined ? String(receitaEditando[receitaEditando.campoParaAtualizar]) : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setReceitaEditando({
                    ...receitaEditando,
                    [receitaEditando.campoParaAtualizar!]: value
                  });
                }}
              />
            )}
            <Button type="submit" disabled={!receitaEditando.campoParaAtualizar}>Salvar Alteração</Button>
          </form>
          {mensagemAcao && <p className="mt-4 text-red-600">{mensagemAcao}</p>}
        </Modal>

        <Modal isOpen={modalVerificarValidadeAberto} onClose={() => resetAllStates()} title="Verificar Validade das Receitas">
          <div className="p-4 text-gray-800">
            <p>{mensagemValidade}</p>
          </div>
        </Modal>
      </div>
    </main>
  );
}