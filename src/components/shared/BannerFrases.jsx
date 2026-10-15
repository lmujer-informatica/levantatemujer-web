import React, { useState, useEffect } from 'react';

export default function BannerFrases({ data }) {
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % data.frases.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [data.frases.length]);

  return (
    <section className="relative w-full h-[240px] md:h-[340px] overflow-hidden bg-white">
      <img
        src={data.imagenFondo}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(186,203,94,0.45)] to-[rgba(186,203,94,0.7)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div className="bg-[rgba(186,203,94,0.85)] rounded-2xl px-6 py-4 md:px-12 md:py-6 shadow-lg max-w-[90%] md:max-w-[70%]">
          <h2
            key={indiceActual}
            className="text-[#E3FFF8] font-montserrat italic font-medium text-2xl md:text-4xl lg:text-5xl text-center leading-tight hero-text-in"
          >
            {data.frases[indiceActual]}
          </h2>
        </div>
        <div className="w-[80%] md:w-[65%] h-[2px] bg-[#E3FFF8] mt-4 opacity-80" />
      </div>
    </section>
  );
}