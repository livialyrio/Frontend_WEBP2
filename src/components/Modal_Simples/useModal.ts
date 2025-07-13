import { useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  return { isOpen, open, close }
}


/*

exemplo uso: 

const { isOpen, open, close } = useModal()

<Modal isOpen={isOpen} onClose={close} title="Detalhes da Solicitação">
  <p>Conteúdo do modal...</p>
</Modal>

<button onClick={open}>Abrir Modal</button>


*/