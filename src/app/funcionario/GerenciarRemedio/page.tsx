'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import TabelaFiltros from '@/components/tabela/TabelaFiltros';
import Modal from '@/components/Modal_Simples/Modal';
import { InputTexto } from '@/components/ui/InputText';


interface Remedio {
  id: number;
  nome: string;
  categoria: string;
  principioAtivo: string;
  dosagem: string;
  fabricante: string;
}

interface RemedioEditando extends Partial<Remedio> {
  campoParaAtualizar?: keyof Remedio; 
}

export default function GerenciarRemedio() {
  const router = useRouter();
  const [remedios, setRemedios] = useState<Remedio[]>([]);

 
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [modalEditarCompletoAberto, setModalEditarCompletoAberto] = useState(false);
  const [modalEditarItemAberto, setModalEditarItemAberto] = useState(false);
  const [modalRemoverAberto, setModalRemoverAberto] = useState(false); 
  const [modalListarUmAberto, setModalListarUmAberto] = useState(false);
  const [modalListarCategoriaAberto, setModalListarCategoriaAberto] = useState(false);
  const [modalListarPrincipioAberto, setModalListarPrincipioAberto] = useState(false);



  const [remedioEditando, setRemedioEditando] = useState<RemedioEditando>({}); 
  const [novoRemedioData, setNovoRemedioData] = useState<Partial<Remedio>>({});


  const [filtroNome, setFiltroNome] = useState('');
  const [filtroId, setFiltroId] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroPrincipioAtivo, setFiltroPrincipioAtivo] = useState('');


  const [remediosExibidos, setRemediosExibidos] = useState<Remedio[]>([]);
  const [todasCategoriasExibidas, setTodasCategoriasExibidas] = useState<string[]>([]);


  const [mensagemAcao, setMensagemAcao] = useState('');


  useEffect(() => {
    setRemedios([
      { id: 1, nome: 'Paracetamol', categoria: 'Analgésico', principioAtivo: 'Paracetamol', dosagem: '500mg', fabricante: 'MedPharma' },
      { id: 2, nome: 'Amoxicilina', categoria: 'Antibiótico', principioAtivo: 'Amoxicilina', dosagem: '250mg', fabricante: 'BioLabs' },
      { id: 3, nome: 'Ibuprofeno', categoria: 'Anti-inflamatório', principioAtivo: 'Ibuprofeno', dosagem: '400mg', fabricante: 'PharmaGen' },
      { id: 4, nome: 'Omeprazol', categoria: 'Antiácido', principioAtivo: 'Omeprazol', dosagem: '20mg', fabricante: 'GastroMed' },
      { id: 5, nome: 'Dorflex', categoria: 'Analgésico', principioAtivo: 'Dipirona, Orfenadrina, Cafeína', dosagem: '300mg', fabricante: 'FarmacoBrasil' },
    ]);
  }, []);


  const resetAllStates = () => {
    setModalAdicionarAberto(false);
    setModalEditarCompletoAberto(false);
    setModalEditarItemAberto(false);
    setModalRemoverAberto(false);
    setModalListarUmAberto(false);
    setModalListarCategoriaAberto(false);
    setModalListarPrincipioAberto(false);

    setRemedioEditando({});
    setNovoRemedioData({});

    setFiltroNome('');
    setFiltroId('');
    setFiltroCategoria('');
    setFiltroPrincipioAtivo('');

    setRemediosExibidos([]);
    setTodasCategoriasExibidas([]);
    setMensagemAcao('');
  };



  const adicionarRemedio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoRemedioData.nome || !novoRemedioData.categoria || !novoRemedioData.principioAtivo || !novoRemedioData.dosagem || !novoRemedioData.fabricante) {
      alert('Por favor, preencha todos os campos para adicionar um remédio.');
      return;
    }

    const novoId = remedios.length > 0 ? Math.max(...remedios.map(r => r.id)) + 1 : 1;

    const rem: Remedio = {
      id: novoId,
      nome: novoRemedioData.nome,
      categoria: novoRemedioData.categoria,
      principioAtivo: novoRemedioData.principioAtivo,
      dosagem: novoRemedioData.dosagem,
      fabricante: novoRemedioData.fabricante,
    };

    setRemedios(prev => [...prev, rem]);
    setMensagemAcao(`Remédio "${rem.nome}" adicionado com sucesso! (ID: ${rem.id})`);
    resetAllStates();
  };

  const removerRemedio = (id: number) => {
    if (window.confirm(`Tem certeza que deseja remover o remédio ID ${id}?`)) {
      const initialLength = remedios.length;
      setRemedios(prev => prev.filter(r => r.id !== id));
      if (remedios.length === initialLength) {
        setMensagemAcao(`Remédio ID ${id} não encontrado.`);
      } else {
        setMensagemAcao(`Remédio ID ${id} removido com sucesso.`);
      }
      resetAllStates();
    }
  };

  const salvarEdicaoCompleta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remedioEditando.id || !remedioEditando.nome || !remedioEditando.categoria || !remedioEditando.principioAtivo || !remedioEditando.dosagem || !remedioEditando.fabricante) {
      alert('Por favor, preencha todos os campos para atualizar a farmácia.');
      return;
    }

    setRemedios(prev =>
      prev.map(r => r.id === remedioEditando.id ? { ...r, ...remedioEditando } as Remedio : r)
    );
    setMensagemAcao(`Remédio ID ${remedioEditando.id} atualizado por completo com sucesso!`);
    resetAllStates();
  };

  const salvarEdicaoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remedioEditando.id || !remedioEditando.campoParaAtualizar || !remedioEditando[remedioEditando.campoParaAtualizar as keyof Remedio]) {
      alert('Por favor, selecione um campo e insira um novo valor.');
      return;
    }

    setRemedios(prev =>
      prev.map(r =>
        r.id === remedioEditando.id
          ? { ...r, [remedioEditando.campoParaAtualizar as keyof Remedio]: remedioEditando[remedioEditando.campoParaAtualizar as keyof Remedio] } as Remedio
          : r
      )
    );
    setMensagemAcao(`Campo '${remedioEditando.campoParaAtualizar}' do remédio ID ${remedioEditando.id} atualizado com sucesso!`);
    resetAllStates();
  };



  const listarTodosRemedios = () => {
    resetAllStates();
    setRemediosExibidos(remedios);
  };

  const listarRemedioPorId = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(filtroId);
    if (isNaN(id)) {
      alert('Digite um ID válido.');
      setRemediosExibidos([]);
      return;
    }
    const encontrado = remedios.find(r => r.id === id);
    setRemediosExibidos(encontrado ? [encontrado] : []);
    setMensagemAcao(encontrado ? '' : `Remédio com ID ${id} não encontrado.`);
  };

  const listarRemedioPorNome = (e: React.FormEvent) => {
    e.preventDefault();
    const nomeBusca = filtroNome.trim().toLowerCase();
    if (!nomeBusca) {
      alert('Digite o nome do remédio para buscar.');
      setRemediosExibidos([]);
      return;
    }
    const encontrado = remedios.find(r => r.nome.toLowerCase() === nomeBusca);
    setRemediosExibidos(encontrado ? [encontrado] : []);
    setMensagemAcao(encontrado ? '' : `Remédio com nome "${filtroNome}" não encontrado.`);
  };

  const listarPorCategoria = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = filtroCategoria.trim().toLowerCase();
    if (!cat) {
      alert('Digite a categoria para buscar.');
      setRemediosExibidos([]);
      return;
    }
    const filtrados = remedios.filter(r => r.categoria.toLowerCase().includes(cat));
    setRemediosExibidos(filtrados);
    setMensagemAcao(filtrados.length > 0 ? '' : `Nenhum remédio encontrado para a categoria "${filtroCategoria}".`);
  };

  const listarPorPrincipioAtivo = (e: React.FormEvent) => {
    e.preventDefault();
    const principio = filtroPrincipioAtivo.trim().toLowerCase();
    if (!principio) {
      alert('Digite o princípio ativo para buscar.');
      setRemediosExibidos([]);
      return;
    }
    const filtrados = remedios.filter(r => r.principioAtivo.toLowerCase().includes(principio));
    setRemediosExibidos(filtrados);
    setMensagemAcao(filtrados.length > 0 ? '' : `Nenhum remédio encontrado com o princípio ativo "${filtroPrincipioAtivo}".`);
  };

  const listarTodasCategorias = () => {
    resetAllStates();
    setTodasCategoriasExibidas([...new Set(remedios.map(r => r.categoria))]);
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
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Remédios</h1>
          <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
        </div>


        <div className="flex flex-wrap gap-4 mb-6">
          <Button onClick={listarTodosRemedios}>Listar Todos os Remédios</Button>
          <Button onClick={() => { resetAllStates(); setModalListarUmAberto(true); }}>Listar um Remédio (por Nome)</Button>
          <Button onClick={() => { resetAllStates(); setModalAdicionarAberto(true); }}>Adicionar Remédio</Button>
          <Button onClick={() => { resetAllStates(); setModalListarCategoriaAberto(true); }}>Listar Categoria</Button>
          <Button onClick={listarTodasCategorias}>Listar Todas as Categorias</Button>
          <Button onClick={() => { resetAllStates(); setModalListarPrincipioAberto(true); }}>Listar por Princípio Ativo</Button>

        </div>

        {mensagemAcao && (
          <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
            {mensagemAcao}
          </div>
        )}


        <h2 className="text-2xl font-bold text-blue-800 mb-4">Remédios Cadastrados</h2>
        <table className="w-full text-left bg-white border">
          <thead className="bg-gray-100 text-blue-800">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Princípio Ativo</th>
              <th className="p-2">Dosagem</th>
              <th className="p-2">Fabricante</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {remedios.length > 0 ? (
              remedios.map((r) => (
                <tr key={r.id} className="border-t hover:bg-blue-50">
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{r.nome}</td>
                  <td className="p-2">{r.categoria}</td>
                  <td className="p-2">{r.principioAtivo}</td>
                  <td className="p-2">{r.dosagem}</td>
                  <td className="p-2">{r.fabricante}</td>
                  <td className="p-2">
                    <select
                      onChange={(e) => {
                        const opcao = e.target.value;
                        setRemedioEditando(r); 
                        if (opcao === 'editarItem') {
                          setModalEditarItemAberto(true);
                        } else if (opcao === 'editarCompleto') {
                          setModalEditarCompletoAberto(true);
                        } else if (opcao === 'remover') {
                          removerRemedio(r.id);
                        }
                        e.target.value = ""; 
                      }}
                      defaultValue=""
                      className="border rounded px-2 py-1"
                    >
                      <option value="" disabled>
                        Ações
                      </option>
                      <option value="editarItem">Editar campo específico</option>
                      <option value="editarCompleto">Editar por completo</option>
                      <option value="remover">Remover</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Nenhum remédio cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>


        {remediosExibidos.length > 0 && remediosExibidos.length !== remedios.length && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Resultados da Busca</h2>
            <TabelaFiltros data={remediosExibidos} columns={remediosColumns} />
          </div>
        )}


        {todasCategoriasExibidas.length > 0 && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-bold text-blue-800 mb-2">Todas as Categorias Cadastradas:</h2>
            <ul className="list-disc list-inside ml-4">
              {todasCategoriasExibidas.map((cat, index) => (
                <li key={index} className="text-gray-800">{cat}</li>
              ))}
            </ul>
          </div>
        )}

        <Modal isOpen={modalAdicionarAberto} onClose={() => resetAllStates()} title="Adicionar Novo Remédio">
          <form onSubmit={adicionarRemedio} className="space-y-4">
            <InputTexto placeholder="Nome" value={novoRemedioData.nome || ''} onChange={e => setNovoRemedioData({ ...novoRemedioData, nome: e.target.value })} />
            <InputTexto placeholder="Categoria" value={novoRemedioData.categoria || ''} onChange={e => setNovoRemedioData({ ...novoRemedioData, categoria: e.target.value })} />
            <InputTexto placeholder="Princípio Ativo" value={novoRemedioData.principioAtivo || ''} onChange={e => setNovoRemedioData({ ...novoRemedioData, principioAtivo: e.target.value })} />
            <InputTexto placeholder="Dosagem" value={novoRemedioData.dosagem || ''} onChange={e => setNovoRemedioData({ ...novoRemedioData, dosagem: e.target.value })} />
            <InputTexto placeholder="Fabricante" value={novoRemedioData.fabricante || ''} onChange={e => setNovoRemedioData({ ...novoRemedioData, fabricante: e.target.value })} />
            <Button type="submit">Adicionar</Button>
          </form>
        </Modal>


        <Modal isOpen={modalEditarCompletoAberto} onClose={() => resetAllStates()} title="Editar Remédio Completo">
          <form onSubmit={salvarEdicaoCompleta} className="space-y-4">
            <InputTexto placeholder="ID" value={remedioEditando.id || ''} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
            <InputTexto placeholder="Nome" value={remedioEditando.nome || ''} onChange={e => setRemedioEditando({ ...remedioEditando, nome: e.target.value })} />
            <InputTexto placeholder="Categoria" value={remedioEditando.categoria || ''} onChange={e => setRemedioEditando({ ...remedioEditando, categoria: e.target.value })} />
            <InputTexto placeholder="Princípio Ativo" value={remedioEditando.principioAtivo || ''} onChange={e => setRemedioEditando({ ...remedioEditando, principioAtivo: e.target.value })} />
            <InputTexto placeholder="Dosagem" value={remedioEditando.dosagem || ''} onChange={e => setRemedioEditando({ ...remedioEditando, dosagem: e.target.value })} />
            <InputTexto placeholder="Fabricante" value={remedioEditando.fabricante || ''} onChange={e => setRemedioEditando({ ...remedioEditando, fabricante: e.target.value })} />
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </Modal>

        <Modal isOpen={modalEditarItemAberto} onClose={() => resetAllStates()} title="Editar Campo Específico do Remédio">
          <form onSubmit={salvarEdicaoItem} className="space-y-4">
            <InputTexto placeholder="ID" value={remedioEditando.id || ''} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
            <select
              value={remedioEditando.campoParaAtualizar || ''} 
              onChange={(e) => setRemedioEditando({ ...remedioEditando, campoParaAtualizar: e.target.value as keyof Remedio })}
              className="border rounded px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Selecione o campo a atualizar</option>
              <option value="nome">Nome</option>
              <option value="categoria">Categoria</option>
              <option value="principioAtivo">Princípio Ativo</option>
              <option value="dosagem">Dosagem</option>
              <option value="fabricante">Fabricante</option>
            </select>

            {remedioEditando.campoParaAtualizar && (
                <InputTexto
                  placeholder={`Novo valor para ${remedioEditando.campoParaAtualizar}`}
                  value={remedioEditando[remedioEditando.campoParaAtualizar] !== undefined ? String(remedioEditando[remedioEditando.campoParaAtualizar]) : ''}
                  onChange={(e) => {
                      const value = e.target.value;
                      setRemedioEditando({
                          ...remedioEditando,
                          [remedioEditando.campoParaAtualizar!]: value
                      });
                  }}
                />
            )}
            <Button type="submit" disabled={!remedioEditando.campoParaAtualizar}>Salvar Alteração</Button>
          </form>
        </Modal>


        <Modal isOpen={modalListarUmAberto} onClose={() => resetAllStates()} title="Listar Remédio por Nome">
          <form onSubmit={listarRemedioPorNome} className="space-y-4">
            <InputTexto placeholder="Nome do remédio" value={filtroNome} onChange={e => setFiltroNome(e.target.value)} />
            <Button type="submit">Buscar</Button>
          </form>
          {remediosExibidos.length > 0 && (
            <div className="mt-4">
              <TabelaFiltros data={remediosExibidos} columns={remediosColumns} />
            </div>
          )}
          {mensagemAcao && filtroNome.trim() !== '' && remediosExibidos.length === 0 && (
            <p className="mt-2 text-red-600">{mensagemAcao}</p>
          )}
        </Modal>


        <Modal isOpen={modalListarCategoriaAberto} onClose={() => resetAllStates()} title="Listar Remédios por Categoria">
          <form onSubmit={listarPorCategoria} className="space-y-4">
            <InputTexto placeholder="Nome da Categoria" value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)} />
            <Button type="submit">Buscar</Button>
          </form>
          {remediosExibidos.length > 0 && (
            <div className="mt-4">
              <TabelaFiltros data={remediosExibidos} columns={remediosColumns} />
            </div>
          )}
          {mensagemAcao && filtroCategoria.trim() !== '' && remediosExibidos.length === 0 && (
            <p className="mt-2 text-red-600">{mensagemAcao}</p>
          )}
        </Modal>


        <Modal isOpen={modalListarPrincipioAberto} onClose={() => resetAllStates()} title="Listar Remédios por Princípio Ativo">
          <form onSubmit={listarPorPrincipioAtivo} className="space-y-4">
            <InputTexto placeholder="Princípio Ativo" value={filtroPrincipioAtivo} onChange={e => setFiltroPrincipioAtivo(e.target.value)} />
            <Button type="submit">Buscar</Button>
          </form>
          {remediosExibidos.length > 0 && (
            <div className="mt-4">
              <TabelaFiltros data={remediosExibidos} columns={remediosColumns} />
            </div>
          )}
          {mensagemAcao && filtroPrincipioAtivo.trim() !== '' && remediosExibidos.length === 0 && (
            <p className="mt-2 text-red-600">{mensagemAcao}</p>
          )}
        </Modal>

      </div>
    </main>
  );
}