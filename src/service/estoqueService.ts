const API_URL = 'http://localhost:3001/estoque';

export interface Estoque {
  id?: number;
  remedioId: number;
  farmaciaId: number;
  quantidade: number;
}

// Estoques com quantidade < 3
export async function listarEstoqueBaixo() {
  const response = await fetch(`${API_URL}/aviso`);
  if (!response.ok) throw new Error('Erro ao buscar estoques com aviso');
  return response.json();
}

// Criar novo estoque
export async function criarEstoque(item: Estoque) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error('Erro ao criar estoque');
  return response.json();
}

// Listar todos os estoques
export async function listarEstoques() {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error('Erro ao buscar estoques');
  return response.json();
}

// Buscar estoque por ID
export async function buscarEstoquePorId(id: number) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar estoque por ID');
  return response.json();
}

// Atualizar estoque 
export async function atualizarEstoque(id: number, item: Estoque) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error('Erro ao atualizar estoque');
  return response.json();
}

// Atualizar parcialmente
export async function atualizarEstoqueParcial(id: number, parcial: Partial<Estoque>) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parcial),
  });
  if (!response.ok) throw new Error('Erro ao atualizar parcialmente');
  return response.json();
}

// Remover item do estoque
export async function remove(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao remover item do estoque');
}

// Estoques por farmácia
export async function buscarPorFarmacia(farmaciaId: number) {
  const response = await fetch(`${API_URL}/farmacia/${farmaciaId}`);
  if (!response.ok) throw new Error('Erro ao buscar por farmácia');
  return response.json();
}

// Estoques por remédio
export async function buscarPorRemedio(remedioId: number) {
  const response = await fetch(`${API_URL}/remedio/${remedioId}`);
  if (!response.ok) throw new Error('Erro ao buscar por remédio');
  return response.json();
}

// Atualiza estoque após doação
export async function doarMedicamentoEstoque(farmaciaId: number, remedioId: number, quantidade: number) {
  const response = await fetch(`${API_URL}/doar/${farmaciaId}/${remedioId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantidade }), 
  });
  if (!response.ok) throw new Error('Erro ao doar remédio');
  return response.json();
}

// Verificar se remédio está disponível
export async function verificarDisponibilidade(remedioId: number) {
  const response = await fetch(`${API_URL}/${remedioId}/disponivel`);
  if (!response.ok) throw new Error('Erro ao verificar disponibilidade');
  return response.json();
}
