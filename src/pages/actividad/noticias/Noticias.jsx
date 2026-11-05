import React from 'react';
import BannerFrases from '../../../components/shared/BannerFrases';
import NoticiasGrid from './components/NoticiasGrid';

import actividadNoticiasData from '../../../data/actividadNoticias.json';
import noticiasData from '../../../data/noticias.json';

export default function Noticias() {
  return (
    <main className="grow flex flex-col gap-0">
      <BannerFrases
        data={{ frases: noticiasData.heroFrases, imagenFondo: noticiasData.heroImagen }}
      />
      <NoticiasGrid data={actividadNoticiasData} />
    </main>
  );
}