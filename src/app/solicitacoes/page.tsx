'use client';
import React, { useState } from 'react';
import NavbarTabs from '@/components/navbar/navbar';
import FaleConoscoButton from '@/components/fale_conosco/faleConosco';
import { Dropdown } from '@/components/ui/Dropdown';
import Button from '@/components/button/Button';
import { Textarea } from '@/components/ui/textarea';

export default function CriarSolicitacao() {
  const [selectedRemedio, setSelectedRemedio] = useState('Remédio');
  const [selectedFarmacia, setSelectedFarmacia] = useState('Farmácia');
  const [receita, setReceita] = useState('');
  const [justificativa, setJustificativa] = useState('');

  const remedios = [
    { label: 'Glifage', onClick: () => { console.log('Selecionou Glifage'); setSelectedRemedio('Glifage'); } },
    { label: 'Dipirona', onClick: () => { console.log('Selecionou Dipirona'); setSelectedRemedio('Dipirona'); } },
    { label: 'Amoxicilina', onClick: () => { console.log('Selecionou Amoxicilina'); setSelectedRemedio('Amoxicilina'); } }
  ];

  const farmacias = [
    { label: 'Av. das americas 4444', onClick: () => { console.log('Selecionou Av. das americas 4444'); setSelectedFarmacia('Av. das americas 4444'); } },
    { label: 'Av. Rio Branco 535', onClick: () => { console.log('Selecionou Av. Rio Branco 535'); setSelectedFarmacia('Av. Rio Branco 535'); } },
    { label: 'Estrada do tindiba 243', onClick: () => { console.log('Selecionou Estrada do tindiba 243'); setSelectedFarmacia('Estrada do tindiba 243'); } }
  ];


  const handleSubmit = () => {
    const payload = {
      remedio: selectedRemedio,
      farmacia: selectedFarmacia,
      receita,
      justificativa,
    };

    console.log('Solicitação enviada:', payload);
    // futura integração com API para enviar a solicitação
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
            <Dropdown label={selectedRemedio} options={remedios} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Farmácia para retirada</label>
            <Dropdown label={selectedFarmacia} options={farmacias} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="receita">
              Receita
            </label>
            <Textarea
              id="receita"
              placeholder="Digite a receita"
              value={receita}
              onChange={(e) => setReceita(e.target.value)}
            />
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
        </div>

        <div className="flex justify-center">
          <Button onClick={handleSubmit}>Criar Solicitação</Button>
        </div>
      </div>
    </main>
  );
}
