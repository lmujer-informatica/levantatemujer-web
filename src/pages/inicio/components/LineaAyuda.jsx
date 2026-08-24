import React from 'react';
import inicioData from '../../../data/inicio.json';

export default function LineaAyuda() {
  return (
    <section className="w-full flex flex-col md:flex-row min-h-[300px]">

      {/* Mitad Izquierda: Fondo Oliva Claro */}
      <div className="w-full md:w-[55%] bg-[#c2d65a] py-12 md:py-16 flex flex-col justify-center">

        <div className="pl-10 md:pl-24 mb-6">
          <h2 className="text-white text-5xl md:text-[4rem] italic font-medium leading-tight">
            Línea de Ayuda
          </h2>
        </div>

        <button
          className="w-[85%] md:w-[80%] bg-[#08aadb] rounded-r-[3rem] shadow-[0_8px_15px_rgba(0,0,0,0.2)] hover:bg-[#0799c5] hover:w-[87%] md:hover:w-[82%] transition-all duration-300 focus:outline-none"
        >
          <div className="flex items-center justify-center py-5 md:py-6 text-white text-3xl font-medium tracking-wide">
            Click Aquí
          </div>
        </button>

      </div>

      {/* Mitad Derecha */}
      <div className="w-full md:w-[45%] bg-[#a5b897] relative overflow-hidden flex items-center justify-center p-12 md:p-16 border-t md:border-t-0 md:border-l border-white/20">

        {/* Imagen de fondo */}
        {inicioData.lineaAyuda.imagen && (
          <img
            src={inicioData.lineaAyuda.imagen}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
          />
        )}

        {/* Capa para suavizar la imagen */}
        <div className="absolute inset-0 bg-[#a5b897]/40 pointer-events-none" />

        {/* Texto */}
        <p className="text-[#396593] text-3xl md:text-[2.2rem] leading-snug font-medium text-center relative z-10 max-w-[420px]">
          {inicioData.lineaAyuda.mensaje}
        </p>

      </div>

    </section>
  );
}