import React from 'react';

function TarjetaValor({ valor, invertido }) {
  const imagen = (
    <div
      className={`shrink-0 w-[140px] h-[120px] md:w-[400px] md:h-[300px] overflow-hidden border border-[#407178] ${
        invertido
          ? 'rounded-l-[50px] md:rounded-l-[80px]'
          : 'rounded-r-[50px] md:rounded-r-[80px]'
      }`}
    >
      <img
        src={valor.imagen}
        alt={valor.nombre}
        className="w-full h-full object-cover"
      />
    </div>
  );

  const texto = (
    <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-12 text-center">
      <h4
        className={`font-poppins font-semibold text-base md:text-4xl mb-2 md:mb-4 ${
          invertido ? 'text-[#15A4C9]' : 'text-[#BACB5E]'
        }`}
      >
        {valor.nombre}
      </h4>
      <p className="font-poppins text-[#407178] text-[10px] md:text-xl leading-relaxed max-w-[250px] md:max-w-[520px]">
        {valor.descripcion}
      </p>
    </div>
  );

  return (
    <div className="flex items-center">
      {invertido ? (
        <>
          {texto}
          {imagen}
        </>
      ) : (
        <>
          {imagen}
          {texto}
        </>
      )}
    </div>
  );
}

export default function Valores({ data = [] }) {
  return (
    <section className="w-full bg-[#EFFFFB] overflow-hidden">
      {/* Header */}
      <div className="w-full bg-[#15A4C9] py-3 md:py-5">
        <h2 className="font-montserrat italic font-medium text-[#E3FFF8] text-xl md:text-4xl text-center">
          NUESTROS VALORES
        </h2>
      </div>

      {/* Valores */}
      <div className="max-w-6xl mx-auto flex flex-col">
        {data.map((valor, index) => (
          <React.Fragment key={valor.nombre}>
            <div className="py-6 px-4 md:py-14 md:px-10">
              <TarjetaValor valor={valor} invertido={index % 2 === 1} />
            </div>
            {index < data.length - 1 && (
              <div className="w-full h-[1px] bg-[#407178]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}