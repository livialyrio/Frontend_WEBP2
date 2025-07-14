const API_URL = 'http://localhost:3001/remedios';

export interface Remedio {
  remedioId?: number;
  nome: string;
  principio_ativo?: string;
  categoria?: string;
  dosagem?: string;
  fabricante?: string;
  quantidade?: number;
}

// Cabeçalhos com token
function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

// Criar novo remédio
export async function criarRemedio(remedio: Remedio, token: string) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(remedio),
  });

  if (!response.ok) throw new Error('Erro ao criar remédio');
  return response.json();
}

// Listar todos os remédios
export async function listarRemedios(token: string) {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao buscar remédios');
  return response.json();
}

// Buscar remédio por ID
export async function buscarRemedioPorId(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Remédio não encontrado');
  return response.json();
}

// Atualizar completamente um remédio
export async function atualizarRemedio(id: number, remedio: Remedio, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(remedio),
  });

  if (!response.ok) throw new Error('Erro ao atualizar remédio');
  return response.json();
}

// Atualizar parcialmente um remédio
export async function atualizarParcialmenteRemedio(id: number, dados: Partial<Remedio>, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(dados),
  });

  if (!response.ok) throw new Error('Erro ao atualizar parcialmente o remédio');
  return response.json();
}

// Atualizar princípio ativo
export async function atualizarPrincipioAtivo(id: number, principio_ativo: string, token: string) {
  const response = await fetch(`${API_URL}/${id}/principio_ativo`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ principio_ativo }),
  });

  if (!response.ok) throw new Error('Erro ao atualizar princípio ativo');
  return response.json();
}

// Atualizar categoria
export async function atualizarCategoriaRemedio(id: number, categoria: string, token: string) {
  const response = await fetch(`${API_URL}/${id}/atualizar-categoria`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ categoria }),
  });

  if (!response.ok) throw new Error('Erro ao atualizar categoria');
  return response.json();
}

// Deletar remédio
export async function deletarRemedio(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao deletar remédio');
  return response.json();
}

// Buscar remédios por categoria
export async function listarRemediosPorCategoria(categoria: string, token: string) {
  const response = await fetch(`${API_URL}/categoria/${categoria}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao buscar por categoria');
  return response.json();
}

// Listar todas as categorias
export async function listarTodasCategorias(token: string) {
  const response = await fetch(`${API_URL}/categorias`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao buscar categorias');
  return response.json();
}

// Buscar remédios por princípio ativo
export async function listarRemediosPorPrincipioAtivo(principio_ativo: string, token: string) {
  const response = await fetch(`${API_URL}/principio_ativo/${principio_ativo}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao buscar por princípio ativo');
  return response.json();
}

// Buscar remédios por nome
export async function listarRemedioPorNome(nome: string, token: string) {
  const response = await fetch(`${API_URL}/nome/${nome}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao buscar por nome');
  return response.json();
}
