import React from 'react';
import BannerFrases from '../../components/shared/BannerFrases';
import Identidad from './components/Identidad';
import Valores from './components/Valores';
import Equipo from './components/Equipo';

import quienesSomosData from '../../data/quienesSomos.json';

export default function QuienesSomos() {
  return (
    <main className="grow flex flex-col gap-0">
      <BannerFrases data={quienesSomosData.banner} />
      <Identidad data={quienesSomosData.identidad} />
      <Valores data={quienesSomosData.valores} />
      <Equipo data={quienesSomosData.equipo} />
    </main>
  );
}
