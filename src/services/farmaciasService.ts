const API_URL = 'http://localhost:3001/farmacias';

export interface Farmacia {
  id: number;
  cep: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: number;
}

export interface CriarFarmaciaPayload {
  cep: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: number;
}

export interface AtualizarFarmaciaPayload {
  cep?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  numero?: number;
}

function buildHeaders(token: string) {
  if (!token) throw new Error('Token de autenticação obrigatório');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

function handleError(response: Response) {
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }
  return response;
}

export async function listarFarmacias(token: string): Promise<Farmacia[]> {
  const response = await fetch(API_URL, {
    headers: buildHeaders(token),
  });
  handleError(response);
  return response.json();
}

export async function buscarFarmaciaPorId(id: number, token: string): Promise<Farmacia> {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: buildHeaders(token),
  });
  handleError(response);
  return response.json();
}

export async function buscarFarmaciasPorBairro(bairro: string, token: string): Promise<Farmacia[]> {
  const response = await fetch(`${API_URL}/bairro/${encodeURIComponent(bairro)}`, {
    headers: buildHeaders(token),
  });
  handleError(response);
  return response.json();
}

export async function buscarFarmaciasPorCidade(cidade: string, token: string): Promise<Farmacia[]> {
  const response = await fetch(`${API_URL}/cidade/${encodeURIComponent(cidade)}`, {
    headers: buildHeaders(token),
  });
  handleError(response);
  return response.json();
}

export async function criarFarmacia(dados: CriarFarmaciaPayload, token: string): Promise<Farmacia> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: buildHeaders(token),
    body: JSON.stringify(dados),
  });
  handleError(response);
  return response.json();
}

export async function atualizarFarmacia(id: number, dados: AtualizarFarmaciaPayload, token: string): Promise<Farmacia> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: buildHeaders(token),
    body: JSON.stringify(dados),
  });
  handleError(response);
  return response.json();
}

export async function atualizarFarmaciaParcial(id: number, dados: AtualizarFarmaciaPayload, token: string): Promise<Farmacia> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: buildHeaders(token),
    body: JSON.stringify(dados),
  });
  handleError(response);
  return response.json();
}

export async function removerFarmacia(id: number, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  });
  handleError(response);
}
