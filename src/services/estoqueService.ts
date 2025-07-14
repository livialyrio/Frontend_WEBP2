const API_URL = 'http://localhost:3001/estoque';

export interface Estoque {
  estoqueId?: number;
  farmaciaId: number;
  remedioId: number;
  quantidade_disponivel: number;
}

// Cabeçalhos com token
function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

// Criar um novo item no estoque
export async function criarEstoque(dados: Estoque, token: string) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(dados),
  });

  if (!response.ok) throw new Error('Erro ao criar um novo item no estoque');
  return response.json();
}

// Listar todos os estoques
export async function listarEstoques(token: string) {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: authHeaders(token),
  });

  if (!response.ok) throw new Error('Erro ao listar estoques');
  return response.json();
}

// Buscar estoque por ID
export async function buscarEstoquePorId(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: authHeaders(token),
  });

  if (!response.ok) throw new Error('Estoque não encontrado');
  return response.json();
}

// 'Atualiza item de estoque por completo
export async function atualizarEstoque(id: number, dados: Estoque, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(dados),
  });

  if (!response.ok) throw new Error('Erro ao atualizar estoque');
  return response.json();
}

// Atualizar parcialmente um estoque
export async function atualizarParcialEstoque(id: number, dados: Partial<Estoque>, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(dados),
  });

  if (!response.ok) throw new Error('Erro ao atualizar parcialmente o estoque');
  return response.json();
}

// Deletar estoque
export async function deletarEstoque(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  if (!response.ok) throw new Error('Erro ao deletar estoque');
  return response.json();
}

// Buscar por farmácia
export async function listarEstoquePorFarmacia(farmaciaId: number, token: string) {
  const response = await fetch(`${API_URL}/farmacia/${farmaciaId}`, {
    method: 'GET',
    headers: authHeaders(token),
  });

  if (!response.ok) throw new Error('Erro ao buscar estoque por farmácia');
  return response.json();
}

// Buscar por remédio
export async function listarEstoquePorRemedio(remedioId: number, token: string) {
  const response = await fetch(`${API_URL}/remedio/${remedioId}`, {
    method: 'GET',
    headers: authHeaders(token),
  });

  if (!response.ok) throw new Error('Erro ao buscar estoque por remédio');
  return response.json();
}

// Verificar disponibilidade de remédio no estoque
export async function verificarDisponibilidade(remedioId: number, token: string) {
  const response = await fetch(`${API_URL}/${remedioId}/disponivel`, {
    method: 'GET',
    headers: authHeaders(token),
  });

  if (!response.ok) throw new Error('Erro ao verificar disponibilidade');
  return response.json(); // { disponivel: boolean }
}

// Atualiza o estoque após a doação de um medicamento para uma farmácia
export async function doarMedicamento(
  farmaciaId: number,
  remedioId: number,
  quantidade: number,
  token: string
) {
  const response = await fetch(`${API_URL}/doar/${farmaciaId}/${remedioId}`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ quantidade }),
  });

  if (!response.ok) throw new Error('Erro ao atualiza o estoque após a doação de um medicamento para uma farmácia');
  return response.json();
}

// Buscar remédios com estoque baixo
export async function listarEstoqueBaixo(token: string) {
  const response = await fetch(`${API_URL}/aviso`, {
    method: 'GET',
    headers: authHeaders(token),
  });

  if (!response.ok) throw new Error('Erro ao buscar estoque baixo');
  return response.json();
}
