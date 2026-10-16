import React from 'react';
import { Link } from 'react-router';

const THEME_COLORS = ['#2C8E9E', '#93A635'];

const modulosNoticias = import.meta.glob('../../../../data/noticias/*.json', { eager: true });
const noticias = Object.entries(modulosNoticias).map(([ruta, modulo]) => ({
  id: ruta.split('/').pop().replace(/\.json$/, ''),
  ...modulo.default,
}));

function NewsCard({ item, themeColor, etiquetaBoton }) {
  return (
    <div
      className="relative flex flex-col w-full bg-white rounded-t-[40px] rounded-b-sm overflow-hidden h-[400px]"
      style={{ border: `1px solid ${themeColor}` }}
    >
      {/* Top Image area */}
      <div className="relative w-full h-[220px]">
        {/* The image doesn't fill the whole top due to margins in the design */}
        <div className="absolute inset-x-8 top-8 bottom-0 bg-gray-400 rounded-t-lg overflow-hidden flex items-center justify-center">
          {item.imagen ? (
            <img
              src={item.imagen}
              alt={item.titulo}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-16 h-16 text-white opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
        </div>

        {/* Date Badge */}
        <div
          className="absolute top-4 right-0 px-6 py-1.5 rounded-l-full text-white text-sm font-medium"
          style={{ backgroundColor: themeColor }}
        >
          {item.fecha}
        </div>
      </div>

      {/* Bottom arched content area */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-6 mt-[-40px] rounded-t-[50%] z-10"
        style={{ backgroundColor: themeColor }}
      >
        <h3 className="italic text-white text-xl md:text-2xl font-medium mb-3">
          {item.titulo}
        </h3>
        <p className="text-white text-xs text-center mb-6 leading-relaxed opacity-90">
          {item.resumen}
        </p>
        <Link
          to={`/noticia/${item.id}`}
          className="bg-white px-10 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity w-full max-w-[200px] text-center"
          style={{ color: themeColor }}
        >
          {etiquetaBoton}
        </Link>
      </div>
    </div>
  );
}

export default function NoticiasGrid({ data }) {
  if (noticias.length === 0) return null;

  return (
    <section className="w-full bg-[#F1FFFF] flex flex-col">
      {/* Section title */}
      <div className="w-full py-4 flex items-center justify-center" style={{ backgroundColor: '#B8CA5A' }}>
        <h2 className="italic font-medium text-white text-2xl md:text-4xl tracking-wide uppercase">
          {data.tituloSeccion}
        </h2>
      </div>

      {/* Grid container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {noticias.map((item, i) => (
            <NewsCard key={item.id} item={item} themeColor={THEME_COLORS[i % THEME_COLORS.length]} etiquetaBoton={data.etiquetaBoton} />
          ))}
        </div>
      </div>

      {/* View more button section */}
      <div className="w-full py-8 flex items-center justify-center" style={{ backgroundColor: '#0DADD4' }}>
        <button className="bg-white px-12 py-3 rounded-full text-xl md:text-2xl font-medium shadow-md hover:shadow-lg transition-shadow" style={{ color: '#0DADD4' }}>
          {data.etiquetaVerMas}
        </button>
      </div>
    </section>
  );
}
