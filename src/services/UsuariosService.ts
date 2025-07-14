const API_URL = 'http://localhost:3001/usuarios';

export async function criarUsuario(dados: any, token: string) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error('Erro ao criar usuário');
  return res.json();
}

export async function listarUsuarios(token: string) {
  const res = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao listar usuários');
  return res.json();
}

export async function buscarUsuarioPorId(id: number, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuário por ID');
  return res.json();
}

export async function buscarUsuarioPorEmail(email: string, token: string) {
  const res = await fetch(`${API_URL}/email/${email}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuário por e-mail');
  return res.json();
}

export async function listarFuncionarios(token: string) {
  const res = await fetch(`${API_URL}/funcionarios`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao listar funcionários');
  return res.json();
}

export async function buscarUsuariosPorFarmacia(farmaciaId: number, token: string) {
  const res = await fetch(`${API_URL}/farmacia/${farmaciaId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários por farmácia');
  return res.json();
}

export async function atualizarUsuario(id: number, dados: any, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error('Erro ao atualizar usuário');
  return res.json();
}

export async function atualizarUsuarioParcial(id: number, dados: Partial<any>, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error('Erro ao atualizar parcialmente o usuário');
  return res.json();
}

export async function removerUsuario(id: number, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok && res.status !== 204) throw new Error('Erro ao remover usuário');
  return { sucesso: true };
}
