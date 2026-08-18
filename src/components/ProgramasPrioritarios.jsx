import React from 'react';
import inicioData from '../data/inicio.json';

export default function ProgramasPrioritarios() {
  const p1 = inicioData.programas?.[0] || { nombre: '', descripcion: '', imagen: '' };
  const p2 = inicioData.programas?.[1] || { nombre: '', descripcion: '', imagen: '' };

  return (
    <section id="programas" className="py-10 bg-lm-bg">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <h2 className="section-title section-title-olive text-3xl md:text-4xl text-center mb-16">
          PROGRAMAS PRIORITARIOS<br/>DE TRABAJO
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
          
          {/* Tarjeta Izquierda (Gris con imagen gigante y píldora oliva) */}
          <div className="bg-[#b3beaf] p-6 rounded-[60px] rounded-tl-[60px] rounded-bl-[60px] h-[350px] relative flex flex-col justify-end overflow-hidden group">
            {/* Contenedor Imagen Placeholder Gris */}
            <div className="absolute inset-4 bg-gray-500 rounded-[50px] flex items-center justify-center border-4 border-[#b3beaf]">
                <svg className="w-32 h-32 text-gray-300 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                   <circle cx="8.5" cy="8.5" r="1.5"></circle>
                   <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            </div>
            {/* Píldora superpuesta */}
            <div className="relative z-10 w-full flex justify-center mb-2">
              <span className="bg-lm-olive text-lm-navy text-lg font-bold px-8 py-3 rounded-full shadow-md truncate max-w-[90%] text-center">
                Mujeres libres de Violencia
              </span>
            </div>
          </div>

          {/* Tarjeta Derecha (Oliva con texto y botón) */}
          <div className="bg-lm-olive p-10 rounded-[60px] rounded-tr-[60px] rounded-br-[60px] h-[350px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <h3 className="text-white text-2xl font-bold mb-4 px-4 leading-tight">
              Respuesta a la trata de<br/>personas y migración
            </h3>
            <p className="text-[#3b4d1b] text-sm md:text-base font-medium mb-8 px-4 leading-snug">
              Resumen corto del Programa<br/>
              Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus
            </p>
            <button className="bg-lm-cyan text-white text-lg font-medium px-8 py-3 rounded-full shadow-lg hover:bg-opacity-90 transition-transform hover:scale-105">
              Saber más
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
