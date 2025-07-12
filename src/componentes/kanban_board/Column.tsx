import TaskCard from './TaskCard'

interface ColumnProps {
  title: string
  tasks: { title: string; description: string }[]
  bgColor: string
}

export default function Column({ title, tasks, bgColor }: ColumnProps) {
  return (
    <div className={`p-4 rounded-lg w-80 shadow-md border border-gray-200 ${bgColor}`}>
      <h3 className="font-bold text-lg mb-4 text-gray-800">{title}</h3>
      {tasks.map((task, idx) => (
        <TaskCard key={idx} {...task} />
      ))}
    </div>
  )
}
