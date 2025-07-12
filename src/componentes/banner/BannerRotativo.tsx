import React, { useState, useEffect } from 'react';

const banners = [
  {
    img: '/imagem-doação.png',
    alt: 'Banner 1',
  },
  {
    img: '/palmirinha-recebendo-doação.png',
    alt: 'Banner 2',
  },
  {
    img: 'pepita2.png',
    alt: 'Banner 3',
  },
];

export default function BannerRotativo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevBanner = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextBanner = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

return (
  <div
    className="relative mx-auto flex items-center"
    style={{ width: 500, height: 250, maxWidth: '100%' }} // width maior aqui!
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
      className="rounded shadow object-cover"
      style={{ width: 500, height: 250, maxWidth: '100%' }} // width maior aqui também!
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

    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
      {banners.map((_, i) => (
        <button
          key={i}
          className={`w-3 h-3 rounded-full ${i === index ? 'bg-blue-600' : 'bg-gray-300'}`}
          onClick={() => setIndex(i)}
          aria-label={`Ir para banner ${i + 1}`}
        />
      ))}
    </div>
  </div>
);
}