import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function TarjetaNoticia({ titulo, resumen, fecha, imagenUrl }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col group">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imagenUrl} 
          alt={titulo} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-3 gap-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={fecha}>{fecha}</time>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{titulo}</h3>
        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{resumen}</p>
        <a href="#" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors gap-2 mt-auto">
          Leer noticia <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
