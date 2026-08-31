import React from 'react';

export default function PasosDenuncia({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="bg-lm-bg flex flex-col items-center pb-20">
      
      {/* Barra de título principal */}
      <div className="w-full bg-lm-cyan py-6 mb-16">
        <h2 className="text-white text-3xl md:text-5xl text-center font-bold italic tracking-wider uppercase">
          PASOS PARA LA DENUNCIA
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 w-full">
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
            <div key={idx} className="flex flex-col items-center">
              
              <h3 className={`section-title ${titleColorClass} text-3xl md:text-4xl text-center mb-12`}>
                {denuncia.titulo}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-start">
                
                {/* Columna de Imagen y Ley */}
                <div className={`flex flex-col items-center text-center ${!isViolencia ? 'md:order-2' : 'md:order-1'}`}>
                  <div className={`w-full max-w-sm aspect-square border-2 ${borderColorClass} rounded-3xl p-4 mb-6 flex items-center justify-center bg-white`}>
                    <img 
                      src={denuncia.imagen} 
                      alt={denuncia.titulo} 
                      className="w-full h-full object-contain opacity-70"
                    />
                  </div>
                  {denuncia.ley && (
                    <h4 className={`${lawTitleColorClass} text-4xl italic mb-4 font-light`}>
                      {denuncia.ley}
                    </h4>
                  )}
                  {denuncia.descripcion_ley && (
                    <p className={`${lawTextColorClass} text-sm max-w-sm`}>
                      {denuncia.descripcion_ley}
                    </p>
                  )}
                </div>

                {/* Columna de Pasos */}
                <div className={`flex flex-col gap-6 ${!isViolencia ? 'md:order-1' : 'md:order-2'}`}>
                  {denuncia.pasos.map((paso, pIdx) => (
                    <div 
                      key={pIdx} 
                      className={`flex items-center border ${borderColorClass} rounded-full bg-white pr-6 shadow-sm overflow-hidden min-h-[100px]`}
                    >
                      <div className={`flex-shrink-0 w-24 h-full min-h-[100px] ${numberBgClass} text-white flex items-center justify-center text-6xl rounded-l-full mr-6`}>
                        {pIdx + 1}
                      </div>
                      <div className="flex flex-col py-3">
                        <h5 className={`${stepTitleColorClass} text-xl italic mb-1`}>
                          Paso {pIdx + 1}
                        </h5>
                        <p className={`${stepTextColorClass} text-xs leading-tight`}>
                          {paso}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
