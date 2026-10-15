import React from 'react';

export default function BannerPrograma() {
  return (
    <section className="relative w-full h-[220px] md:h-[280px] overflow-hidden bg-gray-400 flex items-center justify-center">
      {/* Background image placeholder — replace src when real image is available */}
      <div className="absolute inset-0 bg-gray-400 flex items-center justify-center">
        <svg className="w-24 h-24 text-white opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>

      {/* Green/olive overlay with italic title */}
      <div className="absolute inset-0 flex items-center justify-start pl-12 md:pl-24">
        <div className="relative">
          {/* Olive accent bar behind text */}
          <div className="absolute -inset-x-4 -inset-y-2 bg-lm-olive/80 -skew-x-2" />
          <h1 className="relative italic font-medium text-[#E3FFF8] text-2xl md:text-4xl lg:text-5xl z-10 px-2">
            Mujeres Libres de Violencia
          </h1>
          {/* Underline accent */}
          <div className="relative h-[3px] bg-[#E3FFF8]/70 mt-1 w-full" />
        </div>
      </div>
    </section>
  );
}
