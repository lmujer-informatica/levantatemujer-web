import React from 'react';
import Reveal from './Reveal';

export default function DescripcionPrograma({ data = {} }) {
  return (
    <section className="relative w-full bg-[#F1FFFF] py-8 md:py-12 lg:py-24 overflow-hidden">
      {/* Decorativo pegado al borde izquierdo, solo desktop — no toca los márgenes del contenido */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="h-64 w-2 rounded-r-full bg-lm-olive/70" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="h-64 w-2 rounded-l-full bg-[#15A4C9]/50" />
      </div>

      <div className="max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-14 items-stretch">

          {/* Left: Program description */}
          <Reveal className="flex-1 flex flex-col gap-4 lg:gap-6">
            {/* Title */}
            <h2 className="text-[#15A4C9] font-medium text-xl md:text-2xl lg:text-4xl xl:text-5xl italic">
              {data.titulo}
            </h2>

            {/* Separator line */}
            <div className="w-full h-px lg:h-0.5 bg-[#15A4C9]/40" />

            {/* Body text */}
            {(data.parrafos ?? []).map((parrafo, i) => (
              <Reveal key={i} retraso={i * 120}>
                <p className="text-[#407178] text-sm md:text-base lg:text-xl xl:text-2xl leading-relaxed lg:leading-relaxed max-w-[75ch]">
                  {parrafo}
                </p>
              </Reveal>
            ))}
          </Reveal>

          {/* Right: Navigation cards to Servicios and Testimonios */}
          <Reveal retraso={150} className="flex flex-col gap-4 lg:gap-6 min-w-[200px] md:min-w-[240px] lg:min-w-[320px]">
            {/* Servicios card */}
            <div className="group flex items-center gap-3 lg:gap-5 bg-[#EFFFF7] rounded-2xl p-4 lg:p-7 shadow-sm border border-[#d0f5e8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-lm-olive flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="6" />
                </svg>
              </div>
              <span className="text-lm-olive font-medium text-lg lg:text-2xl">Servicios</span>
            </div>

            {/* Testimonios card */}
            <div className="group flex items-center gap-3 lg:gap-5 bg-[#E3FFF8] rounded-2xl p-4 lg:p-7 shadow-sm border border-[#b0e8dc] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#15A4C9] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="6" />
                </svg>
              </div>
              <span className="text-[#15A4C9] font-medium text-lg lg:text-2xl">Testimonios</span>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
