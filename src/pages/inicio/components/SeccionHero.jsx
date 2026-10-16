import React, { useEffect, useState } from 'react';
import inicioData from '../../../data/inicio.json';

export default function SeccionHero() {
  const [indiceActual, setIndiceActual] = useState(0);

  const frases = inicioData.heroFrases || [];
  const imagenes = inicioData.heroImagenes || [];
  const total = Math.max(frases.length, imagenes.length, 1);

  useEffect(() => {
    if (total <= 1) return;

    const prefiereMenosMovimiento = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefiereMenosMovimiento) return;

    const intervalo = setInterval(() => {
      setIndiceActual((actual) => (actual + 1) % total);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [total]);

  const frase = frases.length > 0 ? frases[indiceActual % frases.length] : 'Fundación Levántate Mujer';

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-lm-bg flex">

      {/* Mitad izquierda */}
      <div className="w-full md:w-[65%] h-full bg-lm-olive flex items-center relative z-10 pl-8 md:pl-[10%] pr-4">

        <h1
          key={indiceActual}
          className="hero-text-in text-white text-5xl md:text-7xl font-normal leading-tight z-20 relative max-w-[80%] md:max-w-[75%]"
        >
          {frase}
        </h1>

        {total > 1 && (
          <div className="absolute bottom-8 left-8 md:left-[10%] flex gap-2 z-20" aria-hidden="true">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === indiceActual ? 'w-8 bg-white' : 'w-4 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Mitad derecha */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-[45%] z-20">

        <div className="w-full h-full bg-[#EAF7FA] rounded-l-[150px] flex items-center justify-center relative p-12 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">

          <div className="w-[80%] h-[70%] bg-gray-400 rounded-xl relative flex flex-col items-center justify-center overflow-hidden">

            {imagenes.length > 0 ? (
              imagenes.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={i === 0 ? 'Hero' : ''}
                  aria-hidden={i !== indiceActual % imagenes.length}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                    i === indiceActual % imagenes.length ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                />
              ))
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <svg
                  className="w-48 h-48 opacity-80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}

          </div>

          <button className="absolute bottom-10 px-8 py-3 bg-lm-cyan text-white text-lg font-medium rounded-full shadow-lg hover:bg-lm-cyan/90 transition-transform hover:scale-105">
            Ver Programas
          </button>

        </div>

      </div>

    </div>
  );
}