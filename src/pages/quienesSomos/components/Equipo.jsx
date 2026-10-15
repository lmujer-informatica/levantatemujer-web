import React from 'react';
import SeccionEquipo from './SeccionEquipo';

const COLOR_CYAN = '#15A4C9';
const COLOR_VERDE = '#BACB5E';

const secciones = [
  { key: 'directorio', titulo: 'Directorio', color: COLOR_CYAN },
  { key: 'direccionEjecutiva', titulo: 'Dirección Ejecutiva', color: COLOR_VERDE },
  { key: 'laPaz', titulo: 'La Paz', color: COLOR_CYAN },
  { key: 'elAlto', titulo: 'El Alto', color: COLOR_VERDE },
  { key: 'oruro', titulo: 'Oruro', color: COLOR_CYAN },
  { key: 'santaCruz', titulo: 'Santa Cruz', color: COLOR_VERDE },
  { key: 'sucre', titulo: 'Sucre', color: COLOR_CYAN },
  { key: 'organizacionesAliadas', titulo: 'Organizaciones Aliadas', color: COLOR_VERDE },
];

export default function Equipo({ data }) {
  return (
    <section className="w-full bg-[#EFFFFB] overflow-hidden">
      {/* Header */}
      <div className="w-full bg-[#BACB5E] py-3 md:py-6">
        <h2 className="font-montserrat italic font-medium text-[#E3FFF8] text-xl md:text-4xl lg:text-5xl text-center">
          NUESTRO EQUIPO
        </h2>
      </div>

      {/* Secciones */}
      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 md:px-10">
        {secciones.map((seccion) => {
          const miembros = data[seccion.key];
          if (!miembros || miembros.length === 0) return null;
          return (
            <SeccionEquipo
              key={seccion.key}
              titulo={seccion.titulo}
              miembros={miembros}
              color={seccion.color}
            />
          );
        })}
      </div>
    </section>
  );
}
