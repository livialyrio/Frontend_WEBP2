'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import Modal from '@/components/Modal_Simples/Modal';
import TabelaFiltros from '@/components/tabela/TabelaFiltros';
import { InputTexto } from '@/components/ui/InputText';

import {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
  listarFuncionarios,
  buscarUsuariosPorFarmacia,
  atualizarUsuario,
  atualizarUsuarioParcial,
  removerUsuario,
} from '@/services/UsuariosService'; 

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  farmaciaId?: number;
}

interface UsuarioEditando extends Partial<Usuario> {
  campoParaAtualizar?: keyof Usuario;
}

export default function GerenciarUsuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalBuscarIdAberto, setModalBuscarIdAberto] = useState(false);
  const [modalBuscarEmailAberto, setModalBuscarEmailAberto] = useState(false);
  const [modalBuscarFuncionariosAberto, setModalBuscarFuncionariosAberto] = useState(false);
  const [modalBuscarUsuariosFarmaciaAberto, setModalBuscarUsuariosFarmaciaAberto] = useState(false);
  const [modalAtualizarCompletoAberto, setModalAtualizarCompletoAberto] = useState(false);
  const [modalAtualizarParcialAberto, setModalAtualizarParcialAberto] = useState(false);

  const [novoUsuarioData, setNovoUsuarioData] = useState<Partial<Usuario>>({});
  const [usuarioEditando, setUsuarioEditando] = useState<UsuarioEditando>({});
  const [filtroId, setFiltroId] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');
  const [filtroFarmaciaId, setFiltroFarmaciaId] = useState('');
  const [usuariosExibidos, setUsuariosExibidos] = useState<Usuario[]>([]);
  const [mensagemAcao, setMensagemAcao] = useState('');
  const [mensagemBusca, setMensagemBusca] = useState('');

 
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => {
    handleListarTodosUsuarios();

  }, []);

  const resetAllStates = () => {
    setModalCriarAberto(false);
    setModalBuscarIdAberto(false);
    setModalBuscarEmailAberto(false);
    setModalBuscarFuncionariosAberto(false);
    setModalBuscarUsuariosFarmaciaAberto(false);
    setModalAtualizarCompletoAberto(false);
    setModalAtualizarParcialAberto(false);

    setNovoUsuarioData({});
    setUsuarioEditando({});
    setFiltroId('');
    setFiltroEmail('');
    setFiltroFarmaciaId('');

    setUsuariosExibidos([]);
    setMensagemAcao('');
    setMensagemBusca('');
  };

  const handleAdicionarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, email, tipo, farmaciaId } = novoUsuarioData;

    if (!nome || !email || !tipo) {
      setMensagemAcao('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const novo = await criarUsuario(
        {
          nome,
          email,
          tipo,
          farmaciaId: farmaciaId ? Number(farmaciaId) : undefined,
        },
        token
      );
      setUsuarios(prev => [...prev, novo]);
      setMensagemAcao(`Usuário "${novo.nome}" criado com sucesso!`);
      resetAllStates();
      handleListarTodosUsuarios();
    } catch (error: any) {
      setMensagemAcao(error.message || 'Erro ao criar usuário');
    }
  };

  const handleRemoverUsuario = async (id: number) => {
    if (!window.confirm(`Tem certeza que deseja remover o usuário ID ${id}?`)) return;
    try {
      await removerUsuario(id, token);
      setMensagemAcao(`Usuário ID ${id} removido com sucesso!`);
      setUsuarios(prev => prev.filter(u => u.id !== id));
      handleListarTodosUsuarios();
      resetAllStates();
    } catch (error: any) {
      setMensagemAcao(error.message || `Usuário ID ${id} não encontrado.`);
    }
  };

  const handleAtualizarUsuarioCompleto = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, nome, email, tipo, farmaciaId } = usuarioEditando;
    if (!id || !nome || !email || !tipo) {
      setMensagemAcao('Preencha todos os campos obrigatórios.');
      return;
    }
    try {
      await atualizarUsuario(id, { nome, email, tipo, farmaciaId }, token);
      setMensagemAcao(`Usuário ID ${id} atualizado por completo com sucesso!`);
      resetAllStates();
      handleListarTodosUsuarios();
    } catch (error: any) {
      setMensagemAcao(error.message || 'Erro ao atualizar usuário');
    }
  };

  const handleAtualizarUsuarioParcial = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, campoParaAtualizar } = usuarioEditando;
    if (!id || !campoParaAtualizar || !usuarioEditando[campoParaAtualizar]) {
      setMensagemAcao('Selecione um campo e insira um novo valor.');
      return;
    }
    try {
      const payload: any = {
        [campoParaAtualizar]: usuarioEditando[campoParaAtualizar],
      };
      await atualizarUsuarioParcial(id, payload, token);
      setMensagemAcao(`Campo '${campoParaAtualizar}' do usuário ID ${id} atualizado!`);
      resetAllStates();
      handleListarTodosUsuarios();
    } catch (error: any) {
      setMensagemAcao(error.message || 'Erro ao atualizar usuário');
    }
  };

  const handleListarTodosUsuarios = async () => {
    resetAllStates();
    try {
      const res = await listarUsuarios(token);
      setUsuarios(res);
      setUsuariosExibidos(res);
    } catch (error: any) {
      setMensagemAcao(error.message || 'Erro ao listar usuários');
    }
  };

  const handleBuscarUsuarioPorId = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = Number(filtroId);
    if (isNaN(id)) {
      setMensagemBusca('Digite um ID válido.');
      setUsuariosExibidos([]);
      return;
    }
    try {
      const encontrado = await buscarUsuarioPorId(id, token);
      setUsuariosExibidos(encontrado ? [encontrado] : []);
      setMensagemBusca(encontrado ? '' : `Usuário com ID ${id} não encontrado.`);
    } catch (error: any) {
      setUsuariosExibidos([]);
      setMensagemBusca(error.message || `Usuário com ID ${id} não encontrado.`);
    }
  };

  const handleBuscarUsuarioPorEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = filtroEmail.trim();
    if (!email) {
      setMensagemBusca('Digite um e-mail válido.');
      setUsuariosExibidos([]);
      return;
    }
    try {
      const encontrado = await buscarUsuarioPorEmail(email, token);
      setUsuariosExibidos(encontrado ? [encontrado] : []);
      setMensagemBusca(encontrado ? '' : `Usuário com e-mail "${email}" não encontrado.`);
    } catch (error: any) {
      setUsuariosExibidos([]);
      setMensagemBusca(error.message || `Usuário com e-mail "${email}" não encontrado.`);
    }
  };

  const handleBuscarFuncionarios = async () => {
    resetAllStates();
    try {
      const resultado = await listarFuncionarios(token);
      setUsuariosExibidos(resultado);
      setMensagemBusca(resultado.length > 0 ? '' : 'Nenhum funcionário encontrado.');
    } catch (error: any) {
      setMensagemBusca(error.message || 'Erro ao buscar funcionários');
    }
    setModalBuscarFuncionariosAberto(true);
  };

  const handleBuscarUsuariosPorFarmacia = async (e: React.FormEvent) => {
    e.preventDefault();
    const farmaciaId = Number(filtroFarmaciaId);
    if (isNaN(farmaciaId)) {
      setMensagemBusca('Digite um ID de farmácia válido.');
      setUsuariosExibidos([]);
      return;
    }
    try {
      const resultado = await buscarUsuariosPorFarmacia(farmaciaId, token);
      setUsuariosExibidos(resultado);
      setMensagemBusca(resultado.length > 0 ? '' : `Nenhum usuário encontrado para farmácia ${farmaciaId}.`);
    } catch (error: any) {
      setUsuariosExibidos([]);
      setMensagemBusca(error.message || `Erro ao buscar usuários para farmácia ${farmaciaId}.`);
    }
  };

  const colunasTabela = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'nome' },
    { header: 'Email', accessor: 'email' },
    { header: 'Tipo', accessor: 'tipo' },
    { header: 'Farmácia', accessor: 'farmaciaId' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Usuários</h1>
          <Button onClick={() => router.push('/funcionario')}>Voltar</Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <Button onClick={() => { resetAllStates(); setModalCriarAberto(true); }}>Criar Usuário</Button>
          <Button onClick={() => { resetAllStates(); setModalBuscarIdAberto(true); }}>Buscar por ID</Button>
          <Button onClick={() => { resetAllStates(); setModalBuscarEmailAberto(true); }}>Buscar por Email</Button>
          <Button onClick={handleListarTodosUsuarios}>Listar Todos</Button>
          <Button onClick={handleBuscarFuncionarios}>Buscar Funcionários</Button>
          <Button onClick={() => { resetAllStates(); setModalBuscarUsuariosFarmaciaAberto(true); }}>Buscar Usuários por Farmácia</Button>
        </div>

        {mensagemAcao && (
          <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
            {mensagemAcao}
          </div>
        )}

        <h2 className="text-2xl font-bold text-blue-800 mb-4">Usuários Cadastrados</h2>
        <table className="w-full text-left bg-white border">
          <thead className="bg-gray-100 text-blue-800">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Farmácia</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u.id} className="border-t hover:bg-blue-50">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.nome}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.tipo}</td>
                  <td className="p-2">{u.farmaciaId || '-'}</td>
                  <td className="p-2">
                    <select
                      onChange={(e) => {
                        const opcao = e.target.value;
                        setUsuarioEditando(u);
                        if (opcao === 'atualizarParcial') {
                          setModalAtualizarParcialAberto(true);
                        } else if (opcao === 'atualizarCompleto') {
                          setModalAtualizarCompletoAberto(true);
                        } else if (opcao === 'remover') {
                          handleRemoverUsuario(u.id);
                        }
                        e.target.value = "";
                      }}
                      defaultValue=""
                      className="border rounded px-2 py-1"
                    >
                      <option value="" disabled>Ações</option>
                      <option value="atualizarParcial">Atualizar campo específico</option>
                      <option value="atualizarCompleto">Atualizar por completo</option>
                      <option value="remover">Remover</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {usuariosExibidos.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Resultados da Busca</h2>
            <TabelaFiltros data={usuariosExibidos} columns={colunasTabela} />
            {mensagemBusca && <p className="mt-2 text-red-600">{mensagemBusca}</p>}
          </div>
        )}

        <Modal isOpen={modalCriarAberto} onClose={resetAllStates} title="Criar Novo Usuário">
          <form onSubmit={handleAdicionarUsuario} className="space-y-4">
            <InputTexto placeholder="Nome" value={novoUsuarioData.nome || ''} onChange={e => setNovoUsuarioData({ ...novoUsuarioData, nome: e.target.value })} />
            <InputTexto placeholder="Email" type="email" value={novoUsuarioData.email || ''} onChange={e => setNovoUsuarioData({ ...novoUsuarioData, email: e.target.value })} />
            <InputTexto placeholder="Tipo" value={novoUsuarioData.tipo || ''} onChange={e => setNovoUsuarioData({ ...novoUsuarioData, tipo: e.target.value })} />
            <InputTexto placeholder="Farmácia (opcional)" type="number" value={novoUsuarioData.farmaciaId?.toString() || ''} onChange={e => setNovoUsuarioData({ ...novoUsuarioData, farmaciaId: Number(e.target.value) })} />
            <Button type="submit">Adicionar Usuário</Button>
          </form>
          {mensagemAcao && <p className="mt-4 text-red-600">{mensagemAcao}</p>}
        </Modal>

        <Modal isOpen={modalBuscarIdAberto} onClose={resetAllStates} title="Buscar Usuário por ID">
          <form onSubmit={handleBuscarUsuarioPorId} className="space-y-4">
            <InputTexto placeholder="ID do usuário" type="number" value={filtroId} onChange={e => setFiltroId(e.target.value)} />
            <Button type="submit">Buscar</Button>
          </form>
          {usuariosExibidos.length > 0 && (
            <div className="mt-4">
              <TabelaFiltros data={usuariosExibidos} columns={colunasTabela} />
            </div>
          )}
          {mensagemBusca && filtroId.trim() !== '' && usuariosExibidos.length === 0 && (
            <p className="mt-2 text-red-600">{mensagemBusca}</p>
          )}
        </Modal>

        <Modal isOpen={modalBuscarEmailAberto} onClose={resetAllStates} title="Buscar Usuário por Email">
          <form onSubmit={handleBuscarUsuarioPorEmail} className="space-y-4">
            <InputTexto placeholder="Email do usuário" type="email" value={filtroEmail} onChange={e => setFiltroEmail(e.target.value)} />
            <Button type="submit">Buscar</Button>
          </form>
          {usuariosExibidos.length > 0 && (
            <div className="mt-4">
              <TabelaFiltros data={usuariosExibidos} columns={colunasTabela} />
            </div>
          )}
          {mensagemBusca && filtroEmail.trim() !== '' && usuariosExibidos.length === 0 && (
            <p className="mt-2 text-red-600">{mensagemBusca}</p>
          )}
        </Modal>

        <Modal isOpen={modalBuscarFuncionariosAberto} onClose={resetAllStates} title="Buscar Funcionários">
          <div className="space-y-4">
            <Button onClick={handleBuscarFuncionarios}>Recarregar Funcionários</Button>
            {usuariosExibidos.length > 0 && (
              <TabelaFiltros data={usuariosExibidos} columns={colunasTabela} />
            )}
            {mensagemBusca && usuariosExibidos.length === 0 && (
              <p className="mt-2 text-red-600">{mensagemBusca}</p>
            )}
          </div>
        </Modal>

        <Modal isOpen={modalBuscarUsuariosFarmaciaAberto} onClose={resetAllStates} title="Buscar Usuários por Farmácia">
          <form onSubmit={handleBuscarUsuariosPorFarmacia} className="space-y-4">
            <InputTexto placeholder="ID da Farmácia" type="number" value={filtroFarmaciaId} onChange={e => setFiltroFarmaciaId(e.target.value)} />
            <Button type="submit">Buscar</Button>
          </form>
          {usuariosExibidos.length > 0 && (
            <div className="mt-4">
              <TabelaFiltros data={usuariosExibidos} columns={colunasTabela} />
            </div>
          )}
          {mensagemBusca && filtroFarmaciaId.trim() !== '' && usuariosExibidos.length === 0 && (
            <p className="mt-2 text-red-600">{mensagemBusca}</p>
          )}
        </Modal>

        <Modal isOpen={modalAtualizarCompletoAberto} onClose={resetAllStates} title="Atualizar Usuário Completo">
          <form onSubmit={handleAtualizarUsuarioCompleto} className="space-y-4">
            <InputTexto placeholder="ID" type="number" value={usuarioEditando.id?.toString() || ''} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
            <InputTexto placeholder="Nome" value={usuarioEditando.nome || ''} onChange={e => setUsuarioEditando({ ...usuarioEditando, nome: e.target.value })} />
            <InputTexto placeholder="Email" type="email" value={usuarioEditando.email || ''} onChange={e => setUsuarioEditando({ ...usuarioEditando, email: e.target.value })} />
            <InputTexto placeholder="Tipo" value={usuarioEditando.tipo || ''} onChange={e => setUsuarioEditando({ ...usuarioEditando, tipo: e.target.value })} />
            <InputTexto placeholder="Farmácia (opcional)" type="number" value={usuarioEditando.farmaciaId?.toString() || ''} onChange={e => setUsuarioEditando({ ...usuarioEditando, farmaciaId: Number(e.target.value) })} />
            <Button type="submit">Salvar Alterações</Button>
          </form>
          {mensagemAcao && <p className="mt-4 text-red-600">{mensagemAcao}</p>}
        </Modal>

        <Modal isOpen={modalAtualizarParcialAberto} onClose={resetAllStates} title="Atualizar Campo Específico do Usuário">
          <form onSubmit={handleAtualizarUsuarioParcial} className="space-y-4">
            <InputTexto placeholder="ID" type="number" value={usuarioEditando.id?.toString() || ''} readOnly disabled className="bg-gray-100 cursor-not-allowed" />
            <select
              value={usuarioEditando.campoParaAtualizar || ''}
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, campoParaAtualizar: e.target.value as keyof Usuario })}
              className="border rounded px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Selecione o campo a atualizar</option>
              <option value="nome">Nome</option>
              <option value="email">Email</option>
              <option value="tipo">Tipo</option>
              <option value="farmaciaId">Farmácia</option>
            </select>
            {usuarioEditando.campoParaAtualizar && (
              <InputTexto
                placeholder={`Novo valor para ${usuarioEditando.campoParaAtualizar}`}
                value={usuarioEditando[usuarioEditando.campoParaAtualizar] !== undefined ? String(usuarioEditando[usuarioEditando.campoParaAtualizar]) : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setUsuarioEditando({
                    ...usuarioEditando,
                    [usuarioEditando.campoParaAtualizar!]: value
                  });
                }}
              />
            )}
            <Button type="submit" disabled={!usuarioEditando.campoParaAtualizar}>Salvar Alteração</Button>
          </form>
          {mensagemAcao && <p className="mt-4 text-red-600">{mensagemAcao}</p>}
        </Modal>
      </div>
    </main>
  );
}