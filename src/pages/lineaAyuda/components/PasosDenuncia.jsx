import React from 'react';
import Reveal from './Reveal';

export default function PasosDenuncia({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="bg-lm-bg flex flex-col items-center pb-20 md:pb-24">

      {/* Barra de título principal */}
      <div className="w-full bg-lm-cyan py-6 md:py-8 mb-12 md:mb-16">
        <h2 className="text-white text-3xl md:text-5xl text-center font-bold italic tracking-wider uppercase px-4">
          PASOS PARA LA DENUNCIA
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col gap-16 md:gap-24 w-full">
        {data.map((denuncia, idx) => {
          const isViolencia = idx === 0;

          // Tema por defecto: Trata (Olive) o Violencia (Cyan/Navy)
          const titleColorClass = isViolencia ? 'section-title-navy' : 'section-title-olive';
          const borderColorClass = isViolencia ? 'border-lm-cyan' : 'border-lm-olive';
          const numberBgClass = isViolencia ? 'bg-[#2a7b8e]' : 'bg-[#b4c95a]'; // Aproximado visualmente
          const stepTitleColorClass = isViolencia ? 'text-lm-navy' : 'text-lm-olive';
          const stepTextColorClass = isViolencia ? 'text-lm-cyan' : 'text-lm-olive';
          const lawTitleColorClass = isViolencia ? 'text-lm-cyan' : 'text-lm-olive';
          const lawTextColorClass = isViolencia ? 'text-lm-navy' : 'text-lm-olive';

          return (
            <Reveal key={idx}>
              <div className="flex flex-col items-center">

                <h3 className={`section-title ${titleColorClass} text-3xl md:text-5xl text-center mb-10 md:mb-12`}>
                  {denuncia.titulo}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 w-full items-start">

                  {/* Columna de Imagen y Ley */}
                  <div className={`flex flex-col items-center text-center ${!isViolencia ? 'md:order-2' : 'md:order-1'}`}>
                    <div className={`w-full max-w-sm md:max-w-md aspect-square border-2 ${borderColorClass} rounded-3xl p-4 md:p-6 mb-6 flex items-center justify-center bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-[1.02]`}>
                      <img
                        src={denuncia.imagen}
                        alt={denuncia.titulo}
                        className="w-full h-full object-contain opacity-70"
                      />
                    </div>
                    {denuncia.ley && (
                      <h4 className={`${lawTitleColorClass} text-4xl md:text-5xl italic mb-4 font-light`}>
                        {denuncia.ley}
                      </h4>
                    )}
                    {denuncia.descripcion_ley && (
                      <p className={`${lawTextColorClass} text-sm md:text-base max-w-sm md:max-w-md`}>
                        {denuncia.descripcion_ley}
                      </p>
                    )}
                  </div>

                  {/* Columna de Pasos */}
                  <div className={`flex flex-col gap-6 md:gap-7 ${!isViolencia ? 'md:order-1' : 'md:order-2'}`}>
                    {(denuncia.pasos ?? []).map((paso, pIdx) => (
                      <Reveal key={pIdx} retraso={pIdx * 100}>
                        <div
                          className={`flex items-center border-2 ${borderColorClass} rounded-full bg-white pr-6 md:pr-8 shadow-md overflow-hidden min-h-[100px] md:min-h-[120px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                        >
                          <div className={`flex-shrink-0 w-24 md:w-28 h-full min-h-[100px] md:min-h-[120px] ${numberBgClass} text-white flex items-center justify-center text-6xl md:text-7xl rounded-l-full mr-6`}>
                            {pIdx + 1}
                          </div>
                          <div className="flex flex-col py-3 md:py-4">
                            <h5 className={`${stepTitleColorClass} text-xl md:text-2xl italic mb-1`}>
                              Paso {pIdx + 1}
                            </h5>
                            <p className={`${stepTextColorClass} text-xs md:text-sm leading-snug`}>
                              {paso}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
