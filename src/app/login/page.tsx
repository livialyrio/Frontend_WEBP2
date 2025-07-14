'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Funcionario from '../funcionario/page';

export default function LoginUsuario() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      if(!Funcionario){
      router.push('/usuario'); 
    } else {
      router.push('/funcionario'); 
    }

    }
  }, [router]);

  const redirecionarParaLoginExterno = () => {
    const urlLoginExterno = 'http://localhost:5000/login?redirect=http://localhost:3005/logado';
    window.location.href = urlLoginExterno;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fcff] via-[#dceafd] to-[#9eb8dc] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Login do Usuário</h1>
        <p className="text-gray-700 mb-6">
          Você será redirecionado para o sistema de autenticação do outro grupo.
        </p>
        <button
          onClick={redirecionarParaLoginExterno}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Ir para Login
        </button>
      </div>
    </main>
  );
}
