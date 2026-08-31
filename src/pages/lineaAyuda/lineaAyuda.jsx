import React from 'react';

import CarruselFrases from './components/CarruselFrases';
import NumerosContacto from './components/NumerosContacto';
import FormularioEmergencia from './components/FormularioEmergencia';
import PasosDenuncia from './components/PasosDenuncia';

import lineaAyudaData from '../../data/lineaAyuda.json';

export default function LineaAyuda() {
  return (
    <main className="flex-grow flex flex-col gap-0 bg-lm-bg">
      <CarruselFrases data={lineaAyudaData.carrusel} />
      <NumerosContacto data={lineaAyudaData.contactos} />
      <FormularioEmergencia />
      <PasosDenuncia data={lineaAyudaData.denuncias} />
    </main>
  );
}
