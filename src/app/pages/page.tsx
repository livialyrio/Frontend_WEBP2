'use client';

import BannerRotativo from '@/components/banner/BannerRotativo';
import Button from '@/components/button/Button';
import CardProduto from '@/components/card/CardProduto';
import TabelaFiltros from '@/components/tabela/TabelaFiltros';
import React from 'react';

export default function TesteComponentes() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <TabelaFiltros data={[]} columns={[]} />
      <CardProduto />
      <Button children={undefined} />
      <BannerRotativo/>
    </div>
  );
}