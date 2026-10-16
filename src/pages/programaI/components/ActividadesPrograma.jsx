import React, { useState } from 'react';
import Reveal from './Reveal';

const ACCENT_COLORS = ['#15A4C9', '#BACB5E', '#15A4C9'];

/** Image placeholder SVG */
function ImagePlaceholder({ className = '' }) {
  return (
    <div className={`bg-gray-300 flex items-center justify-center ${className}`}>
      <svg className="w-12 h-12 text-white opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

export default function ActividadesPrograma({ data = {} }) {
  const ciudades = data.ciudades ?? [];
  const items = data.items ?? [];
  const [activeCity, setActiveCity] = useState(ciudades[0]);

  return (
    <section className="w-full bg-[#EFFFFA] py-8 md:py-12 lg:py-24">
      <div className="max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <Reveal>
          <div className="bg-lm-olive py-2 lg:py-5 px-4 lg:px-8 mb-6 lg:mb-12 flex items-center justify-center rounded-sm">
            <h2 className="italic font-medium text-[#E3FFF8] text-2xl md:text-3xl lg:text-5xl tracking-wide">
              {data.titulo}
            </h2>
          </div>
        </Reveal>

        {/* City tabs */}
        <Reveal retraso={100}>
          <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-12 mb-8 lg:mb-14 border-b border-gray-200 pb-2 lg:pb-4">
            {ciudades.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`text-sm md:text-base lg:text-xl font-medium transition-all duration-200 pb-1 relative ${
                  activeCity === city
                    ? 'text-lm-navy border-b-2 border-lm-navy'
                    : 'text-lm-navy/60 hover:text-lm-navy'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Activity cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {items.map((activity, i) => {
            const accentColor = ACCENT_COLORS[i % ACCENT_COLORS.length];
            return (
              <Reveal key={activity.nombre + i} retraso={(i % 3) * 120}>
                <div
                  className="group bg-[#E3FFF8] rounded-t-[50px] lg:rounded-t-[70px] rounded-b-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-t-[50px] lg:rounded-t-[70px]">
                    {activity.imagen ? (
                      <img
                        src={activity.imagen}
                        alt={activity.nombre}
                        loading="lazy"
                        className="w-full h-44 lg:h-72 object-cover rounded-t-[50px] lg:rounded-t-[70px] group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <ImagePlaceholder className="w-full h-44 lg:h-72 rounded-t-[50px] lg:rounded-t-[70px]" />
                    )}
                  </div>

                  {/* Name label */}
                  <div
                    className="py-2 lg:py-4 px-4 text-center font-medium text-white text-base lg:text-2xl"
                    style={{ backgroundColor: accentColor }}
                  >
                    {activity.nombre}
                  </div>

                  {/* Description */}
                  <div className="p-4 lg:p-8 flex-1">
                    <p className="text-xs md:text-sm lg:text-lg leading-relaxed" style={{ color: accentColor }}>
                      {activity.descripcion}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
