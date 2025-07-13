'use client';

import { useState } from 'react';
import { Dropdown } from '@/components/ui/Dropdown';
import { InputTexto } from '@/components/ui/InputText';
import Modal from '@/components/Modal_Simples/Modal';
import Tag from '@/components/tag/Tag';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button'; 

export default function GerenciarEstoque() {
  const [filtroNome, setFiltroNome] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const router = useRouter();
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">Gerenciar Estoques</h1>
          <Button onClick={() => router.push('/funcionario')}>
        Voltar
      </Button>
          <button
            onClick={() => setModalAberto(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            
            + Adicionar Estoque
          </button>
        </header>

        <section className="mb-4 flex gap-4 items-center flex-wrap">
          <InputTexto
            value={filtroNome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiltroNome(e.target.value)}
            placeholder="Filtrar por nome do medicamento"
          />

          <Dropdown
            label="Filtrar por status"
            options={[
              { label: 'Disponível', onClick: () => console.log('Disponível') },
              { label: 'Baixo', onClick: () => console.log('Baixo') },
              { label: 'Esgotado', onClick: () => console.log('Esgotado') },
            ]}
          />
        </section>

        <section className="bg-white shadow rounded-lg overflow-x-auto p-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="text-blue-800">
              <tr>
                <th>Medicamento</th>
                <th>Farmácia</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#f4f7fc]">
                <td>Paracetamol</td>
                <td>Farmácia Central</td>
                <td>150</td>
                <td>
                  <Tag label="Disponível" color="verde" />
                </td>
                <td>
                  <button onClick={() => setModalAberto(true)} className="text-blue-600 hover:underline">
                    Editar
                  </button>
                </td>
              </tr>
              <tr className="bg-[#f4f7fc]">
                <td>Ibuprofeno</td>
                <td>Farmácia Zona Sul</td>
                <td>10</td>
                <td>
                  <Tag label="Baixo" color="amarelo" />
                </td>
                <td>
                  <button onClick={() => setModalAberto(true)} className="text-blue-600 hover:underline">
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Editar Estoque">
        <form className="space-y-4">
          <InputTexto placeholder="Medicamento" />
          <InputTexto placeholder="Farmácia" />
          <InputTexto placeholder="Quantidade" type="number" />
          <Dropdown
            label="Status"
            options={[
              { label: 'Disponível', onClick: () => console.log('Status: Disponível') },
              { label: 'Baixo', onClick: () => console.log('Status: Baixo') },
              { label: 'Esgotado', onClick: () => console.log('Status: Esgotado') },
            ]}
          />
          <div className="flex justify-end">
             
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
