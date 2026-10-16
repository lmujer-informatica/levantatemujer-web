import React, { useState } from 'react';
import BannerFrases from '../../components/shared/BannerFrases';
import Descripcion from './components/Descripcion';
import LineasEstrategicas from './components/LineasEstrategicas';
import SeccionActividades from './components/SeccionActividades';
import CarruselMetodologias from './components/CarruselMetodologias';
import CarruselInvestigaciones from './components/CarruselInvestigaciones';
import FormularioDonacion from './components/FormularioDonacion';
import SerParte from './components/SerParte';

import programaIIData from '../../data/programaII.json';

export default function ProgramaII() {
  const [ciudadIndex, setCiudadIndex] = useState(0);
  const ciudades = programaIIData.ciudades ?? [];
  const indiceSeguro = Math.min(ciudadIndex, Math.max(ciudades.length - 1, 0));
  const ciudadActiva = ciudades[indiceSeguro] ?? { actividades: [], metodologias: [], investigaciones: [] };
  const donacion = programaIIData.donacion ?? {};
  const banner = programaIIData.banner ?? {};

  return (
    <main className="flex flex-col grow gap-0">
      <BannerFrases data={banner} />

      <Descripcion
        data={programaIIData.descripcion}
        imagen={donacion.imagen}
      />

      {/* Identificador para Scroll de Líneas Estratégicas */}
      <div id="lineas-estrategicas">
        <LineasEstrategicas items={programaIIData.lineasEstrategicas} />
      </div>

      {/* Identificador para Scroll de Actividades */}
      <div id="seccion-actividades">
        <SeccionActividades
          ciudades={ciudades}
          ciudadActiva={indiceSeguro}
          onChangeCiudad={setCiudadIndex}
          imagenFallback={banner.imagenFondo}
        />
      </div>

      <CarruselMetodologias items={ciudadActiva.metodologias} />
      <CarruselInvestigaciones items={ciudadActiva.investigaciones} />
      <FormularioDonacion
        data={donacion}
        imagen={donacion.imagen}
      />
      <SerParte data={programaIIData.serParte} />
    </main>
  );
}