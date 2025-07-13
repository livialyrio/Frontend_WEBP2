const API_URL = 'http://localhost:3001/doacoes-remedios';

export interface DoacaoRemedio {
  doacaoRemedioId?: number;
  solicitacaoId?: number;
  usuarioId: number;
  remedioId: number;
  quantidade: number;
  data_doacao?: string; 
  data_fim_tratamento: string; 
}

// Cabeçalho com autenticação
function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

// Criar nova doação
export async function criarDoacaoRemedio(doacao: DoacaoRemedio, token: string) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(doacao),
  });

  if (!response.ok) throw new Error('Erro ao criar doação de remédio');
  return response.json();
}

// Buscar todas as doações
export async function listarDoacoesRemedios(token: string) {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao listar doações');
  return response.json();
}

// Buscar doação por ID
export async function buscarDoacaoPorId(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao buscar doação por ID');
  return response.json();
}

// Buscar doações de um usuário
export async function listarDoacoesPorUsuario(usuarioId: number, token: string) {
  const response = await fetch(`${API_URL}/usuario/${usuarioId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao listar doações do usuário');
  return response.json();
}

// Atualizar completamente uma doação
export async function atualizarDoacaoRemedio(id: number, dados: DoacaoRemedio, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(dados),
  });

  if (!response.ok) throw new Error('Erro ao atualizar doação');
  return response.json();
}

// Atualização parcial (patch)
export async function atualizarParcialDoacaoRemedio(id: number, dados: Partial<DoacaoRemedio>, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(dados),
  });

  if (!response.ok) throw new Error('Erro ao atualizar parcialmente a doação');
  return response.json();
}

// Remover doação
export async function deletarDoacaoRemedio(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao deletar doação');
  return response.json();
}
