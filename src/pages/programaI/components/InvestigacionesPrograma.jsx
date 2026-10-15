import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const INVESTIGACIONES = [
  {
    id: 1,
    title: 'Título',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit aenean, ut lacinia mi porta mollis porttitor lacus, taciti mattis elementum sagittis nibh sollicitudin te',
    variant: 'light',
    accentColor: '#3561940',
    textColor: '#3561940',
    borderColor: '#3561940',
  },
  {
    id: 2,
    title: 'Título',
    summary: null,
    variant: 'featured',
    accentColor: '#0DADD4',
    textColor: '#F1FFFF',
    downloadBg: '#3561940',
  },
  {
    id: 3,
    title: 'Título',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit aenean, ut lacinia mi porta mollis porttitor lacus, taciti mattis elementum sagittis nibh sollicitudin te',
    variant: 'light',
    accentColor: '#3561940',
    textColor: '#3561940',
    borderColor: '#3561940',
  },
];

export default function InvestigacionesPrograma() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => (i - 1 + INVESTIGACIONES.length) % INVESTIGACIONES.length);
  const next = () => setCurrentIndex((i) => (i + 1) % INVESTIGACIONES.length);

  const visibleCards = [
    INVESTIGACIONES[currentIndex % INVESTIGACIONES.length],
    INVESTIGACIONES[(currentIndex + 1) % INVESTIGACIONES.length],
    INVESTIGACIONES[(currentIndex + 2) % INVESTIGACIONES.length],
  ];

  return (
    <section className="w-full bg-[#EFFFFA] py-8 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <div className="bg-lm-navy py-2 px-4 mb-8 flex items-center justify-center">
          <h2 className="italic font-medium text-[#E3FFF8] text-xl md:text-3xl tracking-wide">
            INVESTIGACIONES
          </h2>
        </div>

        {/* Cards carousel */}
        <div className="flex items-center gap-3">

          {/* Prev arrow */}
          <button
            onClick={prev}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 transition-colors"
            aria-label="Anterior investigación"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            {visibleCards.map((card, idx) => {
              if (card.variant === 'featured') {
                return (
                  <div
                    key={`${card.id}-${idx}`}
                    className="rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 gap-4 min-h-[220px]"
                    style={{ backgroundColor: card.accentColor }}
                  >
                    {/* Inner bordered box */}
                    <div className="w-4/5 h-16 border-2 border-white/60 rounded-lg" />

                    <h3 className="text-xl font-medium italic" style={{ color: card.textColor }}>
                      {card.title}
                    </h3>

                    <button
                      className="px-6 py-2 rounded-lg font-medium text-sm text-white bg-lm-navy hover:bg-lm-navy/80 transition-opacity"
                    >
                      Descargar
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={`${card.id}-${idx}`}
                  className="rounded-2xl overflow-hidden flex flex-col p-5 min-h-[220px] border-2 border-lm-navy/30"
                  style={{ backgroundColor: '#E3FFF8' }}
                >
                  <h3 className="text-base font-medium italic mb-3 text-lm-navy">
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed font-light text-lm-navy">
                    {card.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 transition-colors"
            aria-label="Siguiente investigación"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
