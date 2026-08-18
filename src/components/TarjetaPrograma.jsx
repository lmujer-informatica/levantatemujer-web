import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TarjetaPrograma({ titulo, descripcion, imagenUrl }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col group">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imagenUrl} 
          alt={`Imagen representativa de ${titulo}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{titulo}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{descripcion}</p>
        <a href="#" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors gap-2 mt-auto">
          Saber más <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
