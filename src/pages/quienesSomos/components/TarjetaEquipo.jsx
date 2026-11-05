import React from 'react';

export default function TarjetaEquipo({ persona, color = '#15A4C9' }) {
  return (
    <div className="shrink-0 w-[130px] md:w-[240px] bg-[#E3FFF8] shadow-[0px_-2px_4px_rgba(0,0,0,0.25)] rounded-b-lg md:rounded-b-2xl overflow-hidden">
      {/* Header color con foto */}
      <div
        className="relative w-full h-[100px] md:h-[180px] flex items-end justify-center"
        style={{
          backgroundColor: color,
          borderBottomRightRadius: '80px',
          borderBottomLeftRadius: '80px',
          boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
        }}
      >
        {/* Marco blanco circular */}
        <div className="absolute bottom-[-30px] md:bottom-[-55px] w-[70px] h-[70px] md:w-[130px] md:h-[130px] rounded-full bg-white border-4 md:border-8 border-[#E3FFF8] shadow-md flex items-center justify-center overflow-hidden">
          {persona.foto ? (
            <img
              src={persona.foto}
              alt={persona.nombre}
              className="w-[56px] h-[56px] md:w-[104px] md:h-[104px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[56px] h-[56px] md:w-[104px] md:h-[104px] rounded-full bg-[#C0D1C7] flex items-center justify-center">
              <svg className="w-8 h-8 md:w-14 md:h-14 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Nombre y cargo */}
      <div className="pt-10 md:pt-20 pb-4 md:pb-6 px-2 md:px-4 text-center">
        <p className="font-poppins text-[10px] md:text-xl text-[#407178] leading-snug">
          {persona.nombre}
        </p>
        <p className="font-poppins text-[10px] md:text-lg text-[#407178] mt-1 md:mt-2 leading-snug">
          {persona.cargo}
        </p>
      </div>
    </div>
  );
}