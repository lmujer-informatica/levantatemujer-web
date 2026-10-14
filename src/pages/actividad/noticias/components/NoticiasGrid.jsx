import React from 'react';
import noticiasData from '../../../../data/noticias.json';

/** Formateador de fecha a DD - MM - AAAA */
function formatearFecha(fechaStr) {
  if (!fechaStr) return '';
  try {
    const fecha = new Date(
      fechaStr.includes('T') ? fechaStr : fechaStr + 'T00:00:00'
    );
    if (isNaN(fecha.getTime())) return fechaStr;
    const dd = String(fecha.getDate()).padStart(2, '0');
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const aaaa = fecha.getFullYear();
    return `${dd} - ${mm} - ${aaaa}`;
  } catch {
    return fechaStr;
  }
}

/** Image placeholder SVG */
function ImagePlaceholder({ className = '' }) {
  return (
    <div
      className={`bg-gray-400 flex items-center justify-center ${className}`}
    >
      <svg
        className="w-16 h-16 text-white opacity-60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

function NewsCard({ item }) {
  const color = item.colorTema || item.themeColor || '#2C8E9E';

  return (
    <article
      className="relative flex flex-col w-full bg-white rounded-t-[40px] rounded-b-xl overflow-hidden h-[450px] shadow-sm hover:shadow-lg transition-all duration-300"
      style={{ border: `2px solid ${color}` }}
    >
      {/* ── Primera mitad vertical (arriba): Imagen completa ── */}
      <div className="relative w-full h-1/2 overflow-hidden bg-gray-300">
        {item.imagen ? (
          <img
            src={item.imagen}
            alt={item.titulo || 'Noticia'}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImagePlaceholder className="w-full h-full" />
        )}

        {/* Date Badge */}
        {item.fecha && (
          <div
            className="absolute top-4 right-0 px-4 py-1.5 rounded-l-full text-white text-xs sm:text-sm font-semibold shadow-xs z-10"
            style={{ backgroundColor: color }}
          >
            {formatearFecha(item.fecha)}
          </div>
        )}
      </div>

      {/* ── Segunda mitad vertical (abajo): Contenedor de contenido ── */}
      <div
        className="relative w-full h-1/2 flex flex-col justify-between items-center text-center p-5 sm:p-6 z-10"
        style={{ backgroundColor: color }}
      >
        <div className="w-full flex flex-col items-center overflow-hidden">
          {/* Título sin desbordamiento */}
          <h3 className="italic text-white text-lg sm:text-xl font-bold mb-2 line-clamp-2 px-2 leading-tight">
            {item.titulo || 'Título de la noticia'}
          </h3>
          {/* Descripción con padding para que no choque con bordes */}
          <p className="text-white text-xs sm:text-sm leading-relaxed px-3 line-clamp-3 opacity-95">
            {item.descripcion || 'Descripción no disponible.'}
          </p>
        </div>

        {/* Botón Leer más con redirección a URL */}
        <div className="mt-2 w-full flex justify-center">
          {item.url ? (
            <a
              href={item.url}
              target={item.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="bg-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-md inline-block max-w-[200px] truncate cursor-pointer"
              style={{ color }}
            >
              Leer más
            </a>
          ) : (
            <button
              disabled
              className="bg-white/80 px-8 py-2 rounded-full text-sm font-semibold shadow-xs inline-block max-w-[200px] opacity-75 cursor-default"
              style={{ color }}
            >
              Leer más
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function NoticiasGrid() {
  const rawNoticias = noticiasData?.noticias || [];

  // Ordenar por fecha descendente (las noticias más actuales subidas primero)
  const noticiasOrdenadas = [...rawNoticias].sort((a, b) => {
    const fechaA = new Date(
      a.fecha?.includes('T') ? a.fecha : a.fecha + 'T00:00:00'
    ).getTime();
    const fechaB = new Date(
      b.fecha?.includes('T') ? b.fecha : b.fecha + 'T00:00:00'
    ).getTime();
    if (!isNaN(fechaA) && !isNaN(fechaB)) {
      return fechaB - fechaA;
    }
    return 0;
  });

  return (
    <section className="w-full bg-[#F1FFFF] flex flex-col">
      {/* Section title */}
      <div
        className="w-full py-4 flex items-center justify-center"
        style={{ backgroundColor: '#B8CA5A' }}
      >
        <h2 className="italic font-medium text-white text-2xl md:text-4xl tracking-wide uppercase">
          NUESTRAS ÚLTIMAS NOTICIAS
        </h2>
      </div>

      {/* Grid container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        {noticiasOrdenadas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {noticiasOrdenadas.map((item, idx) => (
              <NewsCard key={item.id || idx} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-lm-navy/60 text-sm italic">
            No hay noticias disponibles actualmente.
          </div>
        )}
      </div>

      {/* View more button section */}
      <div
        className="w-full py-8 flex items-center justify-center"
        style={{ backgroundColor: '#0DADD4' }}
      >
        <button
          className="bg-white px-12 py-3 rounded-full text-xl md:text-2xl font-medium shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          style={{ color: '#0DADD4' }}
        >
          Ver más Noticias
        </button>
      </div>
    </section>
  );
}
