'use client';

import Button from '@/componentes/button/Button';
import TabelaFiltros from '@/componentes/tabela/TabelaFiltros';
import { InputTexto } from '@/componentes/ui/InputText';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Remedio {
  nome: string;
  categoria: string;
  principioAtivo: string;
}

export default function GerenciarRemedio() {
  const [remedios, setRemedios] = useState<Remedio[]>([]);
  const [mostrarNavbar, setMostrarNavbar] = useState(false);
  const [nomeRemedio, setNomeRemedio] = useState('');
  const [remedioSelecionado, setRemedioSelecionado] = useState<Remedio | null>(null);
  const [adicionando, setAdicionando] = useState(false);
  const [novoRemedio, setNovoRemedio] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novoPrincipioAtivo, setNovoPrincipioAtivo] = useState('');
  const [remedioAdicionado, setRemedioAdicionado] = useState<Remedio | null>(null);
  const [listarTodos, setListarTodos] = useState(false);
  const [listarCategoria, setListarCategoria] = useState(false);
  const [categoriaNome, setCategoriaNome] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [remediosPorCategoria, setRemediosPorCategoria] = useState<Remedio[]>([]);
  const [listarTodasCategorias, setListarTodasCategorias] = useState(false);
  const [todasCategorias, setTodasCategorias] = useState<string[]>([]);
  const [listarPorPrincipio, setListarPorPrincipio] = useState(false);
  const [principioAtivo, setPrincipioAtivo] = useState('');
  const [remediosPorPrincipio, setRemediosPorPrincipio] = useState<Remedio[]>([]);


  const resetDisplayStates = () => {
    setMostrarNavbar(false);
    setAdicionando(false);
    setListarTodos(false);
    setListarCategoria(false);
    setListarTodasCategorias(false);
    setListarPorPrincipio(false);
  };

  const abrirListarUm = () => {
    resetDisplayStates();
    setMostrarNavbar(true);
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
    setRemediosPorPrincipio([]);
  };

  const handleAdicionarRemedio = () => {
    if (!novoRemedio || !novaCategoria || !novoPrincipioAtivo) {
      alert('Por favor, preencha todos os campos para adicionar um remédio.');
      return;
    }
    const novo = { nome: novoRemedio, categoria: novaCategoria, principioAtivo: novoPrincipioAtivo };
    setRemedios([...remedios, novo]);
    setRemedioAdicionado(novo);
    setNovoRemedio('');
    setNovaCategoria('');
    setNovoPrincipioAtivo('');
    setAdicionando(false);
  };

  const handleBuscarRemedio = () => {
    const encontrado = remedios.find(r => r.nome.toLowerCase() === nomeRemedio.toLowerCase());
    setRemedioSelecionado(encontrado || null);
  };

  const handleBuscarCategoria = () => {
    if (!categoriaNome) {
      alert('Por favor, digite o nome da categoria.');
      return;
    }
    setCategoriaSelecionada(categoriaNome);
    setRemediosPorCategoria(remedios.filter(r => r.categoria.toLowerCase() === categoriaNome.toLowerCase()));
  };

  const handleBuscarPrincipio = () => {
    if (!principioAtivo) {
      alert('Por favor, digite o princípio ativo.');
      return;
    }
    setRemediosPorPrincipio(remedios.filter(r => r.principioAtivo.toLowerCase() === principioAtivo.toLowerCase()));
  };


  const remediosColumns = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Categoria', accessor: 'categoria' },
    { header: 'Princípio Ativo', accessor: 'principioAtivo' },
  ];


  const remediosPorCategoriaColumns = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Princípio Ativo', accessor: 'principioAtivo' },
  ];


  const remediosPorPrincipioColumns = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Categoria', accessor: 'categoria' },
  ];
  const router = useRouter();
  return (
    <main className="min-h-screen bg-white p-6">
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Remédios</h1>
        </header>

        <section className="mb-4 flex gap-4 items-center flex-wrap">
          <Button className="bg-blue-700 hover:bg-blue-800" onClick={abrirListarTodos}>
            Listar Todos os Remédios
          </Button>
          <Button onClick={abrirListarUm}>
            Listar um Remédio
          </Button>
          <Button onClick={abrirAdicionar}>
            Adicionar Remédio
          </Button>
          <Button onClick={abrirListarCategoria}>
            Listar uma Categoria de Remédios
          </Button>
          <Button onClick={abrirListarTodasCategorias}>
            Listar Todas as Categorias
          </Button>
          <Button onClick={abrirListarPorPrincipio}>
            Listar Remédios por Princípio Ativo
          </Button>
          <Button onClick={() => router.push('/funcionario')}>
           Voltar
          </Button>
        </section>


        {listarTodos && (
          <section className="mb-4">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-bold text-blue-800 mb-2">Todos os remédios cadastrados:</h2>
              <TabelaFiltros data={remedios} columns={remediosColumns} />
            </div>
          </section>
        )}


        {mostrarNavbar && (
          <section className="mb-4">
            <nav className="bg-gray-100 p-4 rounded flex gap-4 items-center">
              <span className="font-medium">Digite o nome do remédio:</span>
              <InputTexto
                value={nomeRemedio}
                onChange={e => setNomeRemedio(e.target.value)}
                placeholder="Nome do remédio"
                className="w-auto"
              />
              <Button onClick={handleBuscarRemedio}>
                Buscar
              </Button>
            </nav>
            {remedioSelecionado ? (
              <div className="mt-4 p-4 bg-white rounded shadow">
                <h2 className="text-lg font-bold text-blue-800">Remédio encontrado:</h2>
                <p className="text-gray-700">
                  Nome: {remedioSelecionado.nome}<br />
                  Categoria: {remedioSelecionado.categoria}<br />
                  Princípio ativo: {remedioSelecionado.principioAtivo}
                </p>
              </div>
            ) : remedioSelecionado === null && nomeRemedio ? (
              <div className="mt-4 p-4 bg-white rounded shadow text-red-600">
                Remédio não encontrado.
              </div>
            ) : null}
          </section>
        )}


        {adicionando && (
          <section className="mb-4">
            <nav className="bg-gray-100 p-4 rounded flex gap-4 items-center flex-wrap">
              <span className="font-medium">Adicionar novo remédio:</span>
              <InputTexto value={novoRemedio} onChange={e => setNovoRemedio(e.target.value)} placeholder="Nome do remédio" />
              <InputTexto value={novaCategoria} onChange={e => setNovaCategoria(e.target.value)} placeholder="Categoria" />
              <InputTexto value={novoPrincipioAtivo} onChange={e => setNovoPrincipioAtivo(e.target.value)} placeholder="Princípio ativo" />
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleAdicionarRemedio}>
                Adicionar
              </Button>
            </nav>
            {remedioAdicionado && (
              <div className="mt-4 p-4 bg-white rounded shadow">
                <h2 className="text-lg font-bold text-green-800">Remédio adicionado:</h2>
                <p className="text-gray-700">
                  Nome: {remedioAdicionado.nome}<br />
                  Categoria: {remedioAdicionado.categoria}<br />
                  Princípio ativo: {remedioAdicionado.principioAtivo}
                </p>
              </div>
            )}
          </section>
        )}


        {listarCategoria && (
          <section className="mb-4">
            <nav className="bg-gray-100 p-4 rounded flex gap-4 items-center">
              <span className="font-medium">Digite o nome da categoria:</span>
              <InputTexto value={categoriaNome} onChange={e => setCategoriaNome(e.target.value)} placeholder="Nome da categoria" />
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleBuscarCategoria}>
                Buscar
              </Button>
            </nav>
            {categoriaSelecionada && (
              <div className="mt-4 p-4 bg-white rounded shadow">
                <h2 className="text-lg font-bold text-purple-800">Remédios da categoria "{categoriaSelecionada}":</h2>
                <TabelaFiltros data={remediosPorCategoria} columns={remediosPorCategoriaColumns} />
              </div>
            )}
          </section>
        )}


        {listarTodasCategorias && (
          <section className="mb-4">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-bold text-purple-800 mb-2">Todas as categorias:</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {todasCategorias.length > 0 ? (
                  todasCategorias.map((cat, idx) => <li key={idx}>{cat}</li>)
                ) : (
                  <li>Nenhuma categoria cadastrada.</li>
                )}
              </ul>
            </div>
          </section>
        )}


        {listarPorPrincipio && (
          <section className="mb-4">
            <nav className="bg-gray-100 p-4 rounded flex gap-4 items-center">
              <span className="font-medium">Digite o princípio ativo:</span>
              <InputTexto value={principioAtivo} onChange={e => setPrincipioAtivo(e.target.value)} placeholder="Princípio ativo" />
              <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleBuscarPrincipio}>
                Buscar
              </Button>
            </nav>
            {principioAtivo && ( 
              <div className="mt-4 p-4 bg-white rounded shadow">
                <h2 className="text-lg font-bold text-pink-800">Remédios com o princípio ativo "{principioAtivo}":</h2>
                <TabelaFiltros data={remediosPorPrincipio} columns={remediosPorPrincipioColumns} />
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}