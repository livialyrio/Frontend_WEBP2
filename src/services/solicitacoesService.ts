export interface SolicitacaoDto {
  usuarioId: number;
  remedioId: number;
  farmaciaId: number;
  justificativa: string;
}


const BASE_URL = 'http://localhost:3005/solicitacoes';

export async function listarSolicitacoes() {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error('Erro ao listar solicitações');
  return res.json();
}

export async function buscarSolicitacaoPorId(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Solicitação não encontrada');
  return res.json();
}

export async function criarSolicitacao(dados: SolicitacaoDto) {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error('Erro ao criar solicitação');
  return res.json();
}

export async function atualizarSolicitacao(id: number, dados: Partial<SolicitacaoDto>) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error('Erro ao atualizar solicitação');
  return res.json();
}

export async function removerSolicitacao(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao remover solicitação');
  return res.json();
}

export async function listarHistoricoSolicitacoes() {
  const res = await fetch(`${BASE_URL}/historico`);
  if (!res.ok) throw new Error('Erro ao buscar histórico');
  return res.json();
}
