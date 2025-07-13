'use client'

import { useModal } from '@/components/Modal_Simples/useModal'
import Modal from '@/components/Modal_Simples/Modal'
import Tag from '@/components/tag/Tag'
import KanbanBoard from '@/components/kanban_board/KanbanBoard'

import { InputTexto } from "@/components/ui/InputText";
import { Dropdown } from "@/components/ui/Dropdown";
import { WizardForm } from "@/components/ui/WizardForm";
import { useState } from 'react'

import { FuncionarioDashboard } from "@/components/dashboard/FuncionarioDashboard";
export default function TestePage() {
  const { isOpen, open, close } = useModal()
  const [nome, setNome] = useState("");

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">Página de Teste dos Componentes</h1>

      {/* Tag */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Componente: Tag</h2>
        <div className="flex gap-3">
          <Tag label="Em análise" />
          <Tag label="Aprovado" color="bg-green-300" />
          <Tag label="Rejeitado" color="bg-red-300" />
        </div>
      </div>

      {/* Modal */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Componente: Modal</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={open}
        >
          Abrir Modal
        </button>

        <Modal isOpen={isOpen} onClose={close} title="Modal de Teste">
          <p>Esse é um conteúdo dentro do modal!</p>
        </Modal>
      </div>

      {/* Kanban */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Componente: KanbanBoard</h2>
        <KanbanBoard />
      </div>

       {/* InputTexto */}
        <div>
          <label className="block mb-2 font-semibold">InputTexto</label>
          <InputTexto
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <p className="mt-2 text-sm text-gray-600">Você digitou: <strong>{nome}</strong></p>
        </div>

        {/* Dropdown */}
        <div>
          <label className="block mb-2 font-semibold">Dropdown</label>
          <Dropdown
            label="Opções"
            options={[
              { label: "Editar", onClick: () => alert("Editar clicado") },
              { label: "Excluir", onClick: () => alert("Excluir clicado") },
            ]}
          />
        </div>

        {/* WizardForm */}
        <div>
          <label className="block mb-2 font-semibold">WizardForm</label>
          <WizardForm />
        </div>

        {/* Dashboard do Funcionário */}
              <section>
                <h2 className="text-lg font-semibold mb-2">Componente: Dashboard Funcionário</h2>
                <FuncionarioDashboard />
              </section>
            </main>
  )
}
