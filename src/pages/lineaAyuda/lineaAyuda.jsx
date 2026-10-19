import React from 'react';

import BannerFrases from '../../components/shared/BannerFrases';
import NumerosContacto from './components/NumerosContacto';
import FormularioEmergencia from './components/FormularioEmergencia';
import PasosDenuncia from './components/PasosDenuncia';

import lineaAyudaData from '../../data/lineaAyuda.json';

export default function LineaAyuda() {
  return (
    <main className="flex-grow flex flex-col gap-0 bg-lm-bg">
      <BannerFrases data={lineaAyudaData.banner} />
      <NumerosContacto data={lineaAyudaData.contactos} />
      <FormularioEmergencia />
      <PasosDenuncia data={lineaAyudaData.denuncias} />
    </main>
  );
}
