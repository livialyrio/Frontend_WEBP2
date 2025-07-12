'use client'

import { useModal } from '@/componentes/Modal_Simples/useModal'
import Modal from '@/componentes/Modal_Simples/Modal'
import Tag from '@/componentes/tag/Tag'
import KanbanBoard from '@/componentes/kanban_board/KanbanBoard'

export default function TestePage() {
  const { isOpen, open, close } = useModal()

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
    </main>
  )
}
