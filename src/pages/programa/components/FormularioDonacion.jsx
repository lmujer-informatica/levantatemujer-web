import React, { useState } from 'react';

export default function FormularioDonacion({ data, imagen }) {
  const [valores, setValores] = useState({ nombre: '', celular: '', correo: '', motivo: '' });
  const [enviado, setEnviado] = useState(false);

  const cambiar = (campo) => (e) =>
    setValores((v) => ({ ...v, [campo]: e.target.value }));

  const enviar = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  const estiloInput =
    'w-full rounded-xl border bg-white px-3.5 py-2.5 md:py-3 font-poppins font-light text-xs md:text-sm text-slate-800 outline-none transition-all duration-300 focus:border-[#15A4C9] focus:ring-2 focus:ring-[#15A4C9]/25 shadow-sm';

  return (
    <section className="w-full bg-[#F1FFFF] py-8 md:py-14 px-4">
      <div className="max-w-4xl lg:max-w-5xl mx-auto">
        <div className="w-full rounded-3xl lg:rounded-[32px] shadow-lg hover:shadow-xl transition-shadow duration-500 overflow-hidden bg-white border border-[#C0D1C7]/40">
          
          {/* Encabezado del Formulario */}
          <div className="w-full bg-[#15A4C9] py-5 md:py-7 px-5 md:px-10 flex items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-montserrat italic font-bold text-xl md:text-2xl lg:text-3xl text-white tracking-wide leading-snug">
                {data?.titulo || 'Formulario de Donación'}
              </h2>
              <p className="mt-1.5 font-poppins font-light text-xs md:text-sm text-white/95 leading-relaxed">
                {data?.frase}
              </p>
            </div>

            {imagen && (
              <div className="hidden md:block shrink-0 relative group">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md group-hover:blur-lg transition-all" />
                <img
                  src={imagen}
                  alt="Donación"
                  className="relative z-10 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover border-2 border-white/80 shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>

          {/* Cuerpo del Formulario */}
          <form onSubmit={enviar} className="p-5 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              {/* Campo Nombre */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="dn-nombre" className="font-poppins font-medium text-xs md:text-sm text-[#407178]">
                  {data?.etiquetas?.nombre || 'Nombre Completo'}
                </label>
                <input
                  id="dn-nombre"
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={valores.nombre}
                  onChange={cambiar('nombre')}
                  className={estiloInput}
                  style={{ borderColor: '#C0D1C7' }}
                />
              </div>

              {/* Campo Celular */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="dn-celular" className="font-poppins font-medium text-xs md:text-sm text-[#407178]">
                  {data?.etiquetas?.celular || 'Celular / Teléfono'}
                </label>
                <input
                  id="dn-celular"
                  type="tel"
                  required
                  placeholder="Ej. +591 70000000"
                  value={valores.celular}
                  onChange={cambiar('celular')}
                  className={estiloInput}
                  style={{ borderColor: '#C0D1C7' }}
                />
              </div>

              {/* Campo Correo */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label htmlFor="dn-correo" className="font-poppins font-medium text-xs md:text-sm text-[#407178]">
                  {data?.etiquetas?.correo || 'Correo Electrónico'}
                </label>
                <input
                  id="dn-correo"
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={valores.correo}
                  onChange={cambiar('correo')}
                  className={estiloInput}
                  style={{ borderColor: '#C0D1C7' }}
                />
              </div>

              {/* Campo Motivo */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label htmlFor="dn-motivo" className="font-poppins font-medium text-xs md:text-sm text-[#407178]">
                  {data?.etiquetas?.motivo || 'Motivo o Mensaje'}
                </label>
                <textarea
                  id="dn-motivo"
                  rows={4}
                  placeholder="Escribe aquí tu mensaje o motivo..."
                  value={valores.motivo}
                  onChange={cambiar('motivo')}
                  className={estiloInput}
                  style={{ borderColor: '#C0D1C7', resize: 'vertical' }}
                />
              </div>

            </div>

            {/* Botón y Mensaje de Confirmación */}
            <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full md:w-auto rounded-full px-8 md:px-10 py-3 font-montserrat italic font-semibold text-xs md:text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#356194]/40"
                style={{ backgroundColor: '#356194' }}
              >
                {data?.etiquetas?.boton || 'Enviar Donación'}
              </button>

              {enviado && (
                <div className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#BACB5E]/20 border border-[#859433]/40 text-[#859433] font-poppins font-medium text-xs md:text-sm transition-all duration-300">
                  <span>✓ Gracias por tu donación, nos contactaremos contigo.</span>
                </div>
              )}
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}