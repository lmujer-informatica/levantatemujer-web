import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';

const modulosNoticias = import.meta.glob('../../data/noticias/*.json', { eager: true });
const noticias = Object.entries(modulosNoticias).map(([ruta, modulo]) => ({
  id: ruta.split('/').pop().replace(/\.json$/, ''),
  ...modulo.default,
}));

function MarcoImagen({ src, alt, tamano = 'md' }) {
  const medidas =
    tamano === 'hero'
      ? 'w-44 h-44 md:w-72 md:h-72'
      : 'w-24 h-24 md:w-36 md:h-36';
  return (
    <div className="relative shrink-0">
      <div
        className={`absolute inset-0 translate-x-1.5 translate-y-1.5 md:translate-x-2.5 md:translate-y-2.5 rounded-[20px] border-[0.7px] bg-[#E3FFF8] ${medidas}`}
        style={{ borderColor: '#356194' }}
        aria-hidden="true"
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`relative rounded-[20px] object-cover ${medidas}`}
      />
    </div>
  );
}

export default function DesgloseNoticia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const noticia = noticias.find((n) => n.id === id);

  if (!noticia) {
    return (
      <main className="flex flex-col grow items-center justify-center gap-4 bg-[#EFFFFB] px-4 py-16 text-center">
        <h2 className="font-montserrat italic font-medium text-xl md:text-2xl" style={{ color: '#356194' }}>
          Noticia no encontrada
        </h2>
        <Link
          to="/"
          className="rounded-full bg-[#F1FFFF] px-8 py-2 font-poppins text-sm shadow-[4px_4px_4px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
          style={{ color: '#2B8EA6' }}
        >
          Volver al inicio
        </Link>
      </main>
    );
  }

  const [imagenDer, imagenIzq] = noticia.imagenes ?? [];
  const parrafos = noticia.parrafos ?? [];

  return (
    <main className="page-fade-in flex flex-col grow gap-0">
      <div className="w-full py-3 md:py-5" style={{ backgroundColor: '#356194' }}>
        <h1 className="px-4 text-center font-montserrat italic font-medium text-xl md:text-3xl text-[#F1FFFF]">
          {noticia.titulo}
        </h1>
      </div>

      <div className="w-full bg-[#EFFFFB] px-4 py-6 md:py-10">
        <div className="relative mx-auto max-w-4xl">
          <span className="absolute left-0 top-4 md:top-6 z-10 rounded-r-[10px] px-3 md:px-4 py-1 font-poppins text-[10px] md:text-sm text-[#F1FFFF]" style={{ backgroundColor: '#BACB5E' }}>
            {noticia.fecha}
          </span>
          <div className="flex justify-center pb-5 md:pb-7">
            <MarcoImagen src={noticia.imagen} alt={noticia.titulo} tamano="hero" />
          </div>

          <div className="mt-2 md:mt-4 flex flex-col md:flex-row gap-5 md:gap-8 md:items-start">
            <p className="flex-1 min-w-0 text-justify font-poppins text-xs md:text-sm leading-relaxed" style={{ color: '#356194' }}>
              {parrafos[0]}
            </p>
            {imagenDer && (
              <div className="mx-auto md:mx-0">
                <MarcoImagen src={imagenDer} alt={`${noticia.titulo} 1`} />
              </div>
            )}
          </div>

          <div className="mt-5 md:mt-8 flex flex-col md:flex-row-reverse gap-5 md:gap-8 md:items-start">
            <p className="flex-1 min-w-0 text-justify font-poppins text-xs md:text-sm leading-relaxed" style={{ color: '#356194' }}>
              {parrafos[1]}
            </p>
            {imagenIzq && (
              <div className="mx-auto md:mx-0">
                <MarcoImagen src={imagenIzq} alt={`${noticia.titulo} 2`} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full py-3 md:py-4" style={{ backgroundColor: '#0DADD4' }}>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-[30px] bg-[#F1FFFF] px-10 md:px-14 py-1.5 md:py-2 font-poppins text-sm md:text-lg shadow-[4px_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ color: '#2B8EA6' }}
          >
            Volver
          </button>
        </div>
      </div>
    </main>
  );
}
