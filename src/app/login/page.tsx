'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/button/Button';
import { InputTexto } from '@/components/ui/InputText';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [tipo, setTipo] = useState<'usuario' | 'funcionario'>('usuario');

  const handleLogin = async () => {
    setErro('');

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        setErro('E-mail ou senha inválidos');
        return;
      }

      const data = await res.json();

      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('tipo_usuario', data.tipo);

      if (data.tipo === 'funcionario') {
        router.push('/funcionario');
      } else {
        router.push('/usuario');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-blue-900 text-center">Login</h1>

        {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <InputTexto
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <InputTexto
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center gap-4 mb-6 justify-center">
          <label className="text-sm">
            <input
              type="radio"
              name="tipo"
              value="usuario"
              checked={tipo === 'usuario'}
              onChange={() => setTipo('usuario')}
              className="mr-1"
            />
            Usuário
          </label>

          <label className="text-sm">
            <input
              type="radio"
              name="tipo"
              value="funcionario"
              checked={tipo === 'funcionario'}
              onChange={() => setTipo('funcionario')}
              className="mr-1"
            />
            Funcionário
          </label>
        </div>

        <Button onClick={handleLogin} className="w-full mb-3">Entrar</Button>
        <Button onClick={() => router.back()} className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400">
          Voltar
        </Button>
      </div>
    </main>
  );
}
