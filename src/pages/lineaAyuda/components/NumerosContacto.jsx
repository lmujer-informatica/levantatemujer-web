import React from 'react';

export default function NumerosContacto({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="bg-lm-navy py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-10">
        {data.map((contacto, idx) => (
          <div key={idx} className="flex flex-col items-center w-[250px]">
            <h3 className="text-white text-lg md:text-xl italic mb-3 text-center tracking-wide">
              {contacto.ciudad}
            </h3>
            <button className="bg-white hover:bg-gray-100 transition-colors rounded-full py-3 px-8 w-full shadow-md flex flex-col items-center justify-center">
              <span className="text-lm-cyan font-semibold text-2xl mb-1">
                {contacto.numero}
              </span>
              <span className="text-lm-navy text-sm">
                Click Aquí
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
