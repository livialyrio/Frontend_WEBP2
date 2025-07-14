const API_URL = 'http://localhost:3001/solicitacoes';

export interface Solicitacao {
  id: number;
  usuarioId: number;
  remedioId: number;
  farmaciaId: number;
  justificativa: string;
  dataCriacao: string;
}

export interface CriarSolicitacaoPayload {
  usuarioId: number;
  remedioId: number;
  farmaciaId: number;
  justificativa: string;
}

function buildHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function listarSolicitacoes(token: string) {
  const response = await fetch(API_URL, {
    headers: buildHeaders(token), 
  });
  if (!response.ok) throw new Error('Erro ao listar solicitações');
  return response.json();
}

export async function criarSolicitacao(
  dados: CriarSolicitacaoPayload,
  token: string
) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: buildHeaders(token), 
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error('Erro ao criar solicitação');
  return response.json();
}

export async function buscarSolicitacaoPorId(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: buildHeaders(token), 
  });
  if (!response.ok) throw new Error('Erro ao buscar solicitação por ID');
  return response.json();
}

export async function atualizarSolicitacao(
  id: number,
  dados: Partial<CriarSolicitacaoPayload>,
  token: string
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: buildHeaders(token), 
    body: JSON.stringify(dados),
  });
  if (!response.ok) throw new Error('Erro ao atualizar solicitação');
  return response.json();
}

export async function removerSolicitacao(id: number, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  });
  if (!response.ok && response.status !== 204)
    throw new Error('Erro ao remover solicitação');
  return { sucesso: true };
}

export async function listarHistoricoSolicitacoes(token: string) {
  const response = await fetch(`${API_URL}/historico`, {
    headers: buildHeaders(token), 
  });
  if (!response.ok) throw new Error('Erro ao listar histórico de solicitações');
  return response.json();
}