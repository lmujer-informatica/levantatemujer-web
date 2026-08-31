import React from 'react';

export default function Footer() {
  // Función crítica de seguridad
  const handleSafeExit = () => {
    // location.replace elimina la página actual del historial inmediato.
    // Al presionar "Atrás" desde Google, NO volverán a esta página.
    window.location.replace('https://www.google.com');
  };

  return (
    // Contenedor principal: Flex para alinear las 3 columnas y relative para el botón superpuesto
    // Sustituye bg-[#396593] por bg-lm-navy si tu tailwind.config ya tiene ese color exacto.
    <footer className="relative flex flex-col md:flex-row w-full bg-[#396593] text-white overflow-hidden min-h-[200px]">
      
      {/* Columna Izquierda: Logo y Redes (Fondo Claro) */}
      <div className="bg-[#f0fbfb] w-full md:w-[350px] flex flex-col items-center justify-center py-8 px-6 relative z-10">
        
        {/* Logo (Puedes reemplazar este div por tu etiqueta <img src={logo} /> si lo prefieres) */}
        <a href="/" className="flex items-center gap-1 mb-6">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[10px] text-lm-cyan uppercase tracking-widest leading-none mb-0.5 font-semibold">Fundación</span>
            <span className="font-bold text-2xl text-lm-cyan leading-none">Levántate</span>
            <span className="font-bold text-2xl text-lm-olive leading-none">Mujer</span>
          </div>
        </a>

        {/* Separador y Texto de Redes */}
        <div className="w-full max-w-[200px] text-center mb-4">
          <p className="text-[#396593] text-sm font-medium mb-1">Nuestras Redes</p>
          <div className="border-b-2 border-lm-cyan w-full"></div>
        </div>

        {/* Iconos de Redes Sociales */}
        <div className="flex justify-center space-x-4 w-full">
          {/* Facebook */}
          <div className="w-8 h-8 bg-[#1877F2] rounded-full text-white flex items-center justify-center font-bold text-lg shadow-xs cursor-pointer hover:opacity-90">f</div>
          {/* Instagram */}
          <div className="w-8 h-8 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-lg text-white flex items-center justify-center shadow-xs cursor-pointer hover:opacity-90">
            <div className="w-5 h-5 border-2 border-white rounded-md relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 border-2 border-white rounded-full"></div>
            </div>
          </div>
          {/* TikTok */}
          <div className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center shadow-xs cursor-pointer hover:opacity-90">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.22-2.19.49-4.46 1.89-6.08 1.48-1.74 3.73-2.73 6-2.71v4.06c-1.37.06-2.61.94-3.23 2.15-.55 1.05-.59 2.33-.07 3.4.52 1.06 1.57 1.78 2.75 1.91 1.25.11 2.56-.37 3.32-1.35.59-.76.92-1.75.92-2.73.02-3.95.01-7.9.01-11.85z"/></svg>
          </div>
          {/* LinkedIn (Añadido según la imagen) */}
          <div className="w-8 h-8 bg-[#0a66c2] rounded-md text-white flex items-center justify-center font-bold text-sm shadow-xs cursor-pointer hover:opacity-90">in</div>
        </div>
      </div>

      {/* Columnas Centrales: Centros y Contacto */}
      <div className="flex-1 flex flex-row justify-center md:justify-start gap-12 md:gap-32 py-10 px-8 md:pl-16 relative z-10">
        <div>
          <h3 className="text-xl font-semibold mb-4">Centros</h3>
          {/* Usamos list-disc para los puntos nativos igual a la imagen */}
          <ul className="list-disc ml-5 space-y-2">
            <li className="text-base font-light">La Paz</li>
            <li className="text-base font-light">El Alto</li>
            <li className="text-base font-light">Oruro</li>
            <li className="text-base font-light">Santa Cruz</li>
            <li className="text-base font-light">Sucre</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contacto</h3>
          <ul className="space-y-4">
            <li className="text-base font-light">2 2410025</li>
            <li className="text-base font-light">+591 60025000</li>
            <li className="text-base font-light underline underline-offset-4 cursor-pointer hover:text-gray-200">info@levantatemujer.com</li>
          </ul>
        </div>
      </div>

      {/* Botón de Salida Segura (Sección Derecha) 
          Sustituye bg-[#a6c152] por bg-lm-olive si lo deseas */}
      {/*   
      <button 
        onClick={handleSafeExit}
        title="Salir de esta página de inmediato"
        className="md:absolute right-0 top-0 bottom-0 w-full md:w-[320px] lg:w-[450px] bg-[#a6c152] md:rounded-l-[250px] flex items-center justify-center shadow-[-10px_0_20px_rgba(0,0,0,0.15)] z-20 cursor-pointer hover:bg-[#9cb64c] transition-all duration-300 group focus:outline-hidden focus:ring-4 focus:ring-red-500"
      >
        <div className="flex flex-col items-center mt-2 md:mt-0 md:ml-12">
          <span className="text-white text-5xl lg:text-[4rem] italic font-bold leading-tight transform -skew-x-6 drop-shadow-lg group-hover:scale-105 transition-transform">
            Salida
          </span>
          <span className="text-white text-5xl lg:text-[4rem] italic font-bold leading-tight transform -skew-x-6 drop-shadow-lg group-hover:scale-105 transition-transform">
            Segura
          </span>
        </div>
      </button>
      */}

    </footer>
  );
}