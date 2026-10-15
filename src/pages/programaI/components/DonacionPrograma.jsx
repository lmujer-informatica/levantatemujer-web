import React, { useState } from 'react';

export default function DonacionPrograma() {
  const [form, setForm] = useState({
    nombre: '',
    celular: '',
    correo: '',
    motivo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'celular') {
      const sanitized = value.replace(/[^0-9+\s-]/g, '');
      setForm((prev) => ({ ...prev, [name]: sanitized }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim());
  const isFormValid =
    form.nombre.trim().length > 0 &&
    form.celular.trim().length >= 6 &&
    isEmailValid &&
    form.motivo.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    alert('Donación registrada con éxito. ¡Muchas gracias por tu apoyo!');
    setForm({
      nombre: '',
      celular: '',
      correo: '',
      motivo: '',
    });
  };

  return (
    <section className="w-full bg-[#EFFFFA] py-8 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* ── Left: Donation form ── */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 w-full">

            {/* Title */}
            <h2 className="text-lg md:text-2xl font-medium italic" style={{ color: '#0DADD4' }}>
              Haz Una Donación al Programa
            </h2>

            {/* Full name / org */}
            <div className="flex flex-col gap-1">
              <label htmlFor="donacion-nombre" className="text-xs font-medium" style={{ color: '#0DADD4' }}>
                Nombre Completo u Organización *
              </label>
              <input
                type="text"
                id="donacion-nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej. María Pérez o Fundación Esperanza"
                inputMode="text"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-[#0DADD4]/50 bg-[#F1FFFF] px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0DADD4]/40 transition-all"
              />
            </div>

            {/* Celular + Correo row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="donacion-celular" className="text-xs font-medium" style={{ color: '#0DADD4' }}>
                  Celular *
                </label>
                <input
                  type="tel"
                  id="donacion-celular"
                  name="celular"
                  value={form.celular}
                  onChange={handleChange}
                  placeholder="Ej. 71234567"
                  inputMode="numeric"
                  pattern="[0-9+ \-]*"
                  autoComplete="tel"
                  required
                  className="w-full rounded-lg border border-[#0DADD4]/50 bg-[#F1FFFF] px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0DADD4]/40 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="donacion-correo" className="text-xs font-medium" style={{ color: '#0DADD4' }}>
                  Correo *
                </label>
                <input
                  type="email"
                  id="donacion-correo"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="tu.email@email.com"
                  inputMode="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-[#0DADD4]/50 bg-[#F1FFFF] px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0DADD4]/40 transition-all"
                />
              </div>
            </div>

            {/* Motivo textarea */}
            <div className="flex flex-col gap-1">
              <label htmlFor="donacion-motivo" className="text-xs font-medium" style={{ color: '#0DADD4' }}>
                ¿Qué te motivó a donar? *
              </label>
              <textarea
                id="donacion-motivo"
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
                rows={4}
                placeholder="Cuéntanos brevemente qué te motivó a apoyar este programa..."
                inputMode="text"
                required
                className="w-full rounded-lg border border-[#0DADD4]/50 bg-[#F1FFFF] p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0DADD4]/40 resize-none transition-all"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-1">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-10 py-2.5 rounded-full font-medium text-white text-sm transition-all duration-200 shadow-sm ${
                  isFormValid
                    ? 'hover:opacity-90 active:scale-95 cursor-pointer shadow-md'
                    : 'opacity-40 cursor-not-allowed pointer-events-none'
                }`}
                style={{ backgroundColor: '#0DADD4' }}
              >
                Registra tu donación
              </button>
            </div>

          </form>

          {/* ── Right: Image with quote overlay ── */}
          <div className="flex-shrink-0 w-full md:w-[220px] flex flex-col">

            {/* Image area */}
            <div
              className="relative w-full rounded-xl overflow-hidden"
              style={{ backgroundColor: '#C0D1C7', paddingBottom: '100%' }}
            >
              {/* Inner image placeholder */}
              <div className="absolute inset-3 rounded-lg bg-gray-300 flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            </div>

            {/* Quote/frase overlay */}
            <div
              className="w-full py-3 px-4 rounded-b-xl -mt-1"
              style={{ backgroundColor: '#BAcb5E' }}
            >
              <p className="text-xs font-medium leading-snug text-center" style={{ color: '#F1FFFF' }}>
                Apóyanos en nuestra labor juntos construimos soluciones.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
