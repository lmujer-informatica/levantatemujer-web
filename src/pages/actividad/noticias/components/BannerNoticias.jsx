import React from 'react';

export default function BannerNoticias() {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-white flex items-center justify-center">
      {/* Background image placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Simulating the grey frame for the image */}
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gray-400 rounded-lg flex items-center justify-center">
          <svg className="w-32 h-32 text-white opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>

      {/* Glow effect and title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center">
          {/* Olive glow background */}
          <div className="absolute inset-0 bg-[#d8eb96]/80 blur-2xl rounded-full scale-150" />
          
          <h1 className="relative italic font-medium text-white text-4xl md:text-6xl lg:text-7xl z-10 px-4 drop-shadow-sm">
            Carrusel de Fraes
          </h1>
          {/* Underline accent */}
          <div className="relative h-[2px] md:h-[3px] bg-white mt-2 w-[80%] md:w-[120%] z-10" />
        </div>
      </div>
    </section>
  );
}
