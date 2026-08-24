import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

export default function TarjetaEvento({ titulo, fecha, hora, lugar, imagenUrl }) {
  return (
    <article className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
      <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden relative flex-shrink-0">
        <img 
          src={imagenUrl} 
          alt={titulo} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col justify-center flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{titulo}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 text-sm gap-3">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{fecha}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <span>{hora}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm gap-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{lugar}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
