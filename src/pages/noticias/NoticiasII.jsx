import React, { useState } from 'react';
import BannerTitulo from './components/BannerTitulo';
import Descripcion from '../programa/components/Descripcion';
import LineasEstrategicas from '../programa/components/LineasEstrategicas';
import SeccionActividades from '../programa/components/SeccionActividades';
import CarruselMetodologias from '../programa/components/CarruselMetodologias';
import CarruselInvestigaciones from '../programa/components/CarruselInvestigaciones';
import FormularioDonacion from '../programa/components/FormularioDonacion';
import SerParte from '../programa/components/SerParte';

import noticiasIIData from '../../data/noticiasII.json';

export default function NoticiasII() {
  const [ciudadIndex, setCiudadIndex] = useState(0);
  const ciudadActiva = noticiasIIData.ciudades[ciudadIndex];

  return (
    <main className="flex flex-col grow gap-0">
      <BannerTitulo
        titulo={noticiasIIData.banner.titulo}
        imagen={noticiasIIData.banner.imagenFondo}
      />
      <Descripcion data={noticiasIIData.descripcion} imagen={noticiasIIData.donacion.imagen} />
      <LineasEstrategicas items={noticiasIIData.lineasEstrategicas} />
      <SeccionActividades
        ciudades={noticiasIIData.ciudades}
        ciudadActiva={ciudadIndex}
        onChangeCiudad={setCiudadIndex}
        imagenFallback={noticiasIIData.banner.imagenFondo}
      />
      <CarruselMetodologias items={ciudadActiva.metodologias} />
      <CarruselInvestigaciones items={ciudadActiva.investigaciones} />
      <FormularioDonacion
        data={noticiasIIData.donacion}
        imagen={noticiasIIData.donacion.imagen}
      />
      <SerParte data={noticiasIIData.serParte} />
    </main>
  );
}
