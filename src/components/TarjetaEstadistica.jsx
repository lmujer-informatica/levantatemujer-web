import React from 'react';

export default function TarjetaEstadistica({ valor, etiqueta, icono }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
      <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mb-6">
        {icono}
      </div>
      <h3 className="text-4xl font-bold text-gray-900 mb-2">{valor}</h3>
      <p className="text-gray-600 font-medium">{etiqueta}</p>
    </div>
  );
}
