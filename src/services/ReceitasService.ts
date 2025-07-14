const API_URL = 'http://localhost:3001/receitas';

export async function listarReceitas(token: string) {
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao listar receitas');
  return response.json();
}

export async function buscarReceitaPorId(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao buscar receita por ID');
  return response.json();
}

export async function criarReceita(dados: any, token: string) { 
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error('Erro ao criar receita');
  return response.json();
}

export async function atualizarReceita(id: number, dados: any, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) throw new Error('Erro ao atualizar receita');
  return response.json();
}

export async function removerReceita(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status !== 204) throw new Error('Erro ao remover receita');
  return { sucesso: true };
}

export async function verificarValidadeReceita(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}/validade`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao verificar validade da receita');
  return response.json();
}