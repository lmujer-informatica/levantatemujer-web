import React from 'react';

export default function Descripcion({ data, imagen, imagenLineas, imagenActividades }) {
  // Función para realizar scroll suave hasta la sección indicada
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const imgLineas = imagenLineas || imagen;
  const imgActividades = imagenActividades || imagen;

  return (
    <section className="w-full bg-[#F1FFFF] py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center justify-center gap-x-3 md:gap-x-0 gap-y-5">

        {/* Figura Central - Programa */}
        <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-1 order-1 relative z-20 bg-[#0DADD4] rounded-t-[70px] sm:rounded-t-[90px] md:rounded-t-[120px] lg:rounded-t-[150px] xl:rounded-t-[170px] px-5 sm:px-7 md:px-8 lg:px-10 xl:px-12 py-7 sm:py-9 md:py-11 lg:py-13 xl:py-14 w-full md:w-[420px] lg:w-[550px] xl:w-[640px] text-center shadow-2xl border-t-4 border-white/30">
          <h2 className="text-white font-montserrat italic font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide leading-snug">
            {data?.titulo}
          </h2>

          <p className="mt-3 sm:mt-4 md:mt-5 text-white/95 font-poppins font-light text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed md:leading-loose">
            {data?.texto}
          </p>
        </div>

        {/* Recuadro Izquierdo - Líneas Estratégicas */}
        <button
          type="button"
          onClick={() => scrollToSection('lineas-estrategicas')}
          className="relative z-10 col-span-1 md:col-span-1 md:col-start-1 md:row-start-1 order-2 justify-self-end -mr-0 md:-mr-3 lg:-mr-6 group cursor-pointer transition-all duration-500 hover:-translate-x-2 focus:outline-none text-left"
        >
          <div className="w-[145px] xs:w-[155px] sm:w-[175px] md:w-[210px] lg:w-[270px] xl:w-[320px] h-[190px] xs:h-[205px] sm:h-[225px] md:h-[280px] lg:h-[340px] xl:h-[380px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative shadow-xl border-4 border-white bg-slate-900">
            <img
              src={imgLineas}
              alt="Líneas Estratégicas"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-95"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-7 text-white z-10">
              <span className="inline-block px-2 sm:px-3 py-1 bg-[#BACB5E] text-slate-900 font-montserrat font-bold text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full uppercase tracking-wider mb-2 shadow-sm">
                Ver sección ↓
              </span>

              <p className="font-montserrat italic font-bold text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-tight drop-shadow-md whitespace-pre-line">
                {data?.etiquetaLineas || 'Líneas\nEstratégicas'}
              </p>
            </div>
          </div>
        </button>

        {/* Recuadro Derecho - Actividades */}
        <button
          type="button"
          onClick={() => scrollToSection('seccion-actividades')}
          className="relative z-10 col-span-1 md:col-span-1 md:col-start-3 md:row-start-1 order-3 justify-self-start -ml-0 md:-ml-3 lg:-ml-6 group cursor-pointer transition-all duration-500 hover:translate-x-2 focus:outline-none text-right"
        >
          <div className="w-[145px] xs:w-[155px] sm:w-[175px] md:w-[210px] lg:w-[270px] xl:w-[320px] h-[190px] xs:h-[205px] sm:h-[225px] md:h-[280px] lg:h-[340px] xl:h-[380px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative shadow-xl border-4 border-white bg-slate-900">
            <img
              src={imgActividades}
              alt="Actividades"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-95"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-7 text-white z-10 flex flex-col items-end">
              <span className="inline-block px-2 sm:px-3 py-1 bg-[#BACB5E] text-slate-900 font-montserrat font-bold text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs rounded-full uppercase tracking-wider mb-2 shadow-sm">
                Ver sección ↓
              </span>

              <p className="font-montserrat italic font-bold text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-tight drop-shadow-md whitespace-pre-line max-w-[95%]">
                {data?.etiquetaActividades || 'Actividades'}
              </p>
            </div>
          </div>
        </button>

      </div>
    </section>
  );
}