import React from 'react';
import inicioData from '../../../data/inicio.json';
import TarjetaPrograma from './TarjetaPrograma'; // Asegúrate de que la ruta sea correcta

export default function ProgramasPrioritarios() {
  const programas = inicioData.programas || [];

  return (
    <section id="programas" className="py-16 bg-[#f0fbfb]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Título de la sección calcado al diseño */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-[#88994a] text-3xl md:text-5xl italic font-medium uppercase tracking-wide leading-tight mb-4">
            Programas Prioritarios<br />De Trabajo
          </h2>
          <div className="w-[80%] h-[2px] bg-[#88994a]"></div>
        </div>
        
        {/* Grid para las tarjetas flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-[900px]">
          
          {/* Tarjeta 1 (Puedes mapear esto si tienes más de 2) */}
          <TarjetaPrograma 
            tituloFrente="Mujeres libres de Violencia"
            tituloAtras="Respuesta a la trata de personas y migración"
            descripcion="Resumen corto del Programa. Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus"
            imagenUrl={programas[0]?.imagen} 
          />

          {/* Tarjeta 2 */}
          <TarjetaPrograma 
            tituloFrente="Empoderamiento Económico"
            tituloAtras="Fomento al trabajo digno"
            descripcion="Resumen corto del segundo Programa. Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra."
            imagenUrl={programas[1]?.imagen} 
          />
          
        </div>
      </div>
    </section>
  );
}