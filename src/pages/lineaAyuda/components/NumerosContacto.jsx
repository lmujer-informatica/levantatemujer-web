import React from 'react';
import Reveal from './Reveal';

export default function NumerosContacto({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="bg-lm-navy py-14 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-10">
        {data.map((contacto, idx) => (
          <Reveal key={idx} retraso={idx * 120} className="w-[250px] md:w-[320px]">
            <div className="flex flex-col items-center rounded-3xl border-2 border-white/30 p-4 md:p-6 transition-all duration-300 hover:border-white/70 hover:-translate-y-1.5">
              <h3 className="text-white text-lg md:text-2xl italic mb-3 md:mb-4 text-center tracking-wide">
                {contacto.ciudad}
              </h3>
              <a
                href={`tel:${(contacto.numero ?? '').replace(/\s/g, '')}`}
                className="bg-white hover:bg-gray-100 rounded-full py-3 md:py-4 px-8 w-full shadow-md flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <span className="text-lm-cyan font-semibold text-2xl md:text-3xl mb-1">
                  {contacto.numero}
                </span>
                <span className="text-lm-navy text-sm md:text-base">
                  Click Aquí
                </span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
