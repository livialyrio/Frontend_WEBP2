'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';

interface Farmacia {
  id: number;
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

  useEffect(() => {
    setFarmacias([
      {
        id: 1,
        cep: '12345-678',
        cidade: 'Rio de Janeiro',
        bairro: 'Copacabana',
        logradouro: 'Av. Atlântica',
        numero: 100
      },
      {
        id: 2,
        cep: '23456-789',
        cidade: 'São Paulo',
        bairro: 'Centro',
        logradouro: 'Rua das Flores',
        numero: 200
      },
      {
        id: 3,
        cep: '34567-890',
        cidade: 'Rio de Janeiro',
        bairro: 'Barra',
        logradouro: 'Av. das Américas',
        numero: 300
      }
    ]);
  }, []);

  function buscarPorBairro() {
    const resultado = farmacias.filter(f =>
      f.bairro.toLowerCase().includes(filtroBairro.toLowerCase())
    );
    setFarmacias(resultado);
  }

  function buscarPorCidade() {
    const resultado = farmacias.filter(f =>
      f.cidade.toLowerCase().includes(filtroCidade.valor.toLowerCase())
    );
    setFarmacias(resultado);
  }

  function criarFarmacia(e: React.FormEvent) {
    e.preventDefault();
    const nova: Farmacia = {
      id: farmacias.length + 1,
      cep: novaFarmacia.cep || '',
      cidade: novaFarmacia.cidade || '',
      bairro: novaFarmacia.bairro || '',
      logradouro: novaFarmacia.logradouro || '',
      numero: novaFarmacia.numero || 0
    };
    setFarmacias([...farmacias, nova]);
    setModalAberto(false);
  }

  function removerFarmacia(id: number) {
    setFarmacias(farmacias.filter(f => f.id !== id));
  }

  function salvarEdicaoCompleta(e: React.FormEvent) {
    e.preventDefault();
    setFarmacias(prev =>
      prev.map(f => f.id === farmaciaEditando.id ? { ...f, ...farmaciaEditando } as Farmacia : f)
    );
    setModalEdicaoAberto(false);
  }

  function salvarEdicaoItem(e: React.FormEvent) {
    e.preventDefault();
    setFarmacias(prev =>
      prev.map(f =>
        f.id === farmaciaEditando.id
          ? { ...f, cidade: farmaciaEditando.cidade || f.cidade }
          : f
      )
    );
    setModalItemAberto(false);
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

    {/* Botões e filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <InputTexto
            placeholder="Buscar por bairro"
            value={filtroBairro}
            onChange={(e) => setFiltroBairro(e.target.value)}
          />
          <Button onClick={buscarPorBairro}>Buscar por Bairro</Button>

          <InputTexto
            placeholder="Buscar por cidade"
            value={filtroCidade.valor}
            onChange={(e) => setFiltroCidade({ ...filtroCidade, valor: e.target.value })}
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
            {farmacias.map((f) => (
              <tr key={f.id} className="border-t hover:bg-blue-50">
                <td className="p-2">{f.id}</td>
                <td className="p-2">{f.cep}</td>
                <td className="p-2">{f.cidade}</td>
                <td className="p-2">{f.bairro}</td>
                <td className="p-2">{f.logradouro}</td>
                <td className="p-2">{f.numero}</td>
                <td className="p-2">
                  <select
                    onChange={(e) => {
                      const opcao = e.target.value;
                      setFarmaciaEditando(f);
                      if (opcao === 'editarItem') {
                        setModalItemAberto(true);
                      } else if (opcao === 'editarCompleto') {
                        setModalEdicaoAberto(true);
                      } else if (opcao === 'remover') {
                        removerFarmacia(f.id);
                      }
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
            <InputTexto placeholder="CEP" onChange={(e) => setNovaFarmacia({ ...novaFarmacia, cep: e.target.value })} />
            <InputTexto placeholder="Cidade" onChange={(e) => setNovaFarmacia({ ...novaFarmacia, cidade: e.target.value })} />
            <InputTexto placeholder="Bairro" onChange={(e) => setNovaFarmacia({ ...novaFarmacia, bairro: e.target.value })} />
            <InputTexto placeholder="Logradouro" onChange={(e) => setNovaFarmacia({ ...novaFarmacia, logradouro: e.target.value })} />
            <InputTexto placeholder="Número" type="number" onChange={(e) => setNovaFarmacia({ ...novaFarmacia, numero: Number(e.target.value) })} />
            <Button type="submit">Salvar</Button>
          </form>
        </Modal>

        {/* Modal editar item (cidade) */}
        <Modal isOpen={modalItemAberto} onClose={() => setModalItemAberto(false)} title="Editar Cidade">
          <form onSubmit={salvarEdicaoItem} className="space-y-4">
            <InputTexto
              placeholder="Nova Cidade"
              value={farmaciaEditando.cidade || ''}
              onChange={(e) => setFarmaciaEditando({ ...farmaciaEditando, cidade: e.target.value })}
            />
            <Button type="submit">Salvar Alteração</Button>
          </form>
        </Modal>

        {/* Modal editar por completo */}
        <Modal isOpen={modalEdicaoAberto} onClose={() => setModalEdicaoAberto(false)} title="Editar Farmácia">
          <form onSubmit={salvarEdicaoCompleta} className="space-y-4">
            <InputTexto placeholder="CEP" value={farmaciaEditando.cep || ''} onChange={(e) => setFarmaciaEditando({ ...farmaciaEditando, cep: e.target.value })} />
            <InputTexto placeholder="Cidade" value={farmaciaEditando.cidade || ''} onChange={(e) => setFarmaciaEditando({ ...farmaciaEditando, cidade: e.target.value })} />
            <InputTexto placeholder="Bairro" value={farmaciaEditando.bairro || ''} onChange={(e) => setFarmaciaEditando({ ...farmaciaEditando, bairro: e.target.value })} />
            <InputTexto placeholder="Logradouro" value={farmaciaEditando.logradouro || ''} onChange={(e) => setFarmaciaEditando({ ...farmaciaEditando, logradouro: e.target.value })} />
            <InputTexto placeholder="Número" type="number" value={farmaciaEditando.numero || 0} onChange={(e) => setFarmaciaEditando({ ...farmaciaEditando, numero: Number(e.target.value) })} />
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </Modal>
      </div>
    </main>
  );
}