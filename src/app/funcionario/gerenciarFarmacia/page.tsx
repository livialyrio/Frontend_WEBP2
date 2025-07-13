'use client';

import { useEffect, useState } from 'react';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Button from '@/components/button/Button';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
}

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [modalItemAberto, setModalItemAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Partial<Usuario>>({});
  const [novoUsuario, setNovoUsuario] = useState<Partial<Usuario>>({});
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');

  useEffect(() => {
    setUsuarios([
      { id: 1, nome: 'Biankinha Popozao', email: 'bianka@email.com', cpf: '123.456.789-00', telefone: '(21) 98765-4321' },
      { id: 2, nome: 'Maria Sapekinha', email: 'maria@email.com', cpf: '987.654.321-00', telefone: '(11) 99999-8888' },
      { id: 3, nome: 'Carlos Andrade', email: 'carlos@email.com', cpf: '111.222.333-44', telefone: '(31) 98888-7777' }
    ]);
  }, []);

  function buscarPorNome() {
    const resultado = usuarios.filter(u => u.nome.toLowerCase().includes(filtroNome.toLowerCase()));
    setUsuarios(resultado);
  }

  function buscarPorEmail() {
    const resultado = usuarios.filter(u => u.email.toLowerCase().includes(filtroEmail.toLowerCase()));
    setUsuarios(resultado);
  }

  function criarUsuario(e: React.FormEvent) {
    e.preventDefault();
    const novo: Usuario = {
      id: usuarios.length + 1,
      nome: novoUsuario.nome || '',
      email: novoUsuario.email || '',
      cpf: novoUsuario.cpf || '',
      telefone: novoUsuario.telefone || ''
    };
    setUsuarios([...usuarios, novo]);
    setModalAberto(false);
  }

  function removerUsuario(id: number) {
    setUsuarios(usuarios.filter(u => u.id !== id));
  }

  function salvarEdicaoCompleta(e: React.FormEvent) {
    e.preventDefault();
    setUsuarios(prev => prev.map(u => u.id === usuarioEditando.id ? { ...u, ...usuarioEditando } as Usuario : u));
    setModalEdicaoAberto(false);
  }

  function salvarEdicaoItem(e: React.FormEvent) {
    e.preventDefault();
    setUsuarios(prev => prev.map(u => u.id === usuarioEditando.id ? { ...u, nome: usuarioEditando.nome || u.nome } : u));
    setModalItemAberto(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Usuários</h1>
          <Button onClick={() => setModalAberto(true)} className="text-sm">Cadastrar Usuário</Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <InputTexto placeholder="Buscar por nome" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />
          <Button onClick={buscarPorNome}>Buscar por Nome</Button>

          <InputTexto placeholder="Buscar por e-mail" value={filtroEmail} onChange={(e) => setFiltroEmail(e.target.value)} />
          <Button onClick={buscarPorEmail}>Buscar por E-mail</Button>
        </div>

        <table className="w-full text-left bg-white border">
          <thead className="bg-gray-100 text-blue-800">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Nome</th>
              <th className="p-2">E-mail</th>
              <th className="p-2">CPF</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t hover:bg-blue-50">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.nome}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.cpf}</td>
                <td className="p-2">{u.telefone}</td>
                <td className="p-2">
                  <select
                    onChange={(e) => {
                      const opcao = e.target.value;
                      setUsuarioEditando(u);
                      if (opcao === 'editarItem') setModalItemAberto(true);
                      else if (opcao === 'editarCompleto') setModalEdicaoAberto(true);
                      else if (opcao === 'remover') removerUsuario(u.id);
                    }}
                    defaultValue=""
                    className="border rounded px-2 py-1"
                  >
                    <option value="" disabled>Ações</option>
                    <option value="editarItem">Editar nome</option>
                    <option value="editarCompleto">Editar por completo</option>
                    <option value="remover">Remover</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Cadastrar Usuário">
          <form onSubmit={criarUsuario} className="space-y-4">
            <InputTexto placeholder="Nome" onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
            <InputTexto placeholder="E-mail" onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
            <InputTexto placeholder="CPF" onChange={(e) => setNovoUsuario({ ...novoUsuario, cpf: e.target.value })} />
            <InputTexto placeholder="Telefone" onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} />
            <Button type="submit">Salvar</Button>
          </form>
        </Modal>

        <Modal isOpen={modalItemAberto} onClose={() => setModalItemAberto(false)} title="Editar Nome">
          <form onSubmit={salvarEdicaoItem} className="space-y-4">
            <InputTexto placeholder="Novo Nome" value={usuarioEditando.nome || ''} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nome: e.target.value })} />
            <Button type="submit">Salvar Alteração</Button>
          </form>
        </Modal>

        <Modal isOpen={modalEdicaoAberto} onClose={() => setModalEdicaoAberto(false)} title="Editar Usuário">
          <form onSubmit={salvarEdicaoCompleta} className="space-y-4">
            <InputTexto placeholder="Nome" value={usuarioEditando.nome || ''} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nome: e.target.value })} />
            <InputTexto placeholder="E-mail" value={usuarioEditando.email || ''} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, email: e.target.value })} />
            <InputTexto placeholder="CPF" value={usuarioEditando.cpf || ''} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, cpf: e.target.value })} />
            <InputTexto placeholder="Telefone" value={usuarioEditando.telefone || ''} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, telefone: e.target.value })} />
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </Modal>
      </div>
    </main>
  );
}
