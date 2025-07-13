import CadastroUsuario from '@/components/fomulario_Cadastro/cadastro_usuario'

export default function Page() {
  return (

      <main className="min-h-screen bg-gray-50 font-sans">
      {/* Top bar */}
      <header className="bg-gradient-to-r from-white to-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 text-2xl font-bold">CefetFarma</div>
          </div>
        </div>
      </header>
      <CadastroUsuario />
     </main>
   
   
    )
  }
