import React from 'react';
import { ShieldCheck, HeartHandshake, Landmark } from 'lucide-react';
import CarruselBase from './CarruselBase';

const ICONOS = {
  'shield-check': ShieldCheck,
  'heart-handshake': HeartHandshake,
  landmark: Landmark,
};

function TarjetaLinea({ item, indice }) {
  const Icono = ICONOS[item.icono] || ShieldCheck;
  const esCentral = indice === 1;
  const colorFondo = esCentral ? '#BACB5E' : '#15A4C9';
  const colorTexto = esCentral ? '#859433' : '#356194';
  const iconoDer = indice % 2 === 0;

  return (
    <div
      className={`group w-full bg-[#E3FFF8] shadow-md hover:shadow-2xl border-[1px] lg:border-2 overflow-hidden transition-all duration-500 hover:-translate-y-1.5
      /* Móvil: Diseño vertical limpio y espacioso */
      flex flex-col p-5 sm:p-6 rounded-2xl gap-3
      /* Desktop: Diseño horizontal alternado con grandes curvas */
      md:flex-row md:p-0 md:gap-0 md:min-h-[160px] lg:min-h-[195px] xl:min-h-[220px] ${
        iconoDer
          ? 'md:flex-row-reverse md:rounded-l-none md:rounded-r-[75px] lg:rounded-r-[100px]'
          : 'md:rounded-r-none md:rounded-l-[75px] lg:rounded-l-[100px]'
      }`}
      style={{ borderColor: colorTexto }}
    >
      {/* Cabecera en Móvil / Bloque Lateral en Desktop */}
      <div
        className={`flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 shrink-0 justify-start w-full md:w-auto md:py-6 md:px-6 lg:px-10 ${
          iconoDer ? 'md:pl-10 lg:pl-14' : 'md:pr-10 lg:pr-14'
        }`}
      >
        <span
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shrink-0"
          style={{ backgroundColor: colorFondo }}
        >
          <Icono 
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-18 xl:h-18 text-white transition-transform duration-300 group-hover:scale-110" 
            strokeWidth={2} 
          />
        </span>
        <span 
          className="font-montserrat italic font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl transition-all duration-300 md:text-center md:max-w-[200px] lg:max-w-[280px] leading-tight md:leading-snug" 
          style={{ color: colorTexto }}
        >
          {item.titulo}
        </span>
      </div>

      {/* Cuerpo del Texto */}
      <div
        className={`flex-1 min-w-0 text-left md:py-6 md:px-8 lg:px-12 ${
          iconoDer ? 'md:text-left' : 'md:text-right'
        }`}
      >
        <p 
          className="font-poppins font-light text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed md:leading-loose" 
          style={{ color: colorTexto }}
        >
          {item.descripcion}
        </p>
      </div>
    </div>
  );
}

export default function LineasEstrategicas({ items }) {
  return (
    <section 
      id="lineas-estrategicas" 
      className="w-full bg-[#F1FFFF] py-8 sm:py-10 md:py-16 lg:py-24 scroll-mt-6 overflow-hidden"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Encabezado Principal */}
        <h2 
          className="text-center font-montserrat italic font-bold text-xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wide" 
          style={{ color: '#859433' }}
        >
          LÍNEAS ESTRATÉGICAS
        </h2>
        <div 
          className="mx-auto mt-2 md:mt-3 h-[3px] md:h-[4px] lg:h-[5px] w-28 md:w-48 lg:w-64 rounded-full transition-all duration-500" 
          style={{ backgroundColor: '#859433' }} 
        />

        {/* Carrusel de Tarjetas */}
        <div className="mt-6 md:mt-12 lg:mt-16 flex flex-col gap-5 md:gap-8">
          <CarruselBase
            items={items}
            itemsPorPagina={3}
            colorFlechas="#859433"
            vertical
            renderItem={(item, i) => (
              <TarjetaLinea key={item.titulo + i} item={item} indice={i} />
            )}
          />
        </div>

      </div>
    </section>
  );
}