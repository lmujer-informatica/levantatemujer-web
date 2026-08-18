import React from 'react';

export default function LineaAyuda() {
  return (
    <section className="w-full flex flex-col md:flex-row h-auto md:h-[350px]">
      {/* Mitad Izquierda: Oliva con botón Cyan */}
      <div className="w-full md:w-[60%] bg-[#b8cf69] flex flex-col items-center justify-center p-12 md:p-16">
        <h2 className="text-white text-4xl md:text-5xl italic font-light tracking-wide mb-10 w-full max-w-md">
          Línea de Ayuda
        </h2>
        <button className="w-full max-w-md bg-[#00b0d4] text-white text-2xl font-medium py-4 rounded-full shadow-lg hover:bg-opacity-90 transition-transform hover:scale-105">
          Click Aquí
        </button>
      </div>
      
      {/* Mitad Derecha: Gris Oscuro/Oliva oscuro con texto azul */}
      <div className="w-full md:w-[40%] bg-[#9ab87c] relative overflow-hidden flex items-center justify-center p-10 md:p-16">
        {/* Formas circulares de fondo para simular el diseño */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
        
        <p className="text-lm-navy text-2xl md:text-[28px] leading-snug font-medium text-center relative z-10 max-w-[280px]">
          Tu valentía abre caminos, nosotros te acompañamos.
        </p>
      </div>
    </section>
  );
}
