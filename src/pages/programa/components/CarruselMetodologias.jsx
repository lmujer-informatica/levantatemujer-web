import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TarjetaItem from './TarjetaItem';

export default function CarruselMetodologias({ items = [] }) {
  const scrollRef = useRef(null);

  // Navegación con flechas en Desktop
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Datos estáticos de respaldo si aún no llegan del backend
  const listaItems = items.length > 0 ? items : [
    {
      titulo: 'Prevención Comunitaria',
      descripcion: 'Talleres formativos y metodologías de empoderamiento para lideresas locales.',
      imagen: '',
      enlace: '#'
    },
    {
      titulo: 'Redes de Apoyo',
      descripcion: 'Modelos de intervención rápida y acompañamiento integral en territorio.',
      imagen: '',
      enlace: '#'
    },
    {
      titulo: 'Herramientas Digitales',
      descripcion: 'Plataformas de información y orientación segura de fácil acceso.',
      imagen: '',
      enlace: '#'
    }
  ];

  return (
    <section className="w-full scroll-mt-6">
      {/* Banner de Encabezado */}
      <div className="w-full py-6 md:py-10 shadow-inner" style={{ backgroundColor: '#356194' }}>
        <h2 className="text-center font-montserrat italic font-bold text-xl md:text-3xl lg:text-4xl xl:text-5xl text-white tracking-wider drop-shadow-md">
          METODOLOGÍAS DE PREVENCIÓN
        </h2>
      </div>

      {/* Contenedor del Carrusel */}
      <div className="w-full bg-[#F1FFFF] py-8 md:py-16 lg:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto relative group/carrusel">
          
          {/* Botón Flecha Izquierda (Desktop) */}
          {listaItems.length > 3 && (
            <button
              type="button"
              onClick={() => scroll('left')}
              className="hidden md:flex absolute -left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-xl items-center justify-center text-[#356194] hover:bg-[#356194] hover:text-white transition-all duration-300 border-2 border-[#356194] focus:outline-none"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-7 h-7 lg:w-8 lg:h-8" />
            </button>
          )}

          {/* Lista Desplazable: TÁCTIL en Móvil, Grid/Slider en Desktop */}
          <div
            ref={scrollRef}
            className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 lg:gap-10 overflow-x-auto md:overflow-hidden snap-x snap-mandatory scrollbar-hide touch-pan-x py-4 px-2 -mx-2"
          >
            {listaItems.map((item, i) => (
              <div
                key={item.id || item.titulo + i}
                className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-center flex"
              >
                <TarjetaItem
                  item={item}
                  colorTitulo="#356194"
                  colorTexto="#356194"
                  colorBorde="#356194"
                  colorFondo="#0DADD4"
                  colorBoton="#356194"
                />
              </div>
            ))}
          </div>

          {/* Botón Flecha Derecha (Desktop) */}
          {listaItems.length > 3 && (
            <button
              type="button"
              onClick={() => scroll('right')}
              className="hidden md:flex absolute -right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-xl items-center justify-center text-[#356194] hover:bg-[#356194] hover:text-white transition-all duration-300 border-2 border-[#356194] focus:outline-none"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-7 h-7 lg:w-8 lg:h-8" />
            </button>
          )}

          {/* Indicador táctil deslizable solo visible en móvil */}
          <div className="flex md:hidden justify-center items-center gap-1.5 mt-4 text-[#356194] font-poppins text-xs opacity-75">
            <span>← Desliza horizontalmente →</span>
          </div>

        </div>
      </div>
    </section>
  );
}