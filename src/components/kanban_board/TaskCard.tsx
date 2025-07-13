interface TaskCardProps {
  title: string
  description: string
}

export default function TaskCard({ title, description }: TaskCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-3">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
