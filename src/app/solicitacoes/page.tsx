'use client';

import React, { useEffect, useState } from 'react';
import NavbarTabs from '@/components/navbar/navbar';
import FaleConoscoButton from '@/components/fale_conosco/faleConosco';
import { Dropdown } from '@/components/ui/Dropdown';
import Button from '@/components/button/Button';
import { Textarea } from '@/components/ui/textarea';

import { listarRemedios, Remedio } from '@/services/remedioService';
import { criarSolicitacao } from '@/services/solicitacoesService';
import { criarReceita } from '@/services/ReceitasService';
import { listarFarmacias, Farmacia } from '@/services/farmaciasService';

export default function CriarSolicitacao() {
  const [remedios, setRemedios] = useState<Remedio[]>([]);
  const [selectedRemedioId, setSelectedRemedioId] = useState<number | null>(null);

  const [farmacias, setFarmacias] = useState<Farmacia[]>([]); 
  const [selectedFarmaciaId, setSelectedFarmaciaId] = useState<number | null>(null); 

  const [justificativa, setJustificativa] = useState('');
  const [receita, setReceita] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token') || '';
  const usuarioId = Number(localStorage.getItem('usuarioId')) || 0;

  useEffect(() => {
    async function fetchRemedios() {
      try {
        const dadosRemedios = await listarRemedios(token);
        setRemedios(dadosRemedios);
      } catch {
        setError('Erro ao carregar remédios');
      }
    }

    async function fetchFarmacias() {  
      try {
        const dadosFarmacias = await listarFarmacias(token);
        setFarmacias(dadosFarmacias);
        if (dadosFarmacias.length > 0) {
          setSelectedFarmaciaId(dadosFarmacias[0].id); 
        }
      } catch {
        setError('Erro ao carregar farmácias');
      }
    }

    fetchRemedios();
    fetchFarmacias();
  }, [token]);

  const remedioOptions = remedios.map((r) => ({
    label: r.nome,
    onClick: () => setSelectedRemedioId(r.remedioId ?? null),
  }));

  const remedioSelecionadoLabel =
    remedios.find((r) => r.remedioId === selectedRemedioId)?.nome ?? 'Remédio';

  const farmaciaOptions = farmacias.map((f) => ({  
    label: `${f.bairro} - ${f.cidade}`,
    onClick: () => setSelectedFarmaciaId(f.id),
  }));

  const farmaciaSelecionadaLabel =
    farmacias.find((f) => f.id === selectedFarmaciaId)
      ? `${farmacias.find((f) => f.id === selectedFarmaciaId)!.bairro} - ${farmacias.find((f) => f.id === selectedFarmaciaId)!.cidade}`
      : 'Farmácia';

  const handleSubmit = async () => {
    if (!selectedRemedioId) {
      alert('Por favor, selecione um remédio');
      return;
    }
    if (!selectedFarmaciaId) { 
      alert('Por favor, selecione uma farmácia');
      return;
    }
    if (!justificativa.trim()) {
      alert('Por favor, informe a justificativa');
      return;
    }
    if (!receita.trim()) {
      alert('Por favor, informe a receita');
      return;
    }
    if (!usuarioId) {
      alert('Usuário não autenticado');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payloadSolicitacao = {
        usuarioId,
        remedioId: selectedRemedioId,
        farmaciaId: selectedFarmaciaId, 
        justificativa,
      };

      const solicitacaoCriada = await criarSolicitacao(payloadSolicitacao, token);

      await criarReceita(
        { descricao: receita, solicitacaoId: solicitacaoCriada.id },
        token
      );

      alert('Solicitação e receita criadas com sucesso!');

      setSelectedRemedioId(null);
      setSelectedFarmaciaId(farmacias.length > 0 ? farmacias[0].id : null); 
      setJustificativa('');
      setReceita('');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar solicitação e receita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-r from-white to-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 text-2xl font-bold">CefetFarma</div>
          </div>
          <div className="flex-1 mx-8">
            <input
              type="text"
              placeholder="Pesquisar "
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none placeholder-[#9eb8dc]"
            />
          </div>
          <div className="flex items-center gap-4">
            <a
              href="http://localhost:5000/login?redirect=http://localhost:3005"
              className="text-sm text-gray-700 hover:underline"
            >
              Entrar / Cadastrar
            </a>
            <FaleConoscoButton />
          </div>
        </div>
        <NavbarTabs />
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Remédio</label>
            <Dropdown label={remedioSelecionadoLabel} options={remedioOptions} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Farmácia para retirada</label>
            <Dropdown label={farmaciaSelecionadaLabel} options={farmaciaOptions} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="justificativa">
              Justificativa
            </label>
            <Textarea
              id="justificativa"
              placeholder="Digite a justificativa"
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="receita">
              Receita
            </label>
            <Textarea
              id="receita"
              placeholder="Digite a descrição da receita"
              value={receita}
              onChange={(e) => setReceita(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Enviando...' : 'Criar Solicitação'}
          </Button>
        </div>

        {/* Erro */}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </main>
  );
}
