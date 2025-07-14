'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';

import {
  listarFarmacias,
  criarFarmacia as serviceCriarFarmacia,
  atualizarFarmacia as serviceAtualizarFarmacia,
  atualizarFarmaciaParcial,
  removerFarmacia as serviceRemoverFarmacia,
  buscarFarmaciasPorBairro,
  buscarFarmaciasPorCidade,
} from '@/services/farmaciasService';

interface Farmacia {
  id: number;
  cep: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: number;
}

interface CriarFarmaciaPayload {
  cep: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: number;
}

export default function GerenciarFarmacias() {
  const [farmacias, setFarmacias] = useState<Farmacia[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [modalItemAberto, setModalItemAberto] = useState(false);
  const [farmaciaEditando, setFarmaciaEditando] = useState<Partial<Farmacia>>({});
  const [novaFarmacia, setNovaFarmacia] = useState<Partial<Farmacia>>({});
  const [filtroBairro, setFiltroBairro] = useState('');
  const [filtroCidade, setFiltroCidade] = useState({ valor: '', resultado: false });
  const router = useRouter();

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    async function carregarFarmacias() {
      try {
        const dados = await listarFarmacias(token);
        setFarmacias(dados);
      } catch {
        alert('Erro ao carregar farmácias');
      }
    }
    carregarFarmacias();
  }, [token]);

  async function buscarPorBairro() {
    try {
      if (!filtroBairro.trim()) {
        const dados = await listarFarmacias(token);
        setFarmacias(dados);
        return;
      }
      const resultado = await buscarFarmaciasPorBairro(filtroBairro, token);
      setFarmacias(resultado);
    } catch {
      alert('Erro ao buscar por bairro');
    }
  }

  async function buscarPorCidade() {
    try {
      if (!filtroCidade.valor.trim()) {
        const dados = await listarFarmacias(token);
        setFarmacias(dados);
        return;
      }
      const resultado = await buscarFarmaciasPorCidade(filtroCidade.valor, token);
      setFarmacias(resultado);
    } catch {
      alert('Erro ao buscar por cidade');
    }
  }

  async function criarFarmacia(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (
        !novaFarmacia.cep ||
        !novaFarmacia.cidade ||
        !novaFarmacia.bairro ||
        !novaFarmacia.logradouro ||
        novaFarmacia.numero === undefined
      ) {
        alert('Preencha todos os campos para criar a farmácia');
        return;
      }

      const payload: CriarFarmaciaPayload = {
        cep: novaFarmacia.cep,
        cidade: novaFarmacia.cidade,
        bairro: novaFarmacia.bairro,
        logradouro: novaFarmacia.logradouro,
        numero: novaFarmacia.numero,
      };

      const farmaciaCriada = await serviceCriarFarmacia(payload, token);
      setFarmacias([...farmacias, farmaciaCriada]);
      setModalAberto(false);
      setNovaFarmacia({});
    } catch {
      alert('Erro ao criar farmácia');
    }
  }

  async function removerFarmacia(id: number) {
    try {
      await serviceRemoverFarmacia(id, token);
      setFarmacias(farmacias.filter(f => f.id !== id));
    } catch {
      alert('Erro ao remover farmácia');
    }
  }

  async function salvarEdicaoCompleta(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (
        !farmaciaEditando.id ||
        !farmaciaEditando.cep ||
        !farmaciaEditando.cidade ||
        !farmaciaEditando.bairro ||
        !farmaciaEditando.logradouro ||
        farmaciaEditando.numero === undefined
      ) {
        alert('Preencha todos os campos para salvar a edição');
        return;
      }

      const farmaciaAtualizada = await serviceAtualizarFarmacia(
        farmaciaEditando.id,
        farmaciaEditando as Farmacia,
        token
      );
      setFarmacias(prev =>
        prev.map(f => (f.id === farmaciaAtualizada.id ? farmaciaAtualizada : f))
      );
      setModalEdicaoAberto(false);
      setFarmaciaEditando({});
    } catch {
      alert('Erro ao salvar edição completa');
    }
  }

  async function salvarEdicaoItem(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!farmaciaEditando.id || !farmaciaEditando.cidade) {
        alert('Informe a nova cidade para salvar');
        return;
      }

      const farmaciaAtualizada = await atualizarFarmaciaParcial(
        farmaciaEditando.id,
        { cidade: farmaciaEditando.cidade },
        token
      );
      setFarmacias(prev =>
        prev.map(f => (f.id === farmaciaAtualizada.id ? farmaciaAtualizada : f))
      );
      setModalItemAberto(false);
      setFarmaciaEditando({});
    } catch {
      alert('Erro ao salvar edição de cidade');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Farmácias</h1>
          <Button onClick={() => setModalAberto(true)} className="text-sm">
            Criar Farmácia
          </Button>
          <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <InputTexto
            placeholder="Buscar por bairro"
            value={filtroBairro}
            onChange={e => setFiltroBairro(e.target.value)}
          />
          <Button onClick={buscarPorBairro}>Buscar por Bairro</Button>

          <InputTexto
            placeholder="Buscar por cidade"
            value={filtroCidade.valor}
            onChange={e => setFiltroCidade({ ...filtroCidade, valor: e.target.value })}
          />
          <Button onClick={buscarPorCidade}>Buscar por Cidade</Button>
        </div>

        {/* Tabela */}
        <table className="w-full text-left bg-white border">
          <thead className="bg-gray-100 text-blue-800">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">CEP</th>
              <th className="p-2">Cidade</th>
              <th className="p-2">Bairro</th>
              <th className="p-2">Logradouro</th>
              <th className="p-2">Número</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {farmacias.map(f => (
              <tr key={f.id} className="border-t hover:bg-blue-50">
                <td className="p-2">{f.id}</td>
                <td className="p-2">{f.cep}</td>
                <td className="p-2">{f.cidade}</td>
                <td className="p-2">{f.bairro}</td>
                <td className="p-2">{f.logradouro}</td>
                <td className="p-2">{f.numero}</td>
                <td className="p-2">
                  <select
                    onChange={e => {
                      const opcao = e.target.value;
                      setFarmaciaEditando(f);
                      if (opcao === 'editarItem') {
                        setModalItemAberto(true);
                      } else if (opcao === 'editarCompleto') {
                        setModalEdicaoAberto(true);
                      } else if (opcao === 'remover') {
                        removerFarmacia(f.id);
                      }
                      e.target.value = '';
                    }}
                    defaultValue=""
                    className="border rounded px-2 py-1"
                  >
                    <option value="" disabled>
                      Ações
                    </option>
                    <option value="editarItem">Editar item (ex: Cidade)</option>
                    <option value="editarCompleto">Editar por completo</option>
                    <option value="remover">Remover</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para nova farmácia */}
        <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Nova Farmácia">
          <form onSubmit={criarFarmacia} className="space-y-4">
            <InputTexto placeholder="CEP" onChange={e => setNovaFarmacia({ ...novaFarmacia, cep: e.target.value })} />
            <InputTexto placeholder="Cidade" onChange={e => setNovaFarmacia({ ...novaFarmacia, cidade: e.target.value })} />
            <InputTexto placeholder="Bairro" onChange={e => setNovaFarmacia({ ...novaFarmacia, bairro: e.target.value })} />
            <InputTexto placeholder="Logradouro" onChange={e => setNovaFarmacia({ ...novaFarmacia, logradouro: e.target.value })} />
            <InputTexto placeholder="Número" type="number" onChange={e => setNovaFarmacia({ ...novaFarmacia, numero: Number(e.target.value) })} />
            <Button type="submit">Salvar</Button>
          </form>
        </Modal>

        {/* Modal editar item (cidade) */}
        <Modal isOpen={modalItemAberto} onClose={() => setModalItemAberto(false)} title="Editar Cidade">
          <form onSubmit={salvarEdicaoItem} className="space-y-4">
            <InputTexto
              placeholder="Nova Cidade"
              value={farmaciaEditando.cidade || ''}
              onChange={e => setFarmaciaEditando({ ...farmaciaEditando, cidade: e.target.value })}
            />
            <Button type="submit">Salvar Alteração</Button>
          </form>
        </Modal>

        {/* Modal editar por completo */}
        <Modal isOpen={modalEdicaoAberto} onClose={() => setModalEdicaoAberto(false)} title="Editar Farmácia">
          <form onSubmit={salvarEdicaoCompleta} className="space-y-4">
            <InputTexto placeholder="CEP" value={farmaciaEditando.cep || ''} onChange={e => setFarmaciaEditando({ ...farmaciaEditando, cep: e.target.value })} />
            <InputTexto placeholder="Cidade" value={farmaciaEditando.cidade || ''} onChange={e => setFarmaciaEditando({ ...farmaciaEditando, cidade: e.target.value })} />
            <InputTexto placeholder="Bairro" value={farmaciaEditando.bairro || ''} onChange={e => setFarmaciaEditando({ ...farmaciaEditando, bairro: e.target.value })} />
            <InputTexto placeholder="Logradouro" value={farmaciaEditando.logradouro || ''} onChange={e => setFarmaciaEditando({ ...farmaciaEditando, logradouro: e.target.value })} />
            <InputTexto placeholder="Número" type="number" value={farmaciaEditando.numero || 0} onChange={e => setFarmaciaEditando({ ...farmaciaEditando, numero: Number(e.target.value) })} />
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </Modal>
      </div>
    </main>
  );
}
