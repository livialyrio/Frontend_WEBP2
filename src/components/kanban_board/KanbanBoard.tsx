import Column from './Column'

export default function KanbanBoard() {
  const mockData = {
    'Pendente': [
      { title: 'Analisar Solicitação', description: 'Verificar estoque' },
      { title: 'Confirmar Receita', description: 'Validar com médico' }
    ],
    'Em andamento': [
      { title: 'Separar Medicamentos', description: 'Doação confirmada' }
    ],
    'Finalizado': [
      { title: 'Entrega realizada', description: 'Paciente recebeu' }
    ]
  }

  const columnColors: Record<string, string> = {
    'Pendente': 'bg-yellow-50',
    'Em andamento': 'bg-blue-50',
    'Finalizado': 'bg-green-50'
  }

  return (
    <div className="flex gap-6 overflow-x-auto p-4 bg-gray-100 rounded-md">
      {Object.entries(mockData).map(([status, tasks]) => (
        <Column
          key={status}
          title={status}
          tasks={tasks}
          bgColor={columnColors[status] || 'bg-white'}
        />
      ))}
    </div>
  )
}
