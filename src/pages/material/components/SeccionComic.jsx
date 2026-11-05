import React from 'react';
import SectionHeader from './SectionHeader';
import TarjetaMaterial from './TarjetaMaterial';
import Reveal from './Reveal';

export default function SeccionComic({ data = {} }) {
  const paletaComic = { fondo: '#BACB5E', boton: '#0DADD4' };
  return (
    <section className="w-full bg-[#EFFFFB] pt-8 md:pt-14 overflow-hidden">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="flex-1 min-w-0">
            <SectionHeader
              titulo={data.titulo}
              descripcion={data.descripcion}
              colorTitulo="#356194"
              colorDescripcion="#356194"
              alineacion="left"
            />
            <div className="mt-4 md:mt-6 flex gap-3 md:gap-6 relative z-10 -mb-8 md:-mb-14 max-w-md md:max-w-lg">
              {(data.items ?? []).map((item, i) => (
                <TarjetaMaterial
                  key={item.titulo + i}
                  item={item}
                  paleta={paletaComic}
                  variante="comic"
                  retraso={i * 120}
                />
              ))}
            </div>
          </div>
          <Reveal className="hidden sm:block shrink-0 mx-auto md:mx-0 pb-10 md:pb-14">
            <img
              src={data.ilustracion}
              alt="Ilustración Cómic Anita"
              loading="lazy"
              className="animate-flotar w-36 md:w-72 lg:w-80 aspect-square object-cover rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-4 border-white"
            />
          </Reveal>
        </div>
      </div>
      <div className="w-full h-10 md:h-20 bg-[#0DADD4]" />
    </section>
  );
}
