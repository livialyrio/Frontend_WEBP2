'use client' 

import { useState } from 'react'
import { X } from 'lucide-react' 

type AlertProps = {
  children: React.ReactNode
  variant?: 'warning' | 'error' | 'success'
}

const alertStyles = {
  warning: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700',
  error: 'bg-red-100 border-l-4 border-red-500 text-red-700',
  success: 'bg-green-100 border-l-4 border-green-500 text-green-700',
}

export default function Alert({ children, variant = 'warning' }: AlertProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className={`${alertStyles[variant]} p-4 rounded-md relative`}>
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-inherit hover:text-black/60 transition"
        aria-label="Fechar alerta"
      >
        <X size={18} />
      </button>
      <p>{children}</p>
    </div>
  )
}
