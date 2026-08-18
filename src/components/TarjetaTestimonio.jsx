import React from 'react';
import { Quote } from 'lucide-react';

export default function TarjetaTestimonio({ testimonio, autor, rol, imagenUrl }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative mt-10">
      <div className="absolute -top-10 left-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
          <img src={imagenUrl} alt={autor} className="w-full h-full object-cover" />
        </div>
      </div>
      <Quote className="w-10 h-10 text-primary/20 absolute top-8 right-8" />
      <div className="pt-10">
        <p className="text-gray-700 italic mb-6 text-lg relative z-10">
          "{testimonio}"
        </p>
        <div>
          <h4 className="font-bold text-gray-900">{autor}</h4>
          <span className="text-sm text-gray-500">{rol}</span>
        </div>
      </div>
    </div>
  );
}
