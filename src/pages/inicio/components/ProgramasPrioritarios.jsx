import React from 'react';
import inicioData from '../../../data/inicio.json';
import TarjetaPrograma from './TarjetaPrograma'; // Asegúrate de que la ruta sea correcta
import Reveal from './Reveal';

export default function ProgramasPrioritarios() {
  const programas = inicioData.programas || [];

  return (
    <section id="programas" className="py-16 bg-[#f0fbfb]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Título de la sección calcado al diseño */}
        <Reveal className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-[#88994a] text-3xl md:text-5xl italic font-medium uppercase tracking-wide leading-tight mb-4">
            Programas Prioritarios<br />De Trabajo
          </h2>
          <div className="w-[80%] h-[2px] bg-[#88994a]"></div>
        </Reveal>
        
        {/* Grid para las tarjetas flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-[900px]">
          
          {/* Tarjeta 1 (Mujeres Libres de Violencia) */}
          <TarjetaPrograma 
            tituloFrente="Mujeres Libres de Violencia"
            tituloAtras="Mujeres Libres de Violencia"
            descripcion="Trabajamos activamente en la prevención y atención integral a mujeres víctimas de violencia, brindando acompañamiento psicológico, asesoría legal y espacios seguros de contención."
            imagenUrl={programas[0]?.imagen} 
            linkUrl="/programaI"
          />
          </Reveal>

          {/* Tarjeta 2 (Respuesta a la Trata e Inmigración) */}
          <TarjetaPrograma 
            tituloFrente="Respuesta a la Trata e Inmigración"
            tituloAtras="Respuesta a la Trata e Inmigración"
            descripcion="Promovemos la protección y el acompañamiento integral de personas en situación de trata y migración, brindando orientación, asistencia y herramientas para fortalecer sus derechos, seguridad y oportunidades de integración."
            imagenUrl={programas[1]?.imagen} 
            linkUrl="/programaII"
          />
          </Reveal>
          
        </div>
      </div>
    </section>
  );
}