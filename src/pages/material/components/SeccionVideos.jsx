import React, { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

const tieneVideo = (v) => Boolean(v.videoUrl) && v.videoUrl !== '#';
const esMp4 = (url) => url.toLowerCase().split('?')[0].endsWith('.mp4');

export default function SeccionVideos({ data = {} }) {
  const items = data.items ?? [];
  const [activo, setActivo] = useState(null);

  useEffect(() => {
    if (activo === null) return;
    const cerrar = (e) => {
      if (e.key === 'Escape') setActivo(null);
    };
    window.addEventListener('keydown', cerrar);
    return () => window.removeEventListener('keydown', cerrar);
  }, [activo]);

  return (
    <section className="w-full bg-[#EFFFFB] py-8 md:py-14">
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          titulo={data.titulo}
          colorTitulo="#2B8EA6"
          subrayado="#356194"
        />

        <div className="mt-6 md:mt-10 flex flex-col gap-8 md:gap-12">
          {items.map((video, i) => {
            const invertido = i % 2 === 1;
            const Contenedor = tieneVideo(video) ? 'button' : 'div';
            return (
              <Reveal key={video.titulo + i}>
                <article
                  className={`flex flex-col gap-4 md:gap-8 md:items-center ${
                    invertido ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  <Contenedor
                    type={tieneVideo(video) ? 'button' : undefined}
                    onClick={tieneVideo(video) ? () => setActivo(i) : undefined}
                    aria-label={`Reproducir ${video.titulo}`}
                    className="flex-1 min-w-0 text-left transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="bg-[#C0D1C7] rounded-[15px] md:rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-2 md:p-4">
                      <div className="relative bg-white rounded-[15px] p-1.5 md:p-2">
                        <img
                          src={video.thumbnail}
                          alt={video.titulo}
                          loading="lazy"
                          className="w-full aspect-video object-cover rounded-[12px]"
                        />
                        {tieneVideo(video) && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="relative flex items-center justify-center">
                              <span className="absolute inline-flex w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/60 animate-ping" />
                              <span className="relative w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#356194] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
                                <Play className="w-6 h-6 md:w-9 md:h-9 text-white fill-current ml-0.5" />
                              </span>
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </Contenedor>

                  <div className="flex-1 min-w-0 text-center px-1">
                    <h3 className="font-poppins font-medium text-sm md:text-2xl" style={{ color: '#356194' }}>
                      {video.titulo}
                    </h3>
                    <p className="mt-2 md:mt-3 font-poppins text-[11px] md:text-base leading-relaxed" style={{ color: '#2B8EA6' }}>
                      {video.descripcion}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {activo !== null && tieneVideo(items[activo] ?? {}) && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setActivo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={items[activo].titulo}
        >
          <button
            type="button"
            aria-label="Cerrar video"
            onClick={() => setActivo(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div
            className="w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              {esMp4(items[activo].videoUrl) ? (
                <video
                  src={items[activo].videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              ) : (
                <iframe
                  src={items[activo].videoUrl}
                  title={items[activo].titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
