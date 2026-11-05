import React from 'react';

export default function SectionHeader({
  titulo,
  descripcion,
  colorTitulo,
  colorDescripcion,
  alineacion = 'center',
  subrayado = null,
}) {
  const centrado = alineacion !== 'left';

  return (
    <div className={centrado ? 'mx-auto max-w-2xl md:max-w-3xl text-center' : 'max-w-xl md:max-w-2xl text-left'}>
      <h2
        className="font-montserrat italic font-medium text-xl md:text-4xl"
        style={{ color: colorTitulo }}
      >
        {titulo}
      </h2>
      {subrayado && (
        <div
          className={`mt-1.5 h-[2px] md:h-[3px] w-40 md:w-56 ${centrado ? 'mx-auto' : ''}`}
          style={{ backgroundColor: subrayado }}
        />
      )}
      {descripcion && (
        <p
          className="mt-2 font-poppins text-xs md:text-base leading-relaxed"
          style={{ color: colorDescripcion }}
        >
          {descripcion}
        </p>
      )}
    </div>
  );
}
