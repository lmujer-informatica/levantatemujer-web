import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-lm-navy text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-10">
          
          {/* Columna Izquierda: Logo y Redes */}
          <div className="flex flex-col items-center bg-white p-6 pb-4 rounded-xl w-[200px]">
            <a href="/" className="flex items-center gap-1 mb-2">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[9px] text-lm-cyan uppercase tracking-widest leading-none mb-0.5">Fundación</span>
                <span className="font-bold text-lg text-lm-cyan leading-none">Levántate</span>
                <span className="font-bold text-lg text-lm-olive leading-none">Mujer</span>
              </div>
            </a>
            <div className="w-full border-t border-gray-300 mb-2 mt-1"></div>
            <p className="text-gray-600 text-xs mb-3 text-center">Nuestras Redes</p>
            <div className="flex justify-center space-x-4 w-full">
              {/* Fake icons for Facebook, Instagram, TikTok based on Figma shapes */}
              <div className="w-6 h-6 bg-[#1877F2] rounded-full text-white flex items-center justify-center font-bold text-xs shadow-sm">f</div>
              <div className="w-6 h-6 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-[6px] text-white flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 border-2 border-white rounded-[4px] relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 border-2 border-white rounded-full"></div>
                </div>
              </div>
              <div className="w-6 h-6 bg-black rounded-full text-white flex items-center justify-center shadow-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.22-2.19.49-4.46 1.89-6.08 1.48-1.74 3.73-2.73 6-2.71v4.06c-1.37.06-2.61.94-3.23 2.15-.55 1.05-.59 2.33-.07 3.4.52 1.06 1.57 1.78 2.75 1.91 1.25.11 2.56-.37 3.32-1.35.59-.76.92-1.75.92-2.73.02-3.95.01-7.9.01-11.85z"/></svg>
              </div>
            </div>
          </div>

          {/* Columnas Centrales: Centros y Contacto */}
          <div className="flex flex-row gap-16 md:gap-24 ml-0 md:ml-12 w-full md:w-auto">
            <div>
              <h3 className="text-lg font-medium mb-4">Centros</h3>
              <ul className="space-y-2">
                <li className="text-sm font-light flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span> La Paz</li>
                <li className="text-sm font-light flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span> El Alto</li>
                <li className="text-sm font-light flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span> Oruro</li>
                <li className="text-sm font-light flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span> Santa Cruz</li>
                <li className="text-sm font-light flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span> Sucre</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Contacto</h3>
              <ul className="space-y-4">
                <li className="text-sm font-light">2 2410025</li>
                <li className="text-sm font-light">+591 60025000</li>
                <li className="text-sm font-light underline underline-offset-4">info@levantatemujer.com</li>
              </ul>
            </div>
          </div>

          {/* Este div vacío empuja el contenido de la derecha si es necesario */}
          <div className="hidden md:block flex-1"></div>
        </div>
      </div>

      {/* Forma Gigante Derecha "Salida Segura" */}
      <div className="absolute right-0 bottom-0 w-[450px] h-[350px] bg-lm-olive rounded-tl-[200px] flex items-center justify-center overflow-hidden z-0 shadow-[-10px_-10px_30px_rgba(0,0,0,0.15)]">
         <div className="flex flex-col items-center mt-10 ml-20">
           <h2 className="text-white text-[3rem] italic font-bold leading-tight transform -skew-x-6">Salida</h2>
           <h2 className="text-white text-[3.5rem] italic font-bold leading-tight transform -skew-x-6 -mt-2">Segura</h2>
         </div>
      </div>
    </footer>
  );
}
