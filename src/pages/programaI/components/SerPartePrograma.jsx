import React, { useState } from 'react';
import { Link } from 'react-router';
import Reveal from './Reveal';

const DEPARTAMENTOS = ['La Paz', 'El Alto', 'Oruro', 'Santa Cruz', 'Sucre'];
const PROGRAMAS = ['Programa I', 'Programa II'];

export default function SerPartePrograma({ data = {} }) {
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

  const inputCls = 'w-full rounded-lg lg:rounded-xl border border-[#859430]/50 bg-[#F1FFFF] px-3 lg:px-5 py-2 lg:py-4 text-sm lg:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 transition-shadow duration-200';
  const labelCls = 'text-xs lg:text-base font-medium';

  return (
    <section className="w-full bg-[#F1FFFF] py-0">

      {/* Section title bar */}
      <div
        className="w-full py-3 lg:py-6 px-4 flex items-center justify-center"
        style={{ backgroundColor: '#859430' }}
      >
        <h2 className="italic font-medium text-[#E3FFF8] text-xl md:text-3xl lg:text-5xl tracking-wide text-center">
          {data.titulo}
        </h2>
      </div>

      <div className="max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">

          {/* ── Left: Form ── */}
          <Reveal className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 lg:gap-7">

              {/* Full name */}
              <div className="flex flex-col gap-1 lg:gap-2">
                <label className={labelCls} style={{ color: '#859430' }}>
                  {(data.etiquetas ?? {}).nombre}
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>

              {/* Celular + Correo row */}
              <div className="grid grid-cols-2 gap-4 lg:gap-8">
                <div className="flex flex-col gap-1 lg:gap-2">
                  <label className={labelCls} style={{ color: '#859430' }}>
                    {data.etiquetas.celular}
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={form.celular}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1 lg:gap-2">
                  <label className={labelCls} style={{ color: '#859430' }}>
                    {data.etiquetas.correo}
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Departamento + Programa row */}
              <div className="grid grid-cols-2 gap-4 lg:gap-8">
                <div className="flex flex-col gap-1 lg:gap-2">
                  <label className={labelCls} style={{ color: '#859430' }}>
                    {data.etiquetas.departamento}
                  </label>
                  <select
                    name="departamento"
                    value={form.departamento}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="">Seleccionar</option>
                    {DEPARTAMENTOS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 lg:gap-2">
                  <label className={labelCls} style={{ color: '#859430' }}>
                    {data.etiquetas.programa}
                  </label>
                  <select
                    name="programa"
                    value={form.programa}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="">Seleccionar</option>
                    {PROGRAMAS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Motivo textarea */}
              <div className="flex flex-col gap-1 lg:gap-2">
                <label className={labelCls} style={{ color: '#859430' }}>
                  {data.etiquetas.motivo}
                </label>
                <textarea
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputCls} resize-none lg:min-h-[180px]`}
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-10 lg:px-16 py-2 lg:py-4 rounded-full font-medium text-white text-sm lg:text-xl hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: '#859430' }}
                >
                  {data.etiquetas.boton}
                </button>
              </div>

            </form>
          </Reveal>

          {/* ── Right: Línea de Ayuda ── */}
          <Reveal retraso={150} className="w-full md:w-auto">
            <div
              className="group w-full md:w-[220px] lg:w-[340px] rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center gap-4 lg:gap-8 p-6 md:p-8 lg:p-12 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: '#0DADD4' }}
            >
              <h3 className="text-lg md:text-xl lg:text-3xl font-medium italic text-center text-[#E3FFF8] leading-snug">
                {(data.lineaAyuda ?? {}).titulo}
              </h3>

              <Link
                to="/lineaAyuda"
                className="px-6 lg:px-10 py-2 lg:py-3.5 rounded-full font-medium text-sm lg:text-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: '#E3FFF8', color: '#407178' }}
              >
                {(data.lineaAyuda ?? {}).boton}
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
