import React from 'react';
import BannerNoticias from './components/BannerNoticias';
import NoticiasGrid from './components/NoticiasGrid';

export default function Noticias() {
  return (
    <main className="grow flex flex-col gap-0">
      <BannerNoticias />
      <NoticiasGrid />
    </main>
  );
}
