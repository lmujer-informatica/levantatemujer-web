import React from 'react';
import BannerFrases from '../../components/shared/BannerFrases';
import SeccionComic from './components/SeccionComic';
import SeccionDescargables from './components/SeccionDescargables';
import SeccionVideos from './components/SeccionVideos';

import materialData from '../../data/material.json';

export default function Material() {
  const paletaPrevencion = [
    { fondo: '#0DADD4', boton: '#356194' },
    { fondo: '#BACB5E', boton: '#859433' },
    { fondo: '#0DADD4', boton: '#356194' },
  ];
  const paletaInfografias = [
    { fondo: '#BACB5E', boton: '#859433' },
    { fondo: '#0DADD4', boton: '#356194' },
    { fondo: '#BACB5E', boton: '#859433' },
  ];

  return (
    <main className="flex flex-col grow gap-0">
      <BannerFrases data={materialData.banner} />
      <SeccionComic data={materialData.comic} />
      <SeccionDescargables
        data={materialData.prevencion}
        paleta={paletaPrevencion}
        colorTitulo="#2B8EA6"
        colorDescripcion="#356194"
      />
      <SeccionDescargables
        data={materialData.infografias}
        paleta={paletaInfografias}
        colorTitulo="#859433"
        colorDescripcion="#859433"
      />
      <SeccionVideos data={materialData.videos} />
    </main>
  );
}
