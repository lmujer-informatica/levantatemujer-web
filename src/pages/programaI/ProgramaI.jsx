import React from 'react';
import BannerFrases from '../../components/shared/BannerFrases';
import DescripcionPrograma from './components/DescripcionPrograma';
import ActividadesPrograma from './components/ActividadesPrograma';
import TestimoniosPrograma from './components/TestimoniosPrograma';
import MetodologiasPrograma from './components/MetodologiasPrograma';
import InvestigacionesPrograma from './components/InvestigacionesPrograma';
import SerPartePrograma from './components/SerPartePrograma';
import DonacionPrograma from './components/DonacionPrograma';

import programaIData from '../../data/programaI.json';

export default function ProgramaI() {
  return (
    <main className="grow flex flex-col gap-0 page-fade-in">
      <BannerFrases data={programaIData.banner} />
      <DescripcionPrograma data={programaIData.descripcion} />
      <ActividadesPrograma data={programaIData.actividades} />
      <TestimoniosPrograma data={programaIData.testimonios} />
      <MetodologiasPrograma data={programaIData.metodologias} />
      <InvestigacionesPrograma data={programaIData.investigaciones} />
      <SerPartePrograma data={programaIData.serParte} />
      <DonacionPrograma data={programaIData.donacion} />
    </main>
  );
}
