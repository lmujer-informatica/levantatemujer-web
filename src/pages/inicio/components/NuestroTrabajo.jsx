import React, { useState } from 'react';
import { NavLink } from 'react-router';

/** Placeholder de imagen SVG */
function ImagePlaceholder() {
  return (
    <div className="w-[85%] h-40 bg-gray-400 rounded-lg flex items-center justify-center">
      <svg
        className="w-20 h-20 text-white opacity-80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

const COLUMNS = [
  {
    id: 'testimonios',
    titulo: 'Testimonios',
    fechaTexto: 'Fecha',
    tituloTexto: 'Título',
    linkTo: '/programaI#testimonios',
    genero: "este"
  },
  {
    id: 'noticias',
    titulo: 'Noticias',
    fechaTexto: 'Fecha',
    tituloTexto: 'Título',
    linkTo: '/noticias',
    genero: "esta"
  },
  {
    id: 'eventos',
    titulo: 'Eventos',
    fechaTexto: 'Fecha',
    tituloTexto: 'Título',
    linkTo: '/eventos',
    genero: "este"
  },
];

function TrabajoCard({ columna }) {
  const [expandido, setExpandido] = useState(false);

  const toggleExpand = () => {
    setExpandido((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-[500px] relative">
      {/* ── Contenedor azul superior (clickeable/touchable) ── */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggleExpand}
        onKeyDown={(e) => e.key === 'Enter' && toggleExpand()}
        className={`
          bg-lm-cyan text-white text-center shadow-xs z-10 cursor-pointer select-none
          transition-all duration-500 ease-in-out overflow-hidden
          ${
            expandido
              ? 'rounded-t-[30px] rounded-b-[50px] py-6 px-4 flex-1'
              : 'rounded-t-[30px] rounded-b-md py-4 px-4'
          }
        `}
        style={{
          /* Altura dinámica suave */
          maxHeight: expandido ? '320px' : '64px',
          minHeight: expandido ? '200px' : '56px',
        }}
      >
        {/* Estado colapsado: solo el título */}
        <div
          className={`transition-all duration-400 ease-in-out ${
            expandido
              ? 'opacity-0 max-h-0 overflow-hidden'
              : 'opacity-100 max-h-20'
          }`}
        >
          <h3 className="text-2xl font-light">{columna.titulo}</h3>
        </div>

        {/* Estado expandido: contenido completo */}
        <div
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-500 ease-in-out ${
            expandido
              ? 'opacity-100 max-h-[300px] mt-4'
              : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <p className="text-white font-medium text-base">
            Encuentra {columna.genero} y más
          </p>
          <h3 className="text-white text-3xl sm:text-4xl font-light">
            {columna.titulo}
          </h3>
          <NavLink
            to={columna.linkTo}
            className="text-lm-olive text-lg sm:text-xl font-medium underline underline-offset-4 decoration-2 hover:text-white transition-colors mt-1"
          >
            Aquí
          </NavLink>
        </div>
      </div>

      {/* ── Cuerpo inferior con imagen, fecha y título ── */}
      <div
        className={`
          bg-[#eafafa] rounded-b-[30px] border border-[#d0f0f0] -mt-2 pt-8 p-6
          flex flex-col items-center shadow-md
          transition-all duration-500 ease-in-out overflow-hidden
          ${expandido ? 'flex-none' : 'flex-1'}
        `}
      >
        <ImagePlaceholder />
        <p className="text-lm-olive font-medium text-center mt-6 mb-4">
          {columna.fechaTexto}
        </p>
        <h4 className="text-lm-cyan text-xl font-light text-center leading-tight">
          {columna.tituloTexto}
        </h4>
      </div>
    </div>
  );
}

export default function NuestroTrabajo() {
  return (
    <section className="py-20 bg-[#EAF7FA]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="section-title section-title-navy text-3xl md:text-4xl text-center mb-16">
          NUESTRO TRABAJO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {COLUMNS.map((col) => (
            <TrabajoCard key={col.id} columna={col} />
          ))}
        </div>
      </div>
    </section>
  );
}
