
interface TagProps {
  label: string
  color?: string
}

export default function Tag({ label, color = 'bg-blue-200' }: TagProps) {
  return (
    <span className={`px-3 py-1 text-sm rounded-full ${color} text-gray-700`}>
      {label}
    </span>
  )
}


/*

exemplo de uso:  

<Tag label="Em análise" />
<Tag label="Entregue" color="bg-green-300" />



*/ 