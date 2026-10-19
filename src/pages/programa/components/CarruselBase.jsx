import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarruselBase({ items = [], itemsPorPagina, colorFlechas, vertical = false, renderItem }) {
  const [pagina, setPagina] = useState(0);
  const touchX = useRef(null);
  const totalPaginas = Math.max(1, Math.ceil(items.length / itemsPorPagina));
  const paginaActual = Math.min(pagina, totalPaginas - 1);

  const ir = (dir) =>
    setPagina((p) =>
      Math.max(0, Math.min(totalPaginas - 1, p + dir))
    );

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 40) ir(delta < 0 ? 1 : -1);
    touchX.current = null;
  };

  const inicio = paginaActual * itemsPorPagina;
  const visibles = items.slice(inicio, inicio + itemsPorPagina);

  return (
    <div className="w-full">
      <div
        className="relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={
            vertical
              ? 'flex flex-col gap-3 md:gap-4'
              : 'flex items-stretch justify-center gap-2 md:gap-5'
          }
        >
          {visibles.map((item, i) => renderItem(item, i))}
        </div>

        {totalPaginas > 1 && paginaActual > 0 && (
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => ir(-1)}
            className="absolute left-0 md:-left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center z-10"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" style={{ color: colorFlechas }} strokeWidth={2.5} />
          </button>
        )}
        {totalPaginas > 1 && paginaActual < totalPaginas - 1 && (
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => ir(1)}
            className="absolute right-0 md:-right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center z-10"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" style={{ color: colorFlechas }} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {totalPaginas > 1 && (
        <div className="mt-3 md:mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Página ${i + 1}`}
              onClick={() => setPagina(i)}
              className={`rounded-full transition-colors ${
                i === paginaActual
                  ? 'w-6 h-2.5'
                  : 'w-2.5 h-2.5 bg-[#C0D1C7] hover:bg-[#407178]'
              }`}
              style={i === paginaActual ? { backgroundColor: colorFlechas } : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}