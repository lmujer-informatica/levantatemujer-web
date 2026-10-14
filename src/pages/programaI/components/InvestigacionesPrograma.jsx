import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react';
import programaIData from '../../../data/programaI.json';

/** Flip Card para Investigaciones */
function InvestigacionFlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDescargar = (e) => {
    e.stopPropagation();
    if (item.archivo) {
      window.open(item.archivo, '_blank');
    } else {
      alert('El archivo no está disponible temporalmente.');
    }
  };

  return (
    <div
      className="h-[230px] w-full cursor-pointer select-none"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
      title="Haz clic para voltear"
    >
      <div
        className="relative w-full h-full transition-transform duration-700 shadow-md rounded-2xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ================= CARA FRONTAL ================= */}
        {/* Diseño inicial: Fondo claro (#E3FFF8) + Título + Texto de descripción */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col p-5 border-2 border-lm-navy/30 bg-[#E3FFF8] transition-opacity duration-300 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-base sm:text-lg font-medium italic mb-2 text-lm-navy leading-snug line-clamp-2">
            {item.titulo}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed font-light text-lm-navy line-clamp-5 overflow-y-auto">
            {item.descripcion}
          </p>
        </div>

        {/* ================= CARA TRASERA ================= */}
        {/* Diseño volteado: Fondo celeste (#0DADD4) + Cuadro vacío + Título + Botón "Descargar" */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4 gap-2 shadow-md bg-[#0DADD4]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Cuadro interior con icono sutil de documento */}
          <div className="w-4/5 h-14 border-2 border-white/60 rounded-lg flex items-center justify-center bg-white/10">
            <FileDown className="w-6 h-6 text-white/80" />
          </div>

          <h3 className="text-sm sm:text-base font-medium italic text-white text-center line-clamp-2 px-2">
            {item.titulo}
          </h3>

          <button
            onClick={handleDescargar}
            className="px-6 py-1.5 rounded-lg font-medium text-xs sm:text-sm text-white bg-lm-navy hover:bg-lm-navy/90 active:scale-95 transition-all shadow-sm cursor-pointer mt-1"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
}

function obtenerVisibles(items, indexInicio) {
  if (!Array.isArray(items) || items.length === 0) return [];
  if (items.length <= 3) return items;
  return [
    items[indexInicio % items.length],
    items[(indexInicio + 1) % items.length],
    items[(indexInicio + 2) % items.length],
  ];
}

export default function InvestigacionesPrograma() {
  const investigaciones =
    programaIData?.investigaciones?.length > 0
      ? programaIData.investigaciones
      : [
          {
            id: 1,
            titulo: 'Diagnóstico de Violencias Basadas en Género',
            descripcion:
              'Lorem ipsum dolor sit amet consectetur adipiscing elit aenean, ut lacinia mi porta mollis porttitor lacus, taciti mattis elementum sagittis nibh sollicitudin te.',
            archivo: '',
          },
          {
            id: 2,
            titulo: 'Estudio de Impacto de Programas Psicosociales',
            descripcion:
              'Lorem ipsum dolor sit amet consectetur adipiscing elit aenean, ut lacinia mi porta mollis porttitor lacus, taciti mattis elementum sagittis nibh sollicitudin te.',
            archivo: '',
          },
          {
            id: 3,
            titulo: 'Análisis de Barreras en el Acceso a la Justicia',
            descripcion:
              'Lorem ipsum dolor sit amet consectetur adipiscing elit aenean, ut lacinia mi porta mollis porttitor lacus, taciti mattis elementum sagittis nibh sollicitudin te.',
            archivo: '',
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex(
      (i) => (i - 1 + investigaciones.length) % investigaciones.length
    );
  const next = () =>
    setCurrentIndex((i) => (i + 1) % investigaciones.length);

  // Touch swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (diff > 40) next();
    else if (diff < -40) prev();
  };

  const visibleCards = obtenerVisibles(investigaciones, currentIndex);

  return (
    <section className="w-full bg-[#EFFFFA] py-8 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="bg-lm-navy py-2 px-4 mb-8 flex items-center justify-center">
          <h2 className="italic font-medium text-[#E3FFF8] text-xl md:text-3xl tracking-wide">
            INVESTIGACIONES
          </h2>
        </div>

        {/* Cards carousel con soporte touch */}
        <div
          className="flex items-center gap-3 sm:gap-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Prev arrow */}
          <button
            onClick={prev}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 transition-colors cursor-pointer"
            aria-label="Anterior investigación"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards: 1 en móviles (1 sola fila), 3 en pantallas medianas y grandes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            {visibleCards.map((card, idx) => (
              <div
                key={card.id || idx}
                className={idx === 0 ? 'block col-span-1' : 'hidden sm:block col-span-1'}
              >
                <InvestigacionFlipCard item={card} />
              </div>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 transition-colors cursor-pointer"
            aria-label="Siguiente investigación"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
