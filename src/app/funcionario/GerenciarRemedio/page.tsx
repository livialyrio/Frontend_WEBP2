'use client';

import Button from '@/componentes/button/Button';
import TabelaFiltros from '@/componentes/tabela/TabelaFiltros';
import { InputTexto } from '@/componentes/ui/InputText';
import { useState } from 'react';

interface Remedio {
  id: number;
  nome: string;
  categoria: string;
  principioAtivo: string;
  dosagem: string;
  fabricante: string;
}

export default function GerenciarRemedio() {
  const [remedios, setRemedios] = useState<Remedio[]>([]);
  const [mostrarNavbar, setMostrarNavbar] = useState(false);
  const [nomeRemedio, setNomeRemedio] = useState('');
  const [idRemedio, setIdRemedio] = useState('');
  const [remedioSelecionado, setRemedioSelecionado] = useState<Remedio | null>(null);
  const [adicionando, setAdicionando] = useState(false);
  const [novoRemedio, setNovoRemedio] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novoPrincipioAtivo, setNovoPrincipioAtivo] = useState('');
  const [novaDosagem, setNovaDosagem] = useState('');
  const [novoFabricante, setNovoFabricante] = useState('');
  const [remedioAdicionado, setRemedioAdicionado] = useState<Remedio | null>(null);
  const [listarTodos, setListarTodos] = useState(false);
  const [listarCategoria, setListarCategoria] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [remediosPorCategoria, setRemediosPorCategoria] = useState<Remedio[]>([]);
  const [listarTodasCategorias, setListarTodasCategorias] = useState(false);
  const [todasCategorias, setTodasCategorias] = useState<string[]>([]);
  const [listarPorPrincipio, setListarPorPrincipio] = useState(false);
  const [principioAtivo, setPrincipioAtivo] = useState('');
  const [remediosPorPrincipio, setRemediosPorPrincipio] = useState<Remedio[]>([]);
  const [editandoId, setEditandoId] = useState('');
  const [editandoCampo, setEditandoCampo] = useState(''); 
  const [novoValorCampo, setNovoValorCampo] = useState('');
  const [remediosFiltrados, setRemediosFiltrados] = useState<Remedio[]>([]);
  const [modo, setModo] = useState<'listarId' | 'atualizarCompleto' | 'atualizarPrincipio' | 'atualizarCategoria' | 'atualizarParcial' | 'remover' | null>(null);
  const [mensagemAtualizacao, setMensagemAtualizacao] = useState('');

  const resetDisplayStates = () => {
    setMostrarNavbar(false);
    setAdicionando(false);
    setListarTodos(false);
    setListarCategoria(false);
    setListarTodasCategorias(false);
    setListarPorPrincipio(false);
    setRemediosFiltrados([]);
    setRemedioSelecionado(null);
    setModo(null);
    setMensagemAtualizacao('');
    setEditandoId('');
    setEditandoCampo('');
    setNovoValorCampo('');
    setNovoRemedio('');
    setNovaCategoria('');
    setNovoPrincipioAtivo('');
    setNovaDosagem('');
    setNovoFabricante('');
  };

  const abrirListarUm = () => {
    resetDisplayStates();
    setMostrarNavbar(true);
    setNomeRemedio('');
    setRemedioSelecionado(null);
  };

  const abrirAdicionar = () => {
    resetDisplayStates();
    setAdicionando(true);
    setRemedioAdicionado(null);
  };

  const abrirListarTodos = () => {
    resetDisplayStates();
    setListarTodos(true);
  };

  const abrirListarCategoria = () => {
    resetDisplayStates();
    setListarCategoria(true);
    setCategoriaSelecionada('');
    setRemediosPorCategoria([]);
  };

  const abrirListarTodasCategorias = () => {
    resetDisplayStates();
    setListarTodasCategorias(true);
    setTodasCategorias([...new Set(remedios.map(r => r.categoria))]);
  };

  const abrirListarPorPrincipio = () => {
    resetDisplayStates();
    setListarPorPrincipio(true);
    setPrincipioAtivo('');
    setRemediosPorPrincipio([]);
  };

  const listarRemedioPorNome = () => {
    const nomeBusca = nomeRemedio.trim().toLowerCase();
    if (!nomeBusca) {
      alert('Digite o nome do remédio para buscar.');
      return;
    }
    const encontrado = remedios.find(r => r.nome.toLowerCase() === nomeBusca);
    setRemedioSelecionado(encontrado || null);
  };

  const listarRemedioPorId = () => {
    const id = parseInt(idRemedio);
    if (isNaN(id)) {
      alert('Digite um ID válido.');
      return;
    }
    const resultado = remedios.find(r => r.id === id);
    setRemediosFiltrados(resultado ? [resultado] : []);
  };

  const listarPorCategoria = () => {
    const cat = categoriaSelecionada.trim().toLowerCase();
    const filtrados = remedios.filter(r => r.categoria.toLowerCase() === cat);
    setRemediosPorCategoria(filtrados);
  };

  const adicionarRemedio = () => {
    if (!novoRemedio || !novaCategoria || !novoPrincipioAtivo || !novaDosagem || !novoFabricante) {
      alert('Preencha todos os campos para adicionar um remédio.');
      return;
    }

    const novoId = remedios.length > 0 ? Math.max(...remedios.map(r => r.id)) + 1 : 1;

    const rem: Remedio = {
      id: novoId,
      nome: novoRemedio,
      categoria: novaCategoria,
      principioAtivo: novoPrincipioAtivo,
      dosagem: novaDosagem,
      fabricante: novoFabricante,
    };

    setRemedios([...remedios, rem]);
    setRemedioAdicionado(rem);
    setNovoRemedio('');
    setNovaCategoria('');
    setNovoPrincipioAtivo('');
    setNovaDosagem('');
    setNovoFabricante('');
  };

  const atualizarRemedioCompleto = () => {
    const id = parseInt(editandoId);
    if (isNaN(id)) {
        alert('Por favor, insira um ID válido.');
        return;
    }
    if (!novoRemedio || !novaCategoria || !novoPrincipioAtivo || !novaDosagem || !novoFabricante) {
        alert('Por favor, preencha todos os campos para a atualização completa.');
        return;
    }

    const index = remedios.findIndex(r => r.id === id);
    if (index === -1) {
      alert('Remédio não encontrado.');
      return;
    }

    const atualizado: Remedio = {
      id,
      nome: novoRemedio,
      categoria: novaCategoria,
      principioAtivo: novoPrincipioAtivo,
      dosagem: novaDosagem,
      fabricante: novoFabricante,
    };

    const novosRemedios = [...remedios];
    novosRemedios[index] = atualizado;
    setRemedios(novosRemedios);
    setMensagemAtualizacao(`Remédio ID ${id} atualizado com sucesso.`);
  };

  const atualizarCampoRemedio = (campo: keyof Remedio) => {
    const id = parseInt(editandoId);
    if (isNaN(id)) {
        alert('Por favor, insira um ID válido.');
        return;
    }
    if (!novoValorCampo) {
        alert('Por favor, insira um novo valor para o campo.');
        return;
    }

    const index = remedios.findIndex(r => r.id === id);
    if (index === -1) {
      alert('Remédio não encontrado.');
      return;
    }

    const atualizados = [...remedios];

    (atualizados[index] as any)[campo] = novoValorCampo;
    setRemedios(atualizados);
    setMensagemAtualizacao(`Campo "${campo}" do remédio ID ${id} atualizado com sucesso.`);
  };

  const removerRemedioPorId = () => {
    const id = parseInt(editandoId);
    if (isNaN(id)) {
        alert('Por favor, insira um ID válido para remover.');
        return;
    }
    const initialLength = remedios.length;
    setRemedios(remedios.filter(r => r.id !== id));
    if (remedios.length === initialLength) {
        setMensagemAtualizacao(`Remédio ID ${id} não encontrado.`);
    } else {
        setMensagemAtualizacao(`Remédio ID ${id} removido com sucesso.`);
    }
  };

  const remediosColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'nome' },
    { header: 'Categoria', accessor: 'categoria' },
    { header: 'Princípio Ativo', accessor: 'principioAtivo' },
    { header: 'Dosagem', accessor: 'dosagem' },
    { header: 'Fabricante', accessor: 'fabricante' },
  ];

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Remédios</h1>
        </header>

        <section className="mb-4 flex gap-4 items-center flex-wrap">
          <Button className="bg-blue-700 hover:bg-blue-800" onClick={abrirListarTodos}>Listar Todos os Remédios</Button>
          <Button onClick={abrirListarUm}>Listar um Remédio</Button>
          <Button onClick={abrirAdicionar}>Adicionar Remédio</Button>
          <Button onClick={abrirListarCategoria}>Listar uma Categoria de Remédios</Button>
          <Button onClick={abrirListarTodasCategorias}>Listar Todas as Categorias</Button>
          <Button onClick={() => { resetDisplayStates(); setModo('listarId'); }}>Listar por ID</Button>
          <Button onClick={abrirListarPorPrincipio}>Listar Remédios por Princípio Ativo</Button>
          <Button onClick={() => { resetDisplayStates(); setModo('atualizarCompleto'); }}>Atualizar completo</Button>
          <Button onClick={() => { resetDisplayStates(); setModo('atualizarPrincipio'); }}>Atualizar princípio ativo</Button>
          <Button onClick={() => { resetDisplayStates(); setModo('atualizarCategoria'); }}>Atualizar categoria</Button>
          <Button onClick={() => { resetDisplayStates(); setModo('atualizarParcial'); }}>Atualizar remédio parcial por ID</Button>
          <Button onClick={() => { resetDisplayStates(); setModo('remover'); }}>Remover por ID</Button>
        </section>

        {mensagemAtualizacao && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 max-w-xl mx-auto">
            {mensagemAtualizacao}
          </div>
        )}


        {mostrarNavbar && (
          <section className="mb-4">
            <InputTexto value={nomeRemedio} onChange={e => setNomeRemedio(e.target.value)} placeholder="Nome do remédio" />
            <Button className="mt-2" onClick={listarRemedioPorNome}>Buscar</Button>
            {remedioSelecionado ? (
              <TabelaFiltros data={[remedioSelecionado]} columns={remediosColumns} />
            ) : nomeRemedio.trim() !== '' ? (
              <p className="mt-2 text-red-600">Remédio não encontrado.</p>
            ) : null}
          </section>
        )}
        {modo === 'listarId' && (
          <section className="mb-4">
            <InputTexto value={idRemedio} onChange={e => setIdRemedio(e.target.value)} placeholder="ID do remédio" />
            <Button className="mt-2" onClick={listarRemedioPorId}>Buscar</Button>
            {remediosFiltrados.length > 0 && (
              <TabelaFiltros data={remediosFiltrados} columns={remediosColumns} />
            )}
            {idRemedio.trim() !== '' && remediosFiltrados.length === 0 && (
                <p className="mt-2 text-red-600">Remédio com ID {idRemedio} não encontrado.</p>
            )}
          </section>
        )}


        {listarPorPrincipio && (
          <section className="mb-4">
            <InputTexto value={principioAtivo} onChange={e => setPrincipioAtivo(e.target.value)} placeholder="Princípio Ativo" />
            <Button className="mt-2" onClick={() => {
              const filtrados = remedios.filter(r =>
                r.principioAtivo.toLowerCase().includes(principioAtivo.toLowerCase())
              );
              setRemediosPorPrincipio(filtrados);
            }}>Buscar</Button>
            {principioAtivo.trim() !== '' && remediosPorPrincipio.length === 0 && (
                <p className="mt-2 text-red-600">Nenhum remédio encontrado com o princípio ativo "{principioAtivo}".</p>
            )}
            {remediosPorPrincipio.length > 0 && (
              <TabelaFiltros data={remediosPorPrincipio} columns={remediosColumns} />
            )}
          </section>
        )}


        {listarCategoria && (
          <section className="mb-4">
            <InputTexto value={categoriaSelecionada} onChange={e => setCategoriaSelecionada(e.target.value)} placeholder="Nome da Categoria" />
            <Button className="mt-2" onClick={listarPorCategoria}>Buscar</Button>
            {categoriaSelecionada.trim() !== '' && remediosPorCategoria.length === 0 && (
                <p className="mt-2 text-red-600">Nenhum remédio encontrado para a categoria "{categoriaSelecionada}".</p>
            )}
            {remediosPorCategoria.length > 0 && (
              <TabelaFiltros data={remediosPorCategoria} columns={remediosColumns} />
            )}
          </section>
        )}


        {listarTodasCategorias && (
          <section className="mb-4">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-bold text-blue-800 mb-2">Todas as Categorias:</h2>
              <ul className="list-disc list-inside">
                {todasCategorias.map(cat => (
                  <li key={cat}>{cat}</li>
                ))}
                {todasCategorias.length === 0 && (
                  <li>Nenhuma categoria cadastrada.</li>
                )}
              </ul>
            </div>
          </section>
        )}


        {adicionando && (
          <section className="mb-4 grid grid-cols-2 gap-4 max-w-lg">
            <InputTexto value={novoRemedio} onChange={e => setNovoRemedio(e.target.value)} placeholder="Nome" />
            <InputTexto value={novaCategoria} onChange={e => setNovaCategoria(e.target.value)} placeholder="Categoria" />
            <InputTexto value={novoPrincipioAtivo} onChange={e => setNovoPrincipioAtivo(e.target.value)} placeholder="Princípio Ativo" />
            <InputTexto value={novaDosagem} onChange={e => setNovaDosagem(e.target.value)} placeholder="Dosagem" />
            <InputTexto value={novoFabricante} onChange={e => setNovoFabricante(e.target.value)} placeholder="Fabricante" />
            <Button className="col-span-2" onClick={adicionarRemedio}>Adicionar</Button>
            {remedioAdicionado && (
              <p className="col-span-2 text-green-600 mt-2">
                Remédio "{remedioAdicionado.nome}" adicionado com sucesso! (ID: {remedioAdicionado.id})
              </p>
            )}
          </section>
        )}


        {modo === 'atualizarCompleto' && (
          <section className="mb-4 grid grid-cols-2 gap-4">
            <InputTexto value={editandoId} onChange={e => setEditandoId(e.target.value)} placeholder="ID do remédio a atualizar" />
            <InputTexto value={novoRemedio} onChange={e => setNovoRemedio(e.target.value)} placeholder="Novo Nome" />
            <InputTexto value={novaCategoria} onChange={e => setNovaCategoria(e.target.value)} placeholder="Nova Categoria" />
            <InputTexto value={novoPrincipioAtivo} onChange={e => setNovoPrincipioAtivo(e.target.value)} placeholder="Novo Princípio Ativo" />
            <InputTexto value={novaDosagem} onChange={e => setNovaDosagem(e.target.value)} placeholder="Nova Dosagem" />
            <InputTexto value={novoFabricante} onChange={e => setNovoFabricante(e.target.value)} placeholder="Novo Fabricante" />
            <Button className="col-span-2" onClick={atualizarRemedioCompleto}>Atualizar Remédio Completo</Button>
          </section>
        )}


        {modo === 'atualizarPrincipio' && (
          <section className="mb-4 grid grid-cols-2 gap-4">
            <InputTexto value={editandoId} onChange={e => setEditandoId(e.target.value)} placeholder="ID do remédio" />
            <InputTexto value={novoValorCampo} onChange={e => setNovoValorCampo(e.target.value)} placeholder="Novo Princípio Ativo" />
            <Button className="col-span-2" onClick={() => atualizarCampoRemedio('principioAtivo')}>Atualizar</Button>
          </section>
        )}


        {modo === 'atualizarCategoria' && (
          <section className="mb-4 grid grid-cols-2 gap-4">
            <InputTexto value={editandoId} onChange={e => setEditandoId(e.target.value)} placeholder="ID do remédio" />
            <InputTexto value={novoValorCampo} onChange={e => setNovoValorCampo(e.target.value)} placeholder="Nova Categoria" />
            <Button className="col-span-2" onClick={() => atualizarCampoRemedio('categoria')}>Atualizar</Button>
          </section>
        )}


        {modo === 'atualizarParcial' && (
          <section className="mb-4 grid grid-cols-2 gap-4">
            <InputTexto value={editandoId} onChange={e => setEditandoId(e.target.value)} placeholder="ID do remédio" />

            <InputTexto value={novoValorCampo} onChange={e => setNovoValorCampo(e.target.value)} placeholder="Novo valor" />

            <Button className="col-span-2" onClick={() => {
                if (!editandoCampo || !Object.keys(remedios[0] || {}).includes(editandoCampo)) {
                    alert('Por favor, defina qual campo será atualizado (ex: nome, dosagem, fabricante).');
                    return;
                }
                atualizarCampoRemedio(editandoCampo as keyof Remedio);
            }}>Atualizar</Button>
          </section>
        )}

        {modo === 'remover' && (
          <section className="mb-4 grid grid-cols-2 gap-4">
            <InputTexto value={editandoId} onChange={e => setEditandoId(e.target.value)} placeholder="ID do remédio" />
            <Button className="col-span-2" onClick={removerRemedioPorId}>Remover</Button>
          </section>
        )}


        {listarTodos && (
          <section className="mb-4">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-bold text-blue-800 mb-2">Todos os remédios cadastrados:</h2>
              {remedios.length > 0 ? (
                <TabelaFiltros data={remedios} columns={remediosColumns} />
              ) : (
                <p className="text-gray-700">Nenhum remédio cadastrado.</p>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}