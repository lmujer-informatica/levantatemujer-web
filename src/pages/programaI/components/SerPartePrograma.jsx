import React, { useState } from 'react';

export default function SerPartePrograma() {
  const [form, setForm] = useState({
    nombre: '',
    celular: '',
    correo: '',
    departamento: '',
    programa: '',
    motivo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend
    alert('Solicitud enviada');
  };

  return (
    <section className="w-full bg-[#F1FFFF] py-0">

      {/* Section title bar */}
      <div
        className="w-full py-3 px-4 flex items-center justify-center"
        style={{ backgroundColor: '#859430' }}
      >
        <h2 className="italic font-medium text-[#E3FFF8] text-xl md:text-3xl tracking-wide">
          SE PARTE DEL PROGRAMA
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* ── Left: Form ── */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">

            {/* Full name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: '#859430' }}>
                Nombre y Apellido
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#859430]/50 bg-[#F1FFFF] px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#859430]/40"
              />
            </div>

            {/* Celular + Correo row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: '#859430' }}>
                  Celular
                </label>
                <input
                  type="tel"
                  name="celular"
                  value={form.celular}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#859430]/50 bg-[#F1FFFF] px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#859430]/40"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: '#859430' }}>
                  Correo
                </label>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#859430]/50 bg-[#F1FFFF] px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#859430]/40"
                />
              </div>
            </div>

            {/* Departamento + Programa row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: '#859430' }}>
                  Departamento
                </label>
                <select
                  name="departamento"
                  value={form.departamento}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#859430]/50 bg-[#F1FFFF] px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 appearance-none"
                >
                  <option value="">Seleccionar</option>
                  <option>La Paz</option>
                  <option>El Alto</option>
                  <option>Oruro</option>
                  <option>Santa Cruz</option>
                  <option>Sucre</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: '#859430' }}>
                  Programa
                </label>
                <select
                  name="programa"
                  value={form.programa}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#859430]/50 bg-[#F1FFFF] px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 appearance-none"
                >
                  <option value="">Seleccionar</option>
                  <option>Programa I</option>
                  <option>Programa II</option>
                </select>
              </div>
            </div>

            {/* Motivo textarea */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: '#859430' }}>
                ¿Por qué te interesa el programa?
              </label>
              <textarea
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-[#859430]/50 bg-[#F1FFFF] px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 resize-none"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-10 py-2 rounded-full font-medium text-white text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#859430' }}
              >
                Agendar cita
              </button>
            </div>

          </form>

          {/* ── Right: Línea de Ayuda ── */}
          <div
            className="flex-shrink-0 w-full md:w-[220px] rounded-2xl flex flex-col items-center justify-center gap-4 p-6 md:p-8"
            style={{ backgroundColor: '#0DADD4' }}
          >
            <h3 className="text-lg md:text-xl font-medium italic text-center text-[#E3FFF8] leading-snug">
              Línea de Ayuda<br />Violencia
            </h3>

            <button
              className="px-6 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#E3FFF8', color: '#407178' }}
            >
              Click Aquí
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
