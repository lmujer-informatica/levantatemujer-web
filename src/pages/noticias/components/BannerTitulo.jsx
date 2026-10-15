import React from 'react';

export default function BannerTitulo({ titulo, imagen }) {
  return (
    <section className="relative w-full bg-white overflow-hidden h-[200px] md:h-[340px] flex items-center justify-center">
      <img
        src={imagen}
        alt=""
        className="absolute w-40 h-40 md:w-64 md:h-64 object-cover"
      />
      <div className="absolute w-[92%] max-w-xl md:max-w-3xl h-24 md:h-40 bg-[#BACB5E]/90 blur-[25px] rounded-[20px]" />
      <h1
        className="relative z-10 px-4 text-center text-[#E3FFF8] font-montserrat italic font-medium text-2xl md:text-5xl leading-snug md:leading-tight"
        style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
      >
        {titulo}
      </h1>
    </section>
  );
}
