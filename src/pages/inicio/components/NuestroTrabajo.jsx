import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import Reveal from './Reveal';
import programaIData from '../../../data/programaI.json';
import noticiasData from '../../../data/noticias.json';
import eventosData from '../../../data/eventos.json';
import { formatearFechaLarga, proximoOUltimo, ultimoPorFecha } from '../../../lib/ultimos';
import { slugDe } from '../../../lib/eventos';
import { slugDeNoticia } from '../../../lib/noticias';

// --- Datos: "lo último" de cada tipo -----------------------------------------------------

// Los testimonios de Programa I se muestran en dos carruseles; el respaldo `testimonios`
// solo se usa si ambos están vacíos (misma regla que TestimoniosPrograma).
const testimoniosCarruseles = [
  ...(programaIData?.testimoniosSuperior ?? []),
  ...(programaIData?.testimoniosInferior ?? []),
];
const testimonios =
  testimoniosCarruseles.length > 0 ? testimoniosCarruseles : programaIData?.testimonios ?? [];

const ultimoTestimonio = ultimoPorFecha(testimonios);
const ultimaNoticia = ultimoPorFecha(noticiasData?.noticias);
const proximoEvento = proximoOUltimo(eventosData?.tarjetasEventos);

// Enlace interno (Link) o externo (a, en pestaña nueva) según el destino.
function Destino({ to, children, ...props }) {
  if (/^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}

// Con puntero táctil (sin hover) el estado activo se maneja con toques.
const esTactil = () => window.matchMedia?.('(hover: none)').matches ?? false;

const ICONO_IMAGEN = (
  <svg className="w-16 h-16 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

// --- Card -------------------------------------------------------------------------------

/**
 * Card con dos estados:
 *  - reposo: encabezado azul curvo con el nombre de la sección, imagen, fecha y título.
 *  - activo: el encabezado crece y muestra "Encuentra este/esta y más <Sección>" y "Clic Aquí".
 * Se activa con hover (escritorio), foco de teclado, o toque en móvil. La altura total es fija,
 * así que el estado activo no mueve las otras cards.
 */
function TarjetaTrabajo({ seccion, genero, destino, elemento, vacio }) {
  const [activa, setActiva] = useState(false);
  const ref = useRef(null);

  // Toque fuera de la card (en móvil) la cierra
  useEffect(() => {
    if (!activa) return;
    const cerrarSiEsFuera = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setActiva(false);
    };
    document.addEventListener('pointerdown', cerrarSiEsFuera);
    return () => document.removeEventListener('pointerdown', cerrarSiEsFuera);
  }, [activa]);

  const alTocar = (e) => {
    if (!esTactil() || e.target.closest('a')) return;
    setActiva((a) => !a);
  };

  // En móvil, el primer toque sobre imagen/título abre el estado activo en vez de navegar
  const alTocarDetalle = (e) => {
    if (esTactil() && !activa) {
      e.preventDefault();
      e.stopPropagation();
      setActiva(true);
    }
  };

  const alTeclear = (e) => {
    if (e.key === 'Escape') {
      setActiva(false);
      document.activeElement?.blur?.();
    }
  };

  const fecha = elemento ? formatearFechaLarga(elemento.fecha) : '';

  const contenido = elemento && (
    <>
      <div className="w-[85%] flex-1 min-h-0 max-h-40 bg-gray-400 rounded-lg flex items-center justify-center overflow-hidden mb-6">
        {elemento.imagen ? (
          <img
            src={elemento.imagen}
            alt={elemento.titulo}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          ICONO_IMAGEN
        )}
      </div>
      {fecha && <p className="text-lm-olive font-medium text-center mb-6">{fecha}</p>}
      <h4 className="text-lm-cyan text-xl font-light text-center leading-tight line-clamp-2">
        {elemento.titulo}
      </h4>
    </>
  );

  return (
    <div
      ref={ref}
      data-activa={activa}
      onClick={alTocar}
      onKeyDown={alTeclear}
      className="group h-full flex flex-col"
    >
      {/* Encabezado: crece al activarse */}
      <div className="relative bg-lm-cyan text-white text-center flex flex-col items-center justify-center overflow-hidden shadow-xs z-10 h-16 rounded-t-[30px] rounded-b-md transition-[height,border-radius] duration-500 ease-out motion-reduce:transition-none group-hover:h-36 group-hover:rounded-b-[48px] group-focus-within:h-36 group-focus-within:rounded-b-[48px] group-data-[activa=true]:h-36 group-data-[activa=true]:rounded-b-[48px]">
        <p className="text-sm font-light max-h-0 opacity-0 transition-all duration-500 motion-reduce:transition-none group-hover:max-h-6 group-hover:opacity-100 group-focus-within:max-h-6 group-focus-within:opacity-100 group-data-[activa=true]:max-h-6 group-data-[activa=true]:opacity-100">
          Encuentra {genero} y más
        </p>
        <h3 className="text-2xl font-light">{seccion}</h3>
        <Link
          to={destino}
          className="text-[#E9F3A0] underline underline-offset-4 decoration-2 font-medium max-h-0 opacity-0 pointer-events-none transition-all duration-500 motion-reduce:transition-none group-hover:max-h-8 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:max-h-8 group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-data-[activa=true]:max-h-8 group-data-[activa=true]:opacity-100 group-data-[activa=true]:pointer-events-auto hover:text-white focus-visible:text-white"
        >
          Clic Aquí
        </Link>
      </div>

      {/* Cuerpo: cede espacio al encabezado para no cambiar la altura total */}
      <div className="bg-[#eafafa] flex-1 min-h-0 rounded-b-[30px] border border-[#d0f0f0] -mt-2 pt-8 p-6 flex flex-col items-center shadow-md">
        {elemento ? (
          elemento.href ? (
            <Destino
              to={elemento.href}
              onClick={alTocarDetalle}
              className="flex flex-col items-center flex-1 min-h-0 w-full"
            >
              {contenido}
            </Destino>
          ) : (
            <div className="flex flex-col items-center flex-1 min-h-0 w-full">{contenido}</div>
          )
        ) : (
          <div className="flex-1 w-full flex items-center justify-center text-center text-lm-cyan/70 text-sm italic">
            {vacio}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Sección ----------------------------------------------------------------------------

export default function NuestroTrabajo() {
  return (
    <section className="py-20 bg-[#EAF7FA]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <Reveal>
          <h2 className="section-title section-title-navy text-3xl md:text-4xl text-center mb-16">
            NUESTRO TRABAJO
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Reveal className="h-[500px]">
            <TarjetaTrabajo
              seccion="Testimonios"
              genero="este"
              destino="/programaI#testimonios"
              elemento={ultimoTestimonio}
              vacio="Pronto compartiremos testimonios."
            />
          </Reveal>

          <Reveal retraso={120} className="h-[500px]">
            <TarjetaTrabajo
              seccion="Noticias"
              genero="esta"
              destino="/noticias"
              elemento={ultimaNoticia && { ...ultimaNoticia, href: `/noticia/${slugDeNoticia(ultimaNoticia)}` }}
              vacio="Pronto publicaremos noticias."
            />
          </Reveal>

          <Reveal retraso={200} className="h-[500px]">
            <TarjetaTrabajo
              seccion="Eventos"
              genero="este"
              destino="/eventos"
              elemento={proximoEvento && { ...proximoEvento, href: `/evento/${slugDe(proximoEvento)}` }}
              vacio="Pronto anunciaremos eventos."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
