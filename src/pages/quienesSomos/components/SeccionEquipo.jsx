import React, { useRef, useState, useEffect } from 'react';
import TarjetaEquipo from './TarjetaEquipo';

export default function SeccionEquipo({ titulo, miembros, color }) {
  const scrollRef = useRef(null);
  const [puedeIzquierda, setPuedeIzquierda] = useState(false);
  const [puedeDerecha, setPuedeDerecha] = useState(true);
  const [desborda, setDesborda] = useState(false);

  const verificarScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setPuedeIzquierda(el.scrollLeft > 10);
    setPuedeDerecha(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const medirDesborde = () => {
    const el = scrollRef.current;
    if (!el) return;
    setDesborda(el.scrollWidth > el.clientWidth + 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    verificarScroll();
    medirDesborde();
    el.addEventListener('scroll', verificarScroll);
    window.addEventListener('resize', medirDesborde);
    return () => {
      el.removeEventListener('scroll', verificarScroll);
      window.removeEventListener('resize', medirDesborde);
    };
  }, [miembros]);

  const scroll = (direccion) => {
    const el = scrollRef.current;
    if (!el) return;
    const distancia = window.innerWidth >= 768 ? 260 : 160;
    el.scrollBy({ left: direccion === 'izquierda' ? -distancia : distancia, behavior: 'smooth' });
  };

  return (
    <div className="w-full py-4 md:py-10">
      {/* Título */}
      <div className="text-center mb-4 md:mb-6">
        <h3
          className="font-poppins font-medium text-xl md:text-3xl"
          style={{ color }}
        >
          {titulo}
        </h3>
        <div
          className="w-20 md:w-28 h-[1px] md:h-[2px] mx-auto mt-2"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Carousel */}
      <div className="relative group">
        {/* Flecha izquierda */}
        {puedeIzquierda && (
          <button
            onClick={() => scroll('izquierda')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-14 md:h-14 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color }}
          >
            <svg className="w-6 h-6 md:w-9 md:h-9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        )}

        {/* Contenedor de cards */}
        <div
          ref={scrollRef}
          className={`flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8 py-2 ${
            !desborda ? 'md:justify-center' : ''
          }`}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {miembros.map((persona, index) => (
            <div key={index} style={{ scrollSnapAlign: 'center' }}>
              <TarjetaEquipo persona={persona} color={color} />
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        {puedeDerecha && (
          <button
            onClick={() => scroll('derecha')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-14 md:h-14 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color }}
          >
            <svg className="w-6 h-6 md:w-9 md:h-9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}