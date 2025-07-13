'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';
import type { Remedio } from '@/services/remedioService';

const PRINCIPIOS_ATIVOS = ['Paracetamol', 'Amoxicilina', 'Ibuprofeno'];
const CATEGORIAS = ['Analgésico', 'Antibiótico', 'Anti-inflamatório'];

interface RemedioEditando extends Partial<Remedio> {
  campoParaAtualizar?: keyof Remedio;
}

export default function GerenciarRemedioPage() {
  const [remedios, setRemedios] = useState<Remedio[]>([
    { remedioId: 1, nome: 'Paracetamol', categoria: 'Analgésico', principio_ativo: 'Paracetamol', dosagem: '500mg', fabricante: 'MedPharma' },
    { remedioId: 2, nome: 'Amoxicilina', categoria: 'Antibiótico', principio_ativo: 'Amoxicilina', dosagem: '250mg', fabricante: 'BioLabs' },
    { remedioId: 3, nome: 'Ibuprofeno', categoria: 'Anti-inflamatório', principio_ativo: 'Ibuprofeno', dosagem: '400mg', fabricante: 'PharmaGen' }
  ]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [modalItemAberto, setModalItemAberto] = useState(false);
  const [remedioEditando, setRemedioEditando] = useState<RemedioEditando>({});
  const [novoRemedio, setNovoRemedio] = useState<Partial<Remedio>>({});
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [tipoExibicao, setTipoExibicao] = useState<'remedios' | 'categorias' | 'principios'>('remedios');
  const [dadosGenericos, setDadosGenericos] = useState<any[]>([]);
  const [principiosAtivos, setPrincipiosAtivos] = useState<string[]>(PRINCIPIOS_ATIVOS);
  const [categorias, setCategorias] = useState<string[]>(CATEGORIAS);
  const router = useRouter();

  useEffect(() => {
    buscarTodosRemedios();
  }, []);

  function buscarPorNome() {
    const resultado = remedios.filter(r =>
      r.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );
    setTipoExibicao('remedios');
    setDadosGenericos(resultado);
  }

  function buscarPorCategoria() {
    const resultado = remedios.filter(r =>
      (r.categoria ?? '').toLowerCase().includes(filtroCategoria.toLowerCase())
    );
    setTipoExibicao('remedios');
    setDadosGenericos(resultado);
  }

  function buscarTodosRemedios() {
    setTipoExibicao('remedios');
    setDadosGenericos([...remedios]);
  }

  function buscarTodosPrincipiosAtivos() {
    const lista = principiosAtivos.map((p, idx) => ({ id: idx + 1, valor: p }));
    setTipoExibicao('principios');
    setDadosGenericos(lista);
  }

  function buscarTodasCategorias() {
    const lista = categorias.map((c, idx) => ({ id: idx + 1, valor: c }));
    setTipoExibicao('categorias');
    setDadosGenericos(lista);
  }

  function criarRemedio(e: React.FormEvent) {
    e.preventDefault();
    if (!novoRemedio.nome || !novoRemedio.categoria || !novoRemedio.principio_ativo || !novoRemedio.dosagem || !novoRemedio.fabricante) {
      alert('Preencha todos os campos!');
      return;
    }
    const novoId = remedios.length > 0 ? Math.max(...remedios.map(r => r.remedioId ?? 0)) + 1 : 1;
    const novo: Remedio = {
      remedioId: novoId,
      nome: novoRemedio.nome,
      categoria: novoRemedio.categoria,
      principio_ativo: novoRemedio.principio_ativo,
      dosagem: novoRemedio.dosagem,
      fabricante: novoRemedio.fabricante
    };

    const novaLista = [...remedios, novo];
    setRemedios(novaLista);
    setDadosGenericos(novaLista);

    if (novo.principio_ativo && !principiosAtivos.includes(novo.principio_ativo)) {
      setPrincipiosAtivos([...principiosAtivos, novo.principio_ativo]);
    }
  
    if (novo.categoria && !categorias.includes(novo.categoria)) {
      setCategorias([...categorias, novo.categoria]);
    }
    setNovoRemedio({});
    setModalAberto(false);
  }

  function removerRemedio(remedioId?: number) {
    const novaLista = remedios.filter(r => r.remedioId !== remedioId);
    setRemedios(novaLista);
    setDadosGenericos(novaLista);
  }

  function salvarEdicaoCompleta(e: React.FormEvent) {
    e.preventDefault();
    if (!remedioEditando.remedioId || !remedioEditando.nome || !remedioEditando.categoria || !remedioEditando.principio_ativo || !remedioEditando.dosagem || !remedioEditando.fabricante) {
      alert('Preencha todos os campos!');
      return;
    }
    setRemedios(prev =>
      prev.map(r => r.remedioId === remedioEditando.remedioId ? { ...r, ...remedioEditando } as Remedio : r)
    );
    setDadosGenericos(remedios.map(r => r.remedioId === remedioEditando.remedioId ? { ...r, ...remedioEditando } as Remedio : r));
    setModalEdicaoAberto(false);
  }

  function salvarEdicaoItem(e: React.FormEvent) {
    e.preventDefault();
    if (!remedioEditando.remedioId || !remedioEditando.campoParaAtualizar) {
      alert('Selecione o campo e insira o novo valor!');
      return;
    }
    const valorNovo = remedioEditando[remedioEditando.campoParaAtualizar];
    if (!valorNovo) {
      alert('Insira o novo valor!');
      return;
    }
    setRemedios(prev =>
      prev.map(r =>
        r.remedioId === remedioEditando.remedioId
          ? { ...r, [remedioEditando.campoParaAtualizar!]: valorNovo }
          : r
      )
    );
    setDadosGenericos(remedios.map(r =>
      r.remedioId === remedioEditando.remedioId
        ? { ...r, [remedioEditando.campoParaAtualizar!]: valorNovo }
        : r
    ));
    setModalItemAberto(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Remédios</h1>
          <Button onClick={() => setModalAberto(true)}>Criar Remédio</Button>
          <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <InputTexto placeholder="Buscar por nome" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />
          <Button onClick={buscarPorNome}>Buscar por Nome</Button>
          <InputTexto placeholder="Buscar por categoria" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} />
          <Button onClick={buscarPorCategoria}>Buscar por Categoria</Button>
          <Button onClick={buscarTodosRemedios}>Listar Todos os Remédios</Button>
          <Button onClick={buscarTodosPrincipiosAtivos}>Listar Todos os Princípios Ativos</Button>
          <Button onClick={buscarTodasCategorias}>Listar Todas as Categorias</Button>
        </div>

        <table className="w-full text-left bg-white border">
          <thead className="bg-gray-100 text-blue-800">
            <tr>
              {tipoExibicao === 'remedios' && (
                <>
                  <th className="p-2">ID</th>
                  <th className="p-2">Nome</th>
                  <th className="p-2">Categoria</th>
                  <th className="p-2">Princípio Ativo</th>
                  <th className="p-2">Dosagem</th>
                  <th className="p-2">Fabricante</th>
                  <th className="p-2">Ações</th>
                </>
              )}
              {(tipoExibicao === 'categorias' || tipoExibicao === 'principios') && (
                <>
                  <th className="p-2">ID</th>
                  <th className="p-2">{tipoExibicao === 'categorias' ? 'Categoria' : 'Princípio Ativo'}</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {tipoExibicao === 'remedios' && dadosGenericos.map((r: Remedio) => (
              <tr key={r.remedioId} className="border-t hover:bg-blue-50">
                <td className="p-2">{r.remedioId}</td>
                <td className="p-2">{r.nome}</td>
                <td className="p-2">{r.categoria}</td>
                <td className="p-2">{r.principio_ativo}</td>
                <td className="p-2">{r.dosagem}</td>
                <td className="p-2">{r.fabricante}</td>
                <td className="p-2">
                  <select onChange={(e) => {
                    const opcao = e.target.value;
                    setRemedioEditando(r);
                    if (opcao === 'editarItem') setModalItemAberto(true);
                    else if (opcao === 'editarCompleto') setModalEdicaoAberto(true);
                    else if (opcao === 'remover') removerRemedio(r.remedioId);
                  }} defaultValue="" className="border rounded px-2 py-1">
                    <option value="" disabled>Ações</option>
                    <option value="editarItem">Editar campo específico</option>
                    <option value="editarCompleto">Editar por completo</option>
                    <option value="remover">Remover</option>
                  </select>
                </td>
              </tr>
            ))}
            {(tipoExibicao === 'categorias' || tipoExibicao === 'principios') && dadosGenericos.map((item) => (
              <tr key={item.id} className="border-t hover:bg-blue-50">
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Os modais devem ser incluídos aqui como no exemplo anterior */}
        {/* Modal Criar Remédio */}
        <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Criar Remédio">
          <form onSubmit={criarRemedio} className="space-y-4">
            <InputTexto placeholder="Nome" value={novoRemedio.nome || ''} onChange={e => setNovoRemedio({ ...novoRemedio, nome: e.target.value })} />
            <InputTexto placeholder="Categoria" value={novoRemedio.categoria || ''} onChange={e => setNovoRemedio({ ...novoRemedio, categoria: e.target.value })} />
            <InputTexto placeholder="Princípio Ativo" value={novoRemedio.principio_ativo || ''} onChange={e => setNovoRemedio({ ...novoRemedio, principio_ativo: e.target.value })} />
            <InputTexto placeholder="Dosagem" value={novoRemedio.dosagem || ''} onChange={e => setNovoRemedio({ ...novoRemedio, dosagem: e.target.value })} />
            <InputTexto placeholder="Fabricante" value={novoRemedio.fabricante || ''} onChange={e => setNovoRemedio({ ...novoRemedio, fabricante: e.target.value })} />
            <Button type="submit">Criar</Button>
          </form>
        </Modal>

        {/* Modal Editar Remédio Completo */}
        <Modal isOpen={modalEdicaoAberto} onClose={() => setModalEdicaoAberto(false)} title="Editar Remédio por Completo">
          <form onSubmit={salvarEdicaoCompleta} className="space-y-4">
            <InputTexto placeholder="ID" value={remedioEditando.remedioId || ''} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
            <InputTexto placeholder="Nome" value={remedioEditando.nome || ''} onChange={e => setRemedioEditando({ ...remedioEditando, nome: e.target.value })} />
            <InputTexto placeholder="Categoria" value={remedioEditando.categoria || ''} onChange={e => setRemedioEditando({ ...remedioEditando, categoria: e.target.value })} />
            <InputTexto placeholder="Princípio Ativo" value={remedioEditando.principio_ativo || ''} onChange={e => setRemedioEditando({ ...remedioEditando, principio_ativo: e.target.value })} />
            <InputTexto placeholder="Dosagem" value={remedioEditando.dosagem || ''} onChange={e => setRemedioEditando({ ...remedioEditando, dosagem: e.target.value })} />
            <InputTexto placeholder="Fabricante" value={remedioEditando.fabricante || ''} onChange={e => setRemedioEditando({ ...remedioEditando, fabricante: e.target.value })} />
            <Button type="submit">Salvar</Button>
          </form>
        </Modal>

        {/* Modal Editar Campo Específico */}
        <Modal isOpen={modalItemAberto} onClose={() => setModalItemAberto(false)} title="Editar Campo Específico">
          <form onSubmit={salvarEdicaoItem} className="space-y-4">
            <InputTexto placeholder="ID" value={remedioEditando.remedioId || ''} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
            <select
              value={remedioEditando.campoParaAtualizar || ''}
              onChange={e => setRemedioEditando({ ...remedioEditando, campoParaAtualizar: e.target.value as keyof Remedio })}
              className="border rounded px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Selecione o campo a atualizar</option>
              <option value="nome">Nome</option>
              <option value="categoria">Categoria</option>
              <option value="principio_ativo">Princípio Ativo</option>
              <option value="dosagem">Dosagem</option>
              <option value="fabricante">Fabricante</option>
            </select>
            {remedioEditando.campoParaAtualizar && (
              <InputTexto
                placeholder={`Novo valor para ${remedioEditando.campoParaAtualizar}`}
                value={remedioEditando[remedioEditando.campoParaAtualizar] !== undefined ? String(remedioEditando[remedioEditando.campoParaAtualizar]) : ''}
                onChange={e => setRemedioEditando({
                  ...remedioEditando,
                  [remedioEditando.campoParaAtualizar!]: e.target.value
                })}
              />
            )}
            <Button type="submit" disabled={!remedioEditando.campoParaAtualizar}>Salvar</Button>
          </form>
        </Modal>
      </div>
    </main>
  );
}