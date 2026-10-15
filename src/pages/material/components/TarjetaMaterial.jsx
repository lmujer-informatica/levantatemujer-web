import React from 'react';
import Reveal from './Reveal';

export default function TarjetaMaterial({ item, variante = 'plana', retraso = 0 }) {
  const esComic = variante === 'comic';
  const radioTarjeta = esComic
    ? 'rounded-t-[20px] rounded-b-[10px]'
    : 'rounded-[15px]';
  const radioPozo = esComic ? 'rounded-t-[20px]' : 'rounded-[15px]';

  return (
    <Reveal retraso={retraso} className="min-w-[140px] flex-1 snap-center md:min-w-0">
      <article
        className={`${radioTarjeta} shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-2 md:p-4 flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0px_8px_14px_rgba(0,0,0,0.30)]`}
        style={{ backgroundColor: item.colorFondo }}
      >
        <div className={`w-full ${radioPozo} bg-white p-1.5 md:p-2`}>
          <img
            src={item.imagen}
            alt={item.titulo}
            loading="lazy"
            className="w-full aspect-square object-cover rounded-[10px] md:rounded-[12px]"
          />
        </div>
        <h3 className="mt-1.5 md:mt-3 text-center text-[#F1FFFF] font-poppins font-medium text-xs md:text-lg leading-snug">
          {item.titulo}
        </h3>
        <a
          href={item.archivo}
          download
          className="mt-1.5 md:mt-3 rounded-[10px] px-4 md:px-8 py-0.5 md:py-1.5 text-white font-poppins font-medium text-[10px] md:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ backgroundColor: item.colorBoton }}
        >
          Descargar
        </a>
      </article>
    </Reveal>
  );
}
