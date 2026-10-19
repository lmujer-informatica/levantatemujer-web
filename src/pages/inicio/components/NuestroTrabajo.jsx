import React from 'react';
import { Link } from 'react-router';
import Reveal from './Reveal';

const modulosNoticias = import.meta.glob('../../../data/noticias/*.json', { eager: true });

function fechaOrdenable(fecha) {
  const m = String(fecha ?? '').match(/(\d{1,2})\s*-\s*(\d{1,2})\s*-\s*(\d{4})/);
  if (!m) return 0;
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])).getTime();
}

const noticias = Object.entries(modulosNoticias)
  .map(([ruta, modulo]) => ({
    id: ruta.split('/').pop().replace(/\.json$/, ''),
    ...modulo.default,
  }))
  .sort((a, b) => fechaOrdenable(b.fecha) - fechaOrdenable(a.fecha))
  .slice(0, 3);

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
          {/* Columna Izquierda: Testimonios */}
          <Reveal className="flex flex-col h-[500px]">
            <div className="bg-lm-cyan text-white text-center py-4 rounded-t-[30px] rounded-b-md shadow-xs z-10">
              <h3 className="text-2xl font-light">Testimonios</h3>
            </div>
            <div className="bg-[#eafafa] flex-1 rounded-b-[30px] border border-[#d0f0f0] -mt-2 pt-8 p-6 flex flex-col items-center shadow-md">
              <div className="w-[85%] h-40 bg-gray-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-20 h-20 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <p className="text-lm-olive font-medium text-center mb-6">Fecha de publicación</p>
              <h4 className="text-lm-cyan text-xl font-light text-center leading-tight">Título del<br />testimonio</h4>
            </div>
          </Reveal>

          {/* Columna Centro: Noticias desde Decap CMS */}
          <Reveal retraso={120} className="flex flex-col h-[500px] shadow-lg rounded-[40px] overflow-hidden bg-lm-cyan">
            <div className="pt-7 pb-5 px-6 text-center">
              <h3 className="text-white text-3xl font-light">Noticias</h3>
              <p className="text-white/85 text-sm mt-1">Últimas publicaciones</p>
            </div>
            <div className="flex-1 flex flex-col gap-3 px-5 pb-5">
              {noticias.length === 0 && (
                <p className="text-white/90 text-center text-sm py-8">Pronto publicaremos noticias.</p>
              )}
              {noticias.map((n) => (
                <Link
                  key={n.id}
                  to={`/noticia/${n.id}`}
                  className="group flex items-center gap-3 bg-white/95 hover:bg-white rounded-2xl p-3 transition-colors text-left"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                    {n.imagen ? (
                      <img src={n.imagen} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-lm-olive uppercase tracking-wide truncate">{n.fecha}</p>
                    <p className="text-lm-navy text-sm font-medium leading-snug line-clamp-2">{n.titulo}</p>
                  </div>
                </Link>
              ))}
              <Link to="/noticias" className="mt-auto text-center text-white text-base font-medium underline underline-offset-4 decoration-2 hover:text-lm-olive transition-colors pt-2">
                Ver todas
              </Link>
            </div>
          </Reveal>

          {/* Columna Derecha: Eventos */}
          <Reveal retraso={200} className="flex flex-col h-[500px]">
            <div className="bg-lm-cyan text-white text-center py-4 rounded-t-[30px] rounded-b-md shadow-xs z-10">
              <h3 className="text-2xl font-light">Eventos</h3>
            </div>
            <div className="bg-[#eafafa] flex-1 rounded-b-[30px] border border-[#d0f0f0] -mt-2 pt-8 p-6 flex flex-col items-center shadow-md">
              <div className="w-[85%] h-40 bg-gray-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-20 h-20 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <p className="text-lm-olive font-medium text-center mb-6">Fecha del<br />evento</p>
              <h4 className="text-lm-cyan text-xl font-light text-center leading-tight">Título del<br />evento</h4>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
