'use client';

import Button from '@/components/button/Button';
import TabelaFiltros from '@/components/tabela/TabelaFiltros';
import { InputTexto } from '@/components/ui/InputText';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  listarRemedios,
  criarRemedio,
  buscarRemedioPorId,
  atualizarRemedio
} from '@/service/remedioService';

interface Remedio {
  id?: number;
  nome: string;
  descricao: string;
  validade: string;
  lote: string;
}

export default function GerenciarRemedio() {
  const [remedios, setRemedios] = useState<Remedio[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [validade, setValidade] = useState('');
  const [lote, setLote] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  useEffect(() => {
    carregarRemedios();
  }, []);

  async function carregarRemedios() {
    const dados = await listarRemedios();
    setRemedios(dados);
  }

  async function adicionarRemedio() {
    if (!nome || !descricao || !validade || !lote) {
      alert('Preencha todos os campos');
      return;
    }
    await criarRemedio({ nome, descricao, validade, lote });
    setMensagem('Remédio adicionado com sucesso.');
    limparCampos();
    carregarRemedios();
  }

  async function editarRemedio() {
    if (!editandoId) return;
    await atualizarRemedio(editandoId, { nome, descricao, validade, lote });
    setMensagem('Remédio atualizado com sucesso.');
    setEditandoId(null);
    limparCampos();
    carregarRemedios();
  }

  function prepararEdicao(remedio: Remedio) {
    setEditandoId(remedio.id!);
    setNome(remedio.nome);
    setDescricao(remedio.descricao);
    setValidade(remedio.validade);
    setLote(remedio.lote);
  }

  function limparCampos() {
    setNome('');
    setDescricao('');
    setValidade('');
    setLote('');
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Remédios</h1>
          <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
        </header>

        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}

        <section className="grid grid-cols-2 gap-4 mb-6">
          <InputTexto value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
          <InputTexto value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
          <InputTexto value={validade} onChange={(e) => setValidade(e.target.value)} placeholder="Validade (ex: 2025-12-31)" />
          <InputTexto value={lote} onChange={(e) => setLote(e.target.value)} placeholder="Lote" />
          <Button className="col-span-2" onClick={editandoId ? editarRemedio : adicionarRemedio}>
            {editandoId ? 'Salvar Alterações' : 'Adicionar Remédio'}
          </Button>
        </section>

        <TabelaFiltros
          data={remedios}
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Nome', accessor: 'nome' },
            { header: 'Descrição', accessor: 'descricao' },
            { header: 'Validade', accessor: 'validade' },
            { header: 'Lote', accessor: 'lote' },
            {
              header: 'Ações',
              accessor: 'id',
              render: (id, row) => (
                <div className="flex gap-2">
                  <button onClick={() => prepararEdicao(row)} className="text-blue-600 hover:underline">Editar</button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </main>
  );
}
