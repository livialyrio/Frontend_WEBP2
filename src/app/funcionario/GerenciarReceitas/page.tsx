'use client';

import { useState } from 'react';
import Button from '@/components/button/Button';
import { InputTexto } from '@/components/ui/InputText';
import TabelaFiltros from '@/components/tabela/TabelaFiltros';
import { useRouter } from 'next/navigation';

interface Receita {
  idSolicitacao: number;
  descricao: string;
  data: string;
  validade: string;
}

export default function GerenciarReceita() { 
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const router = useRouter();
  const [criando, setCriando] = useState(false);
  const [removendo, setRemovendo] = useState(false);
  const [verificandoValidade, setVerificandoValidade] = useState(false);
  const [listando, setListando] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  const [novaReceita, setNovaReceita] = useState({ idSolicitacao: '', descricao: '', data: '', validade: '' });
  const [receitaCriada, setReceitaCriada] = useState<Receita | null>(null);

  const [buscaId, setBuscaId] = useState('');
  const [receitaEncontrada, setReceitaEncontrada] = useState<Receita | null>(null);

  const [removerId, setRemoverId] = useState('');
  const [mensagemValidade, setMensagemValidade] = useState('');

  const [idAtualizar, setIdAtualizar] = useState('');
  const [novaDescricaoAtualizar, setNovaDescricaoAtualizar] = useState('');
  const [novaDataAtualizar, setNovaDataAtualizar] = useState('');
  const [novaValidadeAtualizar, setNovaValidadeAtualizar] = useState('');

  const resetarTelas = () => {
    setCriando(false);
    setRemovendo(false);
    setVerificandoValidade(false);
    setListando(false);
    setBuscando(false);
    setAtualizando(false);
    setReceitaCriada(null);
    setReceitaEncontrada(null);
    setMensagemValidade('');
  };

  const abrirCriarReceita = () => {
    resetarTelas();
    setCriando(true);
  };

  const abrirRemoverReceita = () => {
    resetarTelas();
    setRemovendo(true);
  };

  const abrirVerificarValidade = () => {
    resetarTelas();
    setVerificandoValidade(true);
    verificarValidade();
  };

  const abrirListarReceitas = () => {
    resetarTelas();
    setListando(true);
  };

  const abrirBuscarReceita = () => {
    resetarTelas();
    setBuscando(true);
  };

  const abrirAtualizarReceita = () => {
    resetarTelas();
    setAtualizando(true);
  };

  const handleAdicionarReceita = () => {
    const { idSolicitacao, descricao, data, validade } = novaReceita;

    if (!idSolicitacao || !descricao || !data || !validade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const nova: Receita = {
      idSolicitacao: Number(idSolicitacao),
      descricao,
      data,
      validade,
    };

    setReceitas([...receitas, nova]);
    setReceitaCriada(nova);
    setNovaReceita({ idSolicitacao: '', descricao: '', data: '', validade: '' });
    setCriando(false);
  };

  const handleBuscarReceita = () => {
    const encontrada = receitas.find(r => r.idSolicitacao === Number(buscaId));
    setReceitaEncontrada(encontrada || null);
  };

  const handleRemoverReceita = () => {
    const novas = receitas.filter(r => r.idSolicitacao !== Number(removerId));
    if (novas.length === receitas.length) {
      alert('Receita não encontrada.');
    } else {
      setReceitas(novas);
      alert('Receita removida com sucesso!');
    }
    setRemoverId('');
    setRemovendo(false);
  };

  const handleAtualizarReceita = () => {
    const index = receitas.findIndex(r => r.idSolicitacao === Number(idAtualizar));
    if (index === -1) {
      alert('Receita com esse ID não encontrada.');
      return;
    }

    const atualizadas = [...receitas];
    atualizadas[index] = {
      ...atualizadas[index],
      descricao: novaDescricaoAtualizar,
      data: novaDataAtualizar,
      validade: novaValidadeAtualizar,
    };

    setReceitas(atualizadas);
    alert('Receita atualizada!');
    setIdAtualizar('');
    setNovaDescricaoAtualizar('');
    setNovaDataAtualizar('');
    setNovaValidadeAtualizar('');
    setAtualizando(false);
  };

  const verificarValidade = () => {
    if (receitas.length === 0) {
      setMensagemValidade('Nenhuma receita cadastrada.');
      return;
    }

    const hoje = new Date();
    const vencidas = receitas.filter(r => new Date(r.validade) < hoje);
    const validas = receitas.filter(r => new Date(r.validade) >= hoje);

    setMensagemValidade(`Receitas válidas: ${validas.length} | Receitas vencidas: ${vencidas.length}`);
  };


  const colunasTabela = [
    { header: 'ID da Solicitação', accessor: 'idSolicitacao' },
    { header: 'Descrição', accessor: 'descricao' },
    { header: 'Data', accessor: 'data' },
    { header: 'Validade', accessor: 'validade' },
  ];

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
    
  </div>
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Gerenciar Receitas</h1>

        <section className="mb-6 flex gap-4 flex-wrap">
          <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
          <Button onClick={abrirCriarReceita}>Criar Receita</Button>
          <Button onClick={abrirBuscarReceita}>Buscar Receita</Button>
          <Button onClick={abrirListarReceitas}>Listar Todas as Receitas</Button>
          <Button onClick={abrirAtualizarReceita}>Atualizar Receita</Button>
          <Button onClick={abrirRemoverReceita}>Remover Receita</Button>
          <Button onClick={abrirVerificarValidade}>Verificar Validade</Button>
        </section>

        {criando && (
          <section className="bg-blue-100 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-3">Nova Receita</h2>
            <div className="flex flex-col gap-4">
              <InputTexto placeholder="ID da Solicitação" type="number" value={novaReceita.idSolicitacao} onChange={e => setNovaReceita({ ...novaReceita, idSolicitacao: e.target.value })} />
              <InputTexto placeholder="Descrição" value={novaReceita.descricao} onChange={e => setNovaReceita({ ...novaReceita, descricao: e.target.value })} />
              <InputTexto placeholder="Data" type="date" value={novaReceita.data} onChange={e => setNovaReceita({ ...novaReceita, data: e.target.value })} />
              <InputTexto placeholder="Validade" type="date" value={novaReceita.validade} onChange={e => setNovaReceita({ ...novaReceita, validade: e.target.value })} />
              <Button onClick={handleAdicionarReceita}>Adicionar Receita</Button>
            </div>
          </section>
        )}

        {buscando && (
          <section className="bg-blue-100 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-3">Buscar Receita por ID</h2>
            <div className="flex gap-4 items-center">
              <InputTexto placeholder="ID" type="number" value={buscaId} onChange={e => setBuscaId(e.target.value)} />
              <Button onClick={handleBuscarReceita}>Buscar</Button>
            </div>
            {receitaEncontrada && (
              <div className="mt-4 text-gray-800">
                <p>ID: {receitaEncontrada.idSolicitacao}</p>
                <p>Descrição: {receitaEncontrada.descricao}</p>
                <p>Data: {receitaEncontrada.data}</p>
                <p>Validade: {receitaEncontrada.validade}</p>
              </div>
            )}
            {receitaEncontrada === null && buscaId && (
              <p className="mt-4 text-red-600">Receita não encontrada.</p>
            )}
          </section>
        )}

        {listando && (
          <section className="bg-blue-50 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-3">Todas as Receitas</h2>
            <TabelaFiltros data={receitas} columns={colunasTabela} />
          </section>
        )}

        {atualizando && (
          <section className="bg-blue-100 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-3">Atualizar Receita</h2>
            <div className="flex flex-col gap-4">
              <InputTexto placeholder="ID" type="number" value={idAtualizar} onChange={e => setIdAtualizar(e.target.value)} />
              <InputTexto placeholder="Nova descrição" value={novaDescricaoAtualizar} onChange={e => setNovaDescricaoAtualizar(e.target.value)} />
              <InputTexto placeholder="Nova data" type="date" value={novaDataAtualizar} onChange={e => setNovaDataAtualizar(e.target.value)} />
              <InputTexto placeholder="Nova validade" type="date" value={novaValidadeAtualizar} onChange={e => setNovaValidadeAtualizar(e.target.value)} />
              <Button onClick={handleAtualizarReceita}>Atualizar</Button>
            </div>
          </section>
        )}

        {removendo && (
          <section className="bg-blue-100 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-3">Remover Receita</h2>
            <div className="flex gap-4">
              <InputTexto placeholder="ID da Solicitação" type="number" value={removerId} onChange={e => setRemoverId(e.target.value)} />
              <Button onClick={handleRemoverReceita}>Remover</Button>
            </div>
          </section>
        )}

        {verificandoValidade && (
          <section className="bg-gray-100 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold">Validade das Receitas</h2>
            <p>{mensagemValidade}</p>
          </section>
        )}
        <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
      </div>
    </main>
  );
}
