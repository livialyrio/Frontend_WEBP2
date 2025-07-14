'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import { InputTexto } from '@/components/ui/InputText';

export default function CadastroUsuario() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [funcionario, setFuncionario] = useState(false);
  const [dataNascimento, setDataNascimento] = useState('');
  const [farmaciaId, setFarmaciaId] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleCadastro = async () => {
    setErro('');
    setSucesso('');

    const payload: any = {
      nome,
      cpf,
      email,
      funcionario,
      senha,
    };

    if (dataNascimento) payload.dataNascimento = dataNascimento;
    if (farmaciaId) payload.farmaciaId = Number(farmaciaId);

    try {
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || 'Erro ao cadastrar usuário.');
        return;
      }

      setSucesso('Cadastro realizado com sucesso!');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Cadastro</h1>

        {erro && <p className="text-red-600 mb-4 text-sm">{erro}</p>}
        {sucesso && <p className="text-green-600 mb-4 text-sm">{sucesso}</p>}

        <InputTexto
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mb-4"
        />

        <InputTexto
          type="text"
          placeholder="CPF (somente números)"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="mb-4"
        />

        <InputTexto
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <InputTexto
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mb-4"
        />

        <InputTexto
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          className="mb-4"
        />

        <InputTexto
          type="number"
          placeholder="Farmácia ID (opcional)"
          value={farmaciaId}
          onChange={(e) => setFarmaciaId(e.target.value)}
          className="mb-4"
        />

        <div className="flex items-center justify-start gap-2 mb-6">
          <input
            type="checkbox"
            id="funcionario"
            checked={funcionario}
            onChange={(e) => setFuncionario(e.target.checked)}
          />
          <label htmlFor="funcionario" className="text-gray-700 text-sm">
            É funcionário?
          </label>
        </div>

        <Button onClick={handleCadastro} className="w-full mb-3">Cadastrar</Button>
        <Button onClick={() => router.back()} className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400">
          Voltar
        </Button>

        <p className="mt-4 text-sm text-gray-600">
          Já tem uma conta?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Entrar
          </span>
        </p>
      </div>
    </main>
  );
}
