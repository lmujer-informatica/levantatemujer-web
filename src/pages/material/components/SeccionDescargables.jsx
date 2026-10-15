import React from 'react';
import SectionHeader from './SectionHeader';
import TarjetaMaterial from './TarjetaMaterial';

export default function SeccionDescargables({ data, colorTitulo, colorDescripcion }) {
  return (
    <section className="w-full bg-[#EFFFFB] py-8 md:py-14">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          titulo={data.titulo}
          descripcion={data.descripcion}
          colorTitulo={colorTitulo}
          colorDescripcion={colorDescripcion}
        />
        <div className="mt-6 md:mt-10 flex md:grid md:grid-cols-3 gap-3 md:gap-8 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none pb-2 md:pb-0 touch-pan-x">
          {data.items.map((item, i) => (
            <TarjetaMaterial key={item.titulo + i} item={item} retraso={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
