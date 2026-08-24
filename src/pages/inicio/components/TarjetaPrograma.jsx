import React from 'react';

export default function TarjetaPrograma({ tituloFrente, tituloAtras, descripcion, imagenUrl }) {
  return (
    // Contenedor principal: define la perspectiva 3D y reacciona al hover ("group")
    <div className="group h-[380px] w-full [perspective:1000px] cursor-pointer">
      
      {/* Contenedor interno: hace el giro de 180 grados. Debe preservar el estilo 3D */}
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-lg rounded-[45px]">
        
        {/* ================= CARA FRONTAL (Gris) ================= */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#a4aba4] rounded-[45px] p-5 flex flex-col justify-end overflow-hidden">
          
          {/* Contenedor de la Imagen o Placeholder */}
          <div className="absolute inset-4 bg-[#8b9289] rounded-[35px] flex items-center justify-center overflow-hidden border-2 border-[#a4aba4]/50">
            {imagenUrl ? (
              <img src={imagenUrl} alt={tituloFrente} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-32 h-32 text-gray-300 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
              </svg>
            )}
          </div>
          
          {/* Píldora superpuesta */}
          <div className="relative z-10 w-full flex justify-center mb-3">
            <span className="bg-[#b4cb56] text-[#2c5282] text-lg font-medium px-8 py-3 rounded-full shadow-md truncate max-w-[90%] text-center">
              {tituloFrente}
            </span>
          </div>
        </div>

        {/* ================= CARA TRASERA (Verde Oliva) ================= */}
        {/* rotado 180deg por defecto para que quede de espaldas */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#a5b897] rounded-[45px] p-8 flex flex-col items-center justify-center text-center overflow-hidden border-8 border-[#b4cb56]/30">
          
          {/* Marca de agua (Placeholder gigante SVG) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[80%] h-[80%] text-white">
              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
            </svg>
          </div>

          {/* Contenido (Texto y Botón) */}
          <h3 className="text-white text-2xl font-bold mb-4 z-10 leading-tight">
            {tituloAtras}
          </h3>
          
          <p className="text-[#2c5282] text-sm font-medium mb-8 z-10 px-2 leading-snug">
            {descripcion}
          </p>
          
          <button className="bg-[#00b4d8] text-white text-lg font-medium px-10 py-3 rounded-full shadow-lg hover:bg-[#0096b4] transition-colors z-10 focus:outline-none">
            Saber más
          </button>
        </div>

      </div>
    </div>
  );
}