const API_URL = 'http://localhost:3001/remedios'; 

export interface Remedio {
  id?: number;
  nome: string;
  descricao: string;
  validade: string;
  lote: string;
}

// Criar novo remédio
export async function criarRemedio(remedio: Remedio) {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(remedio),
  });

  if (!response.ok) throw new Error('Erro ao criar remédio');
  return response.json();
}

// Listar todos os remédios
export async function listarRemedios() {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error('Erro ao buscar remédios');
  return response.json();
}

// Buscar remédio por ID
export async function buscarRemedioPorId(id: number) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Remédio não encontrado');
  return response.json();
}

// Atualizar remédio
export async function atualizarRemedio(id: number, remedio: Remedio) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(remedio),
  });

  if (!response.ok) throw new Error('Erro ao atualizar remédio');
  return response.json();
}
