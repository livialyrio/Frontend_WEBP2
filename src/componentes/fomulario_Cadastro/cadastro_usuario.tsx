'use client'

import React, { useState } from 'react'

export default function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    nascimento: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('Dados enviados:', form)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fcff] via-[#dceafd] to-[#9eb8dc]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 p-8 rounded-md shadow-md w-full max-w-xl backdrop-blur-sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Nome:</label>
            <input
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">CPF:</label>
            <input
              name="cpf"
              type="text"
              placeholder="123.456.789-10"
              value={form.cpf}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-5 py-2 italic text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Data de nascimento:</label>
            <input
              name="nascimento"
              type="date"
              value={form.nascimento}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Telefone:</label>
            <input
              name="telefone"
              type="text"
              value={form.telefone}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">E-mail:</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Senha:</label>
            <input
              name="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Confirme a senha:</label>
            <input
              name="confirmarSenha"
              type="password"
              value={form.confirmarSenha}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-50 py-2"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-100 text-gray-800 px-6 py-2 rounded border border-gray-300 hover:bg-gray-200"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
