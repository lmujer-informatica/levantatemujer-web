import React from 'react';
import BannerFrases from '../../components/shared/BannerFrases';
import SeccionComic from './components/SeccionComic';
import SeccionDescargables from './components/SeccionDescargables';
import SeccionVideos from './components/SeccionVideos';

import materialData from '../../data/material.json';

export default function Material() {
  return (
    <main className="flex flex-col grow gap-0">
      <BannerFrases data={materialData.banner} />
      <SeccionComic data={materialData.comic} />
      <SeccionDescargables
        data={materialData.prevencion}
        colorTitulo="#2B8EA6"
        colorDescripcion="#356194"
      />
      <SeccionDescargables
        data={materialData.infografias}
        colorTitulo="#859433"
        colorDescripcion="#859433"
      />
      <SeccionVideos data={materialData.videos} />
    </main>
  );
}
