import React, { useState, useRef, useCallback } from 'react';
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

/**
 * Hook de carrusel deslizante con animación, soporte touch y botones.
 */
function useSlideCarousel(items) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);

  const touchStartX = useRef(null);
  const touchCurrentX = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);

  const count = items.length;

  const goNext = useCallback(() => {
    if (isAnimating || count === 0) return;
    setSlideDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
      setIsAnimating(false);
      setSlideDirection(null);
    }, 350);
  }, [isAnimating, count]);

  const goPrev = useCallback(() => {
    if (isAnimating || count === 0) return;
    setSlideDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + count) % count);
      setIsAnimating(false);
      setSlideDirection(null);
    }, 350);
  }, [isAnimating, count]);

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchCurrentX.current = e.targetTouches[0].clientX;
    isDragging.current = true;
    setDragOffset(0);
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.targetTouches[0].clientX;
    const delta = touchCurrentX.current - touchStartX.current;
    setDragOffset(delta);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchCurrentX.current;
    setDragOffset(0);
    if (diff > 50) {
      goNext();
    } else if (diff < -50) {
      goPrev();
    }
  }, [goNext, goPrev]);

  return {
    currentIndex,
    isAnimating,
    slideDirection,
    dragOffset,
    goNext,
    goPrev,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

/** Carrusel genérico con deslizamiento animado */
function SlideCarousel({ items, renderCard, carousel, prevBtnClass, nextBtnClass }) {
  const {
    currentIndex,
    isAnimating,
    slideDirection,
    dragOffset,
    goNext,
    goPrev,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = carousel;

  if (!items || items.length === 0) return null;

  const count = items.length;
  const getItem = (offset) => items[((currentIndex + offset) % count + count) % count];

  const prevItems = [getItem(-3), getItem(-2), getItem(-1)];
  const currItems = [getItem(0), getItem(1), getItem(2)];
  const nextItems = [getItem(3), getItem(4), getItem(5)];

  let translatePercent = 0;
  if (slideDirection === 'left') translatePercent = -100;
  if (slideDirection === 'right') translatePercent = 100;

  const dragPercent = dragOffset !== 0 ? (dragOffset / window.innerWidth) * 100 : 0;

  return (
    <div
      className="relative flex items-center gap-3 sm:gap-4"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={goPrev}
        className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors cursor-pointer z-10 ${prevBtnClass}`}
        aria-label="Anterior investigación"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex-1 overflow-hidden">
        <div
          className="flex w-[300%]"
          style={{
            transform: `translateX(calc(-33.333% + ${translatePercent / 3}% + ${dragPercent / 3}%))`,
            transition:
              isAnimating
                ? 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none',
          }}
        >
          <div className="w-1/3 grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
            {prevItems.map((item, idx) => (
              <div
                key={`prev-${item?.id || idx}`}
                className={idx === 0 ? 'block col-span-1' : 'hidden sm:block col-span-1'}
              >
                {renderCard(item, idx)}
              </div>
            ))}
          </div>
          <div className="w-1/3 grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
            {currItems.map((item, idx) => (
              <div
                key={`curr-${item?.id || idx}`}
                className={idx === 0 ? 'block col-span-1' : 'hidden sm:block col-span-1'}
              >
                {renderCard(item, idx)}
              </div>
            ))}
          </div>
          <div className="w-1/3 grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
            {nextItems.map((item, idx) => (
              <div
                key={`next-${item?.id || idx}`}
                className={idx === 0 ? 'block col-span-1' : 'hidden sm:block col-span-1'}
              >
                {renderCard(item, idx)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={goNext}
        className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors cursor-pointer z-10 ${nextBtnClass}`}
        aria-label="Siguiente investigación"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
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

  const carousel = useSlideCarousel(investigaciones);

  return (
    <section className="w-full bg-[#EFFFFA] py-8 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="bg-lm-navy py-2 px-4 mb-8 flex items-center justify-center">
          <h2 className="italic font-medium text-[#E3FFF8] text-xl md:text-3xl tracking-wide">
            INVESTIGACIONES
          </h2>
        </div>

        {/* Cards carousel con soporte touch y animación deslizante */}
        <SlideCarousel
          items={investigaciones}
          carousel={carousel}
          prevBtnClass="bg-lm-navy hover:bg-lm-navy/80"
          nextBtnClass="bg-lm-navy hover:bg-lm-navy/80"
          renderCard={(item) => <InvestigacionFlipCard item={item} />}
        />
      </div>
    </section>
  );
}
