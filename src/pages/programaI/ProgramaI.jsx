import React from 'react';
import BannerPrograma from './components/BannerPrograma';
import DescripcionPrograma from './components/DescripcionPrograma';
import ActividadesPrograma from './components/ActividadesPrograma';
import TestimoniosPrograma from './components/TestimoniosPrograma';
import MetodologiasPrograma from './components/MetodologiasPrograma';
import InvestigacionesPrograma from './components/InvestigacionesPrograma';
import SerPartePrograma from './components/SerPartePrograma';
import DonacionPrograma from './components/DonacionPrograma';

export default function ProgramaI() {
  return (
    <main className="grow flex flex-col gap-0">
      <BannerPrograma />
      <DescripcionPrograma />
      <ActividadesPrograma />
      <TestimoniosPrograma />
      <MetodologiasPrograma />
      <InvestigacionesPrograma />
      <SerPartePrograma />
      <DonacionPrograma />
    </main>
  );
}
