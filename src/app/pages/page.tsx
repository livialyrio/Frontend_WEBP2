'use client';

import BannerRotativo from '@/componentes/banner/BannerRotativo';
import Button from '@/componentes/button/Button';
import CardProduto from '@/componentes/card/CardProduto';
import TabelaFiltros from '@/componentes/tabela/TabelaFiltros';
import React from 'react';

export default function TesteComponentes() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <TabelaFiltros />
      <CardProduto />
      <Button />
      <BannerRotativo/>
    </div>
  );
}