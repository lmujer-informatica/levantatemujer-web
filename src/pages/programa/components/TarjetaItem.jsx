import React from 'react';

export default function TarjetaItem({
  item = {},
  colorTitulo,
  colorTexto,
  colorBorde,
  colorFondo,
  colorBoton,
}) {
  if (item.descargable) {
    return (
      <article
        className="flex-1 min-w-0 relative rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center px-2 py-4 min-h-[150px] md:min-h-[210px]"
        style={{ backgroundColor: colorFondo }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 md:gap-3 rounded-[20px] border-[1.5px] border-[#F1FFFF] px-3 py-3 text-center">
          <h3 className="text-white font-montserrat italic font-semibold text-xs md:text-lg">
            {item.titulo}
          </h3>
          <button
            type="button"
            className="rounded-[10px] px-4 md:px-6 py-1 md:py-1.5 text-white font-montserrat italic font-medium text-[10px] md:text-sm"
            style={{ backgroundColor: colorBoton }}
          >
            Descargar
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      className="flex-1 min-w-0 relative rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center px-2 py-4 min-h-[150px] md:min-h-[210px]"
      style={{ backgroundColor: '#E3FFF8' }}
    >
      <div className="absolute inset-[6px] rounded-[12px] border" style={{ borderColor: colorBorde }} />
      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 md:gap-2.5 text-center px-3 py-2">
        <h3 className="font-montserrat italic font-semibold text-xs md:text-lg" style={{ color: colorTitulo }}>
          {item.titulo}
        </h3>
        <p className="font-poppins font-light text-[9px] md:text-xs leading-snug" style={{ color: colorTexto }}>
          {item.resumen}
        </p>
      </div>
    </article>
  );
}