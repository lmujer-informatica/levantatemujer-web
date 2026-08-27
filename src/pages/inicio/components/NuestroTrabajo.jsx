import React from 'react';

export default function NuestroTrabajo() {
  return (
    <section className="py-20 bg-[#EAF7FA]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <h2 className="section-title section-title-navy text-3xl md:text-4xl text-center mb-16">
          NUESTRO TRABAJO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Columna Izquierda: Testimonios */}
          <div className="flex flex-col h-[500px]">
            <div className="bg-lm-cyan text-white text-center py-4 rounded-t-[30px] rounded-b-md shadow-xs z-10">
              <h3 className="text-2xl font-light">Testimonios</h3>
            </div>
            <div className="bg-[#eafafa] flex-1 rounded-b-[30px] border border-[#d0f0f0] -mt-2 pt-8 p-6 flex flex-col items-center shadow-md">
              <div className="w-[85%] h-40 bg-gray-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-20 h-20 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <p className="text-lm-olive font-medium text-center mb-6">Fecha de publicación</p>
              <h4 className="text-lm-cyan text-xl font-light text-center leading-tight">Título del<br/>testimonio</h4>
            </div>
          </div>

          {/* Columna Centro: Noticias */}
          <div className="flex flex-col h-[500px] shadow-lg rounded-[40px] overflow-hidden">
            <div className="bg-lm-cyan flex-1 flex flex-col items-center justify-center p-8 rounded-b-[50px] z-10 shadow-md">
              <p className="text-white font-medium mb-4">Encuentra esta y más</p>
              <h3 className="text-white text-4xl font-light mb-6">Noticias</h3>
              <a href="#" className="text-lm-olive text-xl font-medium underline underline-offset-4 decoration-2 hover:text-white transition-colors">
                Click Aquí
              </a>
            </div>
            <div className="h-48 bg-white flex items-center justify-center pt-8 pb-4">
              <div className="w-[70%] h-full bg-gray-400 rounded-lg flex items-center justify-center mt-[-30px] relative z-0">
                <svg className="w-16 h-16 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Eventos */}
          <div className="flex flex-col h-[500px]">
            <div className="bg-lm-cyan text-white text-center py-4 rounded-t-[30px] rounded-b-md shadow-xs z-10">
              <h3 className="text-2xl font-light">Eventos</h3>
            </div>
            <div className="bg-[#eafafa] flex-1 rounded-b-[30px] border border-[#d0f0f0] -mt-2 pt-8 p-6 flex flex-col items-center shadow-md">
              <div className="w-[85%] h-40 bg-gray-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-20 h-20 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <p className="text-lm-olive font-medium text-center mb-6">Fecha del<br/>evento</p>
              <h4 className="text-lm-cyan text-xl font-light text-center leading-tight">Título del<br/>evento</h4>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
