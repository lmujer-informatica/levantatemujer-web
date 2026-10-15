import React, { useState } from 'react';

export default function Identidad({ data }) {
  const [hoverMision, setHoverMision] = useState(false);
  const [hoverVision, setHoverVision] = useState(false);

  return (
    <section className="w-full bg-[#F1FFFF] overflow-hidden">
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-0 px-6 py-10 md:px-14 lg:px-20 md:py-16">
        {/* Nuestra Historia */}
        <div className="w-full md:w-[46%] flex flex-col md:pr-10">
          <h3 className="font-montserrat italic font-medium text-[#15A4C9] text-xl md:text-3xl lg:text-4xl mb-3">
            {data.historia.titulo}
          </h3>
          <div className="w-40 md:w-56 h-[2px] md:h-[3px] bg-[#15A4C9] mb-6 md:mb-10" />
          <p
            className="font-poppins text-[#407178] text-xs md:text-lg lg:text-xl leading-relaxed text-justify"
            style={{ lineHeight: '1.8' }}
          >
            {data.historia.texto}
          </p>
        </div>

        {/* Línea divisora vertical - solo desktop */}
        <div className="hidden md:block w-[1px] bg-[#407178] self-stretch my-2" />

        {/* Misión y Visión */}
        <div className="w-full md:w-[54%] flex flex-col gap-6 md:gap-12 md:pl-6">
          {/* Misión */}
          <div
            className={`relative flex items-start gap-4 md:gap-8 transition-transform duration-300 ease-out ${
              hoverMision ? 'md:scale-110 z-10' : 'z-0'
            }`}
          >
            <div
              className="shrink-0 relative cursor-pointer"
              onMouseEnter={() => setHoverMision(true)}
              onMouseLeave={() => setHoverMision(false)}
            >
              <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-[#BACB5E] shadow-lg flex items-center justify-center">
                <svg className="w-8 h-8 md:w-16 md:h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
            </div>
            <div className="bg-[#EFFFFB] rounded-tr-3xl rounded-br-3xl border border-[#407178] shadow-md p-4 md:p-8 flex-1">
              <h4 className="font-montserrat italic font-medium text-[#BACB5E] text-lg md:text-3xl mb-2 md:mb-4">
                {data.mision.titulo}
              </h4>
              <p className="font-poppins text-[#407178] text-[10px] md:text-base lg:text-lg leading-relaxed text-justify">
                {data.mision.texto}
              </p>
            </div>
          </div>

          {/* Visión */}
          <div
            className={`relative flex items-start gap-4 md:gap-8 transition-transform duration-300 ease-out ${
              hoverVision ? 'md:scale-110 z-10' : 'z-0'
            }`}
          >
            <div
              className="shrink-0 relative cursor-pointer"
              onMouseEnter={() => setHoverVision(true)}
              onMouseLeave={() => setHoverVision(false)}
            >
              <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-[#15A4C9] shadow-lg flex items-center justify-center">
                <svg className="w-8 h-8 md:w-16 md:h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
            <div className="bg-[#E3FFF8] rounded-tr-3xl rounded-br-3xl border border-[#407178] shadow-[-4px_4px_4px_rgba(0,0,0,0.25)] p-4 md:p-8 flex-1">
              <h4 className="font-montserrat italic font-medium text-[#15A4C9] text-lg md:text-3xl mb-2 md:mb-4">
                {data.vision.titulo}
              </h4>
              <p className="font-poppins text-[#407178] text-[10px] md:text-base lg:text-lg leading-relaxed text-justify">
                {data.vision.texto}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}