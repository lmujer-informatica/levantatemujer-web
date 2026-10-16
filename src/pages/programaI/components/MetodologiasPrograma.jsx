import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const LIGHT_ACCENT = '#859430';
const LIGHT_TEXT = '#294409';
const FEATURED_BG = '#BACB5E';
const FEATURED_TEXT = '#F1FFFF';
const DOWNLOAD_BG = '#859433';

export default function MetodologiasPrograma({ data = {} }) {
  const items = data.items ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (items.length === 0) return null;

  const prev = () => setCurrentIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setCurrentIndex((i) => (i + 1) % items.length);

  // Show 3 cards, rotating from currentIndex
  const visibleCards = [
    items[currentIndex % items.length],
    items[(currentIndex + 1) % items.length],
    items[(currentIndex + 2) % items.length],
  ];

  return (
    <section className="relative w-full bg-[#EFFFFA] py-8 md:py-12 lg:py-24 overflow-hidden">
      {/* Decorativo pegado al borde derecho, solo desktop */}
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-16 hidden lg:block">
        <div className="h-48 w-2 rounded-l-full bg-lm-olive/60" />
      </div>

      <div className="max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <Reveal>
          <div className="bg-lm-olive py-2 lg:py-5 px-4 lg:px-8 mb-8 lg:mb-14 flex items-center justify-center rounded-sm">
            <h2 className="italic font-medium text-[#E3FFF8] text-xl md:text-3xl lg:text-5xl tracking-wide text-center">
              METODOLOGÍAS DE PREVENCIÓN
            </h2>
          </div>
        </Reveal>

        {/* Cards carousel */}
        <Reveal retraso={100}>
          <div className="flex items-center gap-3 lg:gap-8">

            {/* Prev arrow */}
            <button
              onClick={prev}
              className="shrink-0 w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Anterior metodología"
            >
              <ChevronLeft className="w-5 h-5 lg:w-7 lg:h-7" />
            </button>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-10 flex-1">
              {visibleCards.map((card, idx) => {
                if (card.descargable) {
                  return (
                    /* Featured downloadable card */
                    <div
                      key={`${card.titulo}-${idx}`}
                      className="rounded-2xl lg:rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 lg:p-12 gap-4 lg:gap-6 min-h-[220px] lg:min-h-[380px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                      style={{ backgroundColor: FEATURED_BG }}
                    >
                      {/* Inner bordered box */}
                      <div className="w-4/5 h-16 lg:h-28 border-2 border-white/60 rounded-lg" />

                      <h3 className="text-xl lg:text-3xl font-medium italic text-center" style={{ color: FEATURED_TEXT }}>
                        {card.titulo}
                      </h3>

                      <button
                        className="px-6 lg:px-10 py-2 lg:py-3.5 rounded-lg font-medium text-sm lg:text-lg text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
                        style={{ backgroundColor: DOWNLOAD_BG }}
                      >
                        Descargar
                      </button>
                    </div>
                  );
                }

                return (
                  /* Light info card */
                  <div
                    key={`${card.titulo}-${idx}`}
                    className="rounded-2xl lg:rounded-3xl overflow-hidden flex flex-col p-5 lg:p-10 min-h-[220px] lg:min-h-[380px] border-2 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
                    style={{ backgroundColor: '#E3FFF8', borderColor: `${LIGHT_ACCENT}60` }}
                  >
                    <h3 className="text-base lg:text-2xl font-medium italic mb-3 lg:mb-5" style={{ color: LIGHT_ACCENT }}>
                      {card.titulo}
                    </h3>
                    <p className="text-xs md:text-sm lg:text-lg leading-relaxed font-light" style={{ color: LIGHT_TEXT }}>
                      {card.resumen}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              className="shrink-0 w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Siguiente metodología"
            >
              <ChevronRight className="w-5 h-5 lg:w-7 lg:h-7" />
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
