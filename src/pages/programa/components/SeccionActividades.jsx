import React from 'react';

function TarjetaActividad({ actividad, color, imagenFallback }) {
  const src = actividad.imagen || imagenFallback;
  return (
    <article className="group relative flex flex-col h-full bg-[#E3FFF8] rounded-[30px] lg:rounded-[50px] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-white/60">
      
      {/* Contenedor Superior Blanco (Fondo de la Imagen) */}
      <div className="w-full bg-white flex justify-center pt-6 pb-5 md:pt-10 md:pb-8 rounded-b-[30px] lg:rounded-b-[50px] shadow-sm relative z-10 transition-colors duration-500 group-hover:bg-slate-50">
        <img
          src={src}
          alt={actividad.nombre}
          className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] lg:w-[160px] lg:h-[160px] xl:w-[200px] xl:h-[200px] rounded-full object-cover border-[5px] lg:border-[8px] border-white shadow-xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
          loading="lazy"
        />
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="px-5 md:px-8 lg:px-10 pb-8 lg:pb-12 flex flex-col items-center flex-1 relative z-0">
        <span
          className="mt-6 lg:mt-8 rounded-full px-5 lg:px-8 py-1.5 lg:py-2 text-white font-montserrat font-bold text-xs sm:text-sm lg:text-base xl:text-lg text-center shadow-md transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: color }}
        >
          {actividad.nombre}
        </span>
        
        {/* Usamos font-medium para mejorar el contraste del texto coloreado */}
        <p
          className="mt-4 lg:mt-6 text-center font-poppins font-medium text-sm lg:text-base xl:text-lg leading-relaxed lg:leading-loose transition-all duration-300"
          style={{ color: color }}
        >
          {actividad.descripcion}
        </p>
      </div>
    </article>
  );
}

export default function SeccionActividades({ ciudades = [], ciudadActiva, onChangeCiudad, imagenFallback }) {
  const colores = ['#15A4C9', '#BACB5E', '#15A4C9'];
  const ciudad = ciudades[ciudadActiva] ?? { actividades: [] };

  return (
    <section id="seccion-actividades" className="w-full scroll-mt-6">
      {/* Banner de Título */}
      <div className="w-full py-6 md:py-10 shadow-inner" style={{ backgroundColor: '#BACB5E' }}>
        <h2 className="text-center font-montserrat italic font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white tracking-wider drop-shadow-md">
          ACTIVIDADES
        </h2>
      </div>

      <div className="w-full bg-gradient-to-b from-[#F1FFFF] to-[#E3FFF8] pt-2 pb-10 md:pb-20">
        
        {/* Selector de Ciudades (Tabs) */}
        <div className="max-w-5xl mx-auto overflow-x-auto scrollbar-hide touch-pan-x mb-6 md:mb-10">
          <div className="flex items-center justify-start md:justify-center gap-6 md:gap-12 px-6 py-4 min-w-max md:min-w-0 mx-auto">
            {ciudades.map((c, i) => {
              const activa = i === ciudadActiva;
              return (
                <button
                  key={c.nombre}
                  type="button"
                  onClick={() => onChangeCiudad(i)}
                  aria-pressed={activa}
                  className={`group relative whitespace-nowrap font-montserrat italic font-semibold text-base md:text-xl lg:text-2xl transition-all duration-300 px-2 pb-2 ${
                    activa ? 'scale-105' : 'text-[#407178] opacity-50 hover:opacity-80 hover:scale-105'
                  }`}
                  style={{ color: activa ? '#356194' : undefined }}
                >
                  {c.nombre}
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[3px] md:h-[4px] rounded-full transition-all duration-300 ${
                      activa ? 'opacity-100 w-full' : 'opacity-0 w-0 group-hover:w-full group-hover:opacity-30'
                    }`}
                    style={{ backgroundColor: '#356194' }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Cuadrícula de Tarjetas */}
        {/* En móvil es 1 columna, en tablets 2, y en desktop 3, evitando que se amontonen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-14">
            {(ciudad.actividades ?? []).map((a, i) => (
              <TarjetaActividad
                key={a.nombre + i}
                actividad={a}
                color={colores[i % colores.length]}
                imagenFallback={imagenFallback}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}