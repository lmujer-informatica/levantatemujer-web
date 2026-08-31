import React, { useState, useEffect } from 'react';

export default function CarruselFrases({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data || data.length === 0) return null;

  return (
    <section className="relative w-full h-[300px] md:h-[400px] bg-lm-bg flex items-center justify-center overflow-hidden">
      {data.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background image placeholder or actual image */}
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
             <img src={item.imagen} alt="Fondo carrusel" className="w-full h-full object-cover opacity-50" />
             {/* Glow effect behind text, based on Figma image */}
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-3/4 h-3/4 bg-yellow-200/40 blur-3xl rounded-full absolute"></div>
             </div>
          </div>
          <div className="relative z-10 px-4 text-center">
            <h2 className="text-white text-4xl md:text-6xl font-bold italic tracking-wide drop-shadow-md">
              {item.frase}
            </h2>
          </div>
        </div>
      ))}
      
      {/* Indicators */}
      {data.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-lm-olive' : 'bg-white/60'
              }`}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
