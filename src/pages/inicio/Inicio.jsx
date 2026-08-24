import React from 'react';
import SeccionHero from './components/SeccionHero';
import NuestrosAlcances from './components/NuestrosAlcances';
import ProgramasPrioritarios from './components/ProgramasPrioritarios';
import NuestroTrabajo from './components/NuestroTrabajo';
import LineaAyuda from './components/LineaAyuda';

export default function Inicio() {
  return (
    
      <main className="flex-grow flex flex-col gap-0">
        <SeccionHero />
        <NuestrosAlcances />
        <ProgramasPrioritarios />
        <NuestroTrabajo />
        <LineaAyuda />
      </main>

  );
}
