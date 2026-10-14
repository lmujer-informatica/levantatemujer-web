import React, { useState } from 'react';
import { NavLink } from 'react-router';
import programaIData from '../../../data/programaI.json';
import noticiasData from '../../../data/noticias.json';
import eventosData from '../../../data/eventos.json';

/** Formateador de fecha a DD - MM - AAAA */
function formatearFecha(fechaStr) {
  if (!fechaStr) return 'dd - mm - aaaa';
  try {
    const fecha = new Date(fechaStr.includes('T') ? fechaStr : fechaStr + 'T00:00:00');
    if (isNaN(fecha.getTime())) return fechaStr;
    const dd = String(fecha.getDate()).padStart(2, '0');
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const aaaa = fecha.getFullYear();
    return `${dd} - ${mm} - ${aaaa}`;
  } catch {
    return fechaStr;
  }
}

/** Obtiene el último elemento subido (ordenado por fecha descendente o el último del arreglo) */
function obtenerUltimoElemento(lista) {
  if (!Array.isArray(lista) || lista.length === 0) return null;
  const conFecha = lista.filter((item) => item && item.fecha);
  if (conFecha.length > 0) {
    const ordenados = [...conFecha].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    return ordenados[0];
  }
  return lista[lista.length - 1];
}

/** Placeholder de imagen SVG */
function ImagePlaceholder() {
  return (
    <div className="w-full h-full bg-gray-400 rounded-lg flex items-center justify-center">
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
        <div className="w-[85%] h-40 rounded-lg overflow-hidden flex items-center justify-center bg-gray-400">
          {columna.imagen ? (
            <img
              src={columna.imagen}
              alt={columna.tituloTexto}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
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
  // Último testimonio de la página Programa I (considera carrusel superior e inferior)
  const poolTestimonios = [
    ...(programaIData?.testimoniosSuperior || []),
    ...(programaIData?.testimoniosInferior || []),
    ...(programaIData?.testimonios || []),
  ];
  const ultimoTestimonio = obtenerUltimoElemento(poolTestimonios);
  // Última noticia de la sección "Nuestras últimas noticias" de Noticias
  const ultimaNoticia = obtenerUltimoElemento(noticiasData?.noticias);
  // Último evento de la página de Eventos
  const ultimoEvento = obtenerUltimoElemento(
    eventosData?.tarjetasEventos || eventosData?.eventosCalendario
  );

  const columnas = [
    {
      id: 'testimonios',
      titulo: 'Testimonios',
      fechaTexto: ultimoTestimonio?.fecha
        ? formatearFecha(ultimoTestimonio.fecha)
        : 'dd - mm - aaaa',
      tituloTexto:
        ultimoTestimonio?.titulo || ultimoTestimonio?.autor || 'Testimonio',
      imagen: ultimoTestimonio?.imagen || '',
      linkTo: '/programaI#testimonios',
      genero: 'este',
    },
    {
      id: 'noticias',
      titulo: 'Noticias',
      fechaTexto: ultimaNoticia?.fecha
        ? formatearFecha(ultimaNoticia.fecha)
        : 'dd - mm - aaaa',
      tituloTexto: ultimaNoticia?.titulo || 'Noticia',
      imagen: ultimaNoticia?.imagen || '',
      linkTo: '/noticias',
      genero: 'esta',
    },
    {
      id: 'eventos',
      titulo: 'Eventos',
      fechaTexto: ultimoEvento?.fecha
        ? formatearFecha(ultimoEvento.fecha)
        : 'dd - mm - aaaa',
      tituloTexto: ultimoEvento?.titulo || ultimoEvento?.nombre || 'Evento',
      imagen: ultimoEvento?.imagen || '',
      linkTo: '/eventos',
      genero: 'este',
    },
  ];

  return (
    <section className="py-20 bg-[#EAF7FA]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="section-title section-title-navy text-3xl md:text-4xl text-center mb-16">
          NUESTRO TRABAJO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {columnas.map((col) => (
            <TrabajoCard key={col.id} columna={col} />
          ))}
        </div>
      </div>
    </section>
  );
}
