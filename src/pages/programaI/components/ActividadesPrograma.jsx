import React, { useState } from 'react';

const CITIES = ['La Paz', 'El Alto', 'Oruro', 'Santa Cruz', 'Sucre'];

const ACTIVITIES = [
  {
    id: 1,
    name: 'Nombre',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus,',
    accentColor: '#15A4C9',
  },
  {
    id: 2,
    name: 'Nombre',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus,',
    accentColor: '#BAcb5E',
  },
  {
    id: 3,
    name: 'Nombre',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus,',
    accentColor: '#15A4C9',
  },
];

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

export default function ActividadesPrograma() {
  const [activeCity, setActiveCity] = useState('La Paz');

  return (
    <section className="w-full bg-[#EFFFFA] py-8 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <div className="bg-lm-olive py-2 px-4 mb-6 flex items-center justify-center">
          <h2 className="italic font-medium text-[#E3FFF8] text-2xl md:text-3xl tracking-wide">
            ACTIVIDAES
          </h2>
        </div>

        {/* City tabs */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-8 border-b border-gray-200 pb-2">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`text-sm md:text-base font-medium transition-colors pb-1 ${
                activeCity === city
                  ? 'text-lm-navy border-b-2 border-lm-navy'
                  : 'text-lm-navy/60 hover:text-lm-navy'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Activity cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="bg-[#E3FFF8] rounded-t-[50px] rounded-b-xl overflow-hidden shadow-sm flex flex-col"
            >
              {/* Image */}
              <ImagePlaceholder className="w-full h-44 rounded-t-[50px]" />

              {/* Name label */}
              <div
                className="py-2 px-4 text-center font-medium text-white text-base"
                style={{ backgroundColor: activity.accentColor }}
              >
                {activity.name}
              </div>

              {/* Description */}
              <div className="p-4 flex-1">
                <p className="text-xs leading-relaxed" style={{ color: activity.accentColor }}>
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
