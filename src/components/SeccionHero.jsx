import React from 'react';
import inicioData from '../data/inicio.json';

export default function SeccionHero() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-lm-bg flex">
      {/* Mitad izquierda: fondo verde oliva con texto */}
      <div className="w-full md:w-[65%] h-full bg-lm-olive flex items-center relative z-10 pl-8 md:pl-[10%] pr-4">
        {/* Usamos el título del JSON, si lo hay, de lo contrario un fallback */}
        <h1 className="text-white text-5xl md:text-7xl font-normal leading-tight z-20 relative">
          {inicioData.heroTitulo || 'Carrusel De Frases'}
        </h1>
      </div>

      {/* Mitad derecha: Curva blanca con placeholder e imagen */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-[45%] z-20">
        <div className="w-full h-full bg-lm-bg rounded-l-[150px] flex items-center justify-center relative p-12 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
          {/* Contenedor del Placeholder Gris */}
          <div className="w-[80%] h-[70%] bg-gray-400 rounded-xl relative flex flex-col items-center justify-center overflow-hidden">
             {/* Imagen opcional si existe en JSON, sino mostramos el placeholder figma-like */}
             {inicioData.heroImagenes && inicioData.heroImagenes.length > 0 ? (
                <img src={inicioData.heroImagenes[0]} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                  {/* Icono de placeholder de imagen gigante */}
                  <svg className="w-48 h-48 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
             )}
          </div>
          
          {/* Botón Píldora superpuesto en la parte inferior de la caja de imagen */}
          <button className="absolute bottom-10 px-8 py-3 bg-lm-cyan text-white text-lg font-medium rounded-full shadow-lg hover:bg-opacity-90 transition-transform hover:scale-105">
            Ver Programas
          </button>
        </div>
      </div>
    </div>
  );
}
