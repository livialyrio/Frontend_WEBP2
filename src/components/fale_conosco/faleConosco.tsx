'use client'

import { useState } from 'react'
import { Headset, X } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function FaleConoscoButton() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const templateParams = {
      from_email: email,
      name: name,
      message: mensagem,
    }

    try {
      await emailjs.send(
        'service_zayczsr',        
        'template_63lvm8o',         
        templateParams,
        'AfkomIwJDfQsyKoRR'      
      )

      setStatus('success')
      setName('')
      setEmail('')
      setMensagem('')
      setTimeout(() => {
        setOpen(false)
        setStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Erro ao enviar:', error)
      setStatus('error')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
      >
        <Headset size={20} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Fale Conosco</h2>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Seu nome"
              className="border px-3 py-2 rounded text-sm"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="border px-3 py-2 rounded text-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Sua mensagem"
              className="border px-3 py-2 rounded text-sm"
              rows={4}
              required
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar'}
            </button>

            {status === 'success' && (
              <p className="text-green-600 text-sm">Mensagem enviada com sucesso!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-sm">Erro ao enviar. Tente novamente.</p>
            )}
          </form>
        </div>
      )}
    </>
  )
}
