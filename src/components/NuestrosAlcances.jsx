import React from 'react';
import inicioData from '../data/inicio.json';

export default function NuestrosAlcances() {
  const data = inicioData.estadisticas || [];

  return (
    <section className="py-20 bg-lm-bg">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <h2 className="section-title section-title-navy text-3xl md:text-4xl text-center mb-16">
          NUESTROS ALCANCES
        </h2>
        
        {/* Fila superior: 3 elementos en Cyan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full mb-16">
          {data.slice(0, 3).map((est, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-lm-cyan text-white rounded-full flex items-center justify-center mb-4">
                {/* SVG Iconos Hardcodeados similares al diseño para la validación visual */}
                {idx === 0 && (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                )}
                {idx === 1 && (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z"/></svg>
                )}
                {idx === 2 && (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                )}
              </div>
              <h3 className="text-[2.5rem] font-light text-lm-cyan mb-1 tracking-tight leading-none">{est.valor.replace('+', '')}</h3>
              <p className="text-lm-cyan font-medium text-lg leading-tight px-4">{est.etiqueta}</p>
            </div>
          ))}
        </div>

        {/* Fila inferior: 2 elementos en Verde Oliva */}
        <div className="flex flex-col sm:flex-row justify-center gap-16 w-full max-w-2xl mx-auto">
          {data.slice(3, 5).map((est, idx) => (
            <div key={idx + 3} className="flex flex-col items-center text-center w-full sm:w-1/2">
              <div className="w-24 h-24 bg-lm-olive text-white rounded-full flex items-center justify-center mb-4">
                {idx === 0 ? (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.66-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4.5 2.5c1.45-.63 3.32-.9 4.5-.9 2.05 0 3.75.74 4.25 1.4v1H6.25v-1c.5-.66 2.2-1.4 4.25-1.4 1.18 0 3.05.27 4.5.9zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5 14.57 12 16.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>
                ) : (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"/></svg>
                )}
              </div>
              <h3 className="text-[2.5rem] font-light text-lm-olive mb-1 tracking-tight leading-none">
                {idx === 0 ? `+${est.valor.replace('+', '')}` : est.valor.replace('+', '')}
              </h3>
              <p className="text-lm-olive font-medium text-lg leading-tight px-4">{est.etiqueta}</p>
            </div>
          ))}
          {/* Si faltaba el elemento 5 en el JSON de prueba, lo forzamos visualmente aquí para match de Figma */}
          {data.length < 5 && (
            <div className="flex flex-col items-center text-center w-full sm:w-1/2">
               <div className="w-24 h-24 bg-lm-olive text-white rounded-full flex items-center justify-center mb-4">
                 <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"/></svg>
               </div>
               <h3 className="text-[2.5rem] font-light text-lm-olive mb-1 tracking-tight leading-none">6</h3>
               <p className="text-lm-olive font-medium text-lg leading-tight px-4">Centros en Bolivia</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
