import React, { useState, useEffect } from 'react';

const banners = [
  {
    img: '/imagem-doação.png',
    alt: 'Banner 1',
    texto: 'Somos uma instituição sem fins lucrativos que realiza doações de medicamentos. Já nos ajudamos milhares de pessoas a terem acesso a medicamentos essenciais. Junte-se a nós nessa missão!',
  },
  {
    img: '/palmirinha-recebendo-doação.png',
    alt: 'Banner 2',
    texto: 'Quem pode solicitar? Qualquer pessoa que necessite de medicamentos e não tenha condições financeiras para adquiri-los. Basta preencher o formulário de solicitação em nosso site.',
  },
  {
    img: 'pepita2.png',
    alt: 'Banner 3',
    texto: 'Ainda não fez sua solicitação? Não perca tempo! Estamos aqui para ajudar você a ter acesso aos medicamentos que precisa, preencha o formulário para criar sua soplcitação',

  },
];

export default function BannerRotativo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prevBanner = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextBanner = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

return (
  <div className="flex flex-col md:flex-row items-start gap-8 max-w-full px-4"> 

      <div
        className="relative flex-shrink-0" 
        style={{ width: 700, height: 350, minWidth: 700 }} 
      >
    {/* Botão seta esquerda */}
    <button
      onClick={prevBanner}
      className="absolute left-2 z-10 bg-white/70 rounded-full p-2 hover:bg-white shadow"
      aria-label="Anterior"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      <img src="/right 2.png" alt="Seta Esquerda" className="w-6 h-6" />
    </button>

    <img
      src={banners[index].img}
      alt={banners[index].alt}
      className="rounded shadow object-cover w-full h-full" 
      style={{ width: 700, height: 350 }} 
    />

    {/* Botão seta direita */}
    <button
      onClick={nextBanner}
      className="absolute right-2 z-10 bg-white/70 rounded-full p-2 hover:bg-white shadow"
      aria-label="Próximo"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      <img src="/right 1.png" alt="Seta Direita" className="w-6 h-6" />
    </button>
    </div> 

  <div className="flex-grow max-w-[calc(100vw-720px)] text-left"> 
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Sobre a iniciativa</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{banners[index].texto}</p>
      </div> 
    </div>
);
}