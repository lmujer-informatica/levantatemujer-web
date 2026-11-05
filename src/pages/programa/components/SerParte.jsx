import React, { useState } from 'react';
import { Link } from 'react-router';
import { Phone } from 'lucide-react';
import { enviarFormulario } from '../../../lib/enviarFormulario';

const ESTILO_INPUT =
  'w-full rounded-[10px] border bg-white px-3 py-2 font-poppins font-light text-sm outline-none transition-colors focus:border-[#0DADD4]';

const DEPARTAMENTOS = [
  'La Paz',
  'El Alto',
  'Oruro',
  'Santa Cruz',
  'Sucre',
  'Cochabamba',
  'Chuquisaca',
  'Otro',
];

const PROGRAMAS = ['Respuesta a la Trata e Inmigración'];

const VALORES_INICIALES = {
  nombre: '',
  celular: '',
  correo: '',
  departamento: '',
  programa: PROGRAMAS[0],
  motivo: '',
};

export default function SerParte({ data = {} }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  // 'idle' | 'enviando' | 'ok' | 'error'
  const [estado, setEstado] = useState('idle');
  const [honeypot, setHoneypot] = useState('');
  const enviando = estado === 'enviando';

  const cambiar = (campo) => (e) => {
    if (estado === 'ok' || estado === 'error') setEstado('idle');
    setValores((v) => ({ ...v, [campo]: e.target.value }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (enviando) return;

    setEstado('enviando');
    try {
      // El servidor descarta el envío si el honeypot (_gotcha) viene relleno.
      await enviarFormulario('programa_ii_ser_parte', valores, { _gotcha: honeypot });

      setEstado('ok');
      setValores(VALORES_INICIALES);
    } catch (err) {
      console.error(err);
      setEstado('error');
    }
  };

  return (
    <section className="w-full bg-[#E3FFF8] py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-center font-montserrat italic font-semibold text-lg md:text-2xl" style={{ color: '#0DADD4' }}>
          {data.titulo}
        </h2>
        <div className="mx-auto mt-1 h-[3px] w-40 md:w-56" style={{ backgroundColor: '#0DADD4' }} />

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-[#BACB5E] bg-white px-4 md:px-6 py-3 md:py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#BACB5E] flex items-center justify-center">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
            </span>
            <p className="font-montserrat italic font-medium text-sm md:text-lg text-[#294409]">
              {(data.lineaAyuda ?? {}).titulo}
            </p>
          </div>
          <Link
            to="/lineaAyuda"
            className="rounded-full px-6 py-2 font-montserrat italic font-semibold text-sm text-white transition-transform hover:scale-105"
            style={{ backgroundColor: '#859433' }}
          >
            {(data.lineaAyuda ?? {}).boton}
          </Link>
        </div>

        <form onSubmit={enviar} className="mt-6 rounded-3xl bg-white p-4 md:p-8 shadow-[0px_6px_12px_rgba(0,0,0,0.15)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="sp-nombre" className="font-poppins font-light text-xs text-[#407178]">
                {(data.etiquetas ?? {}).nombre}
              </label>
              <input
                id="sp-nombre"
                type="text"
                required
                value={valores.nombre}
                onChange={cambiar('nombre')}
                className={ESTILO_INPUT}
                style={{ borderColor: '#C0D1C7' }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="sp-celular" className="font-poppins font-light text-xs text-[#407178]">
                {data.etiquetas?.celular}
              </label>
              <input
                id="sp-celular"
                type="tel"
                required
                value={valores.celular}
                onChange={cambiar('celular')}
                className={ESTILO_INPUT}
                style={{ borderColor: '#C0D1C7' }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="sp-correo" className="font-poppins font-light text-xs text-[#407178]">
                {data.etiquetas?.correo}
              </label>
              <input
                id="sp-correo"
                type="email"
                required
                value={valores.correo}
                onChange={cambiar('correo')}
                className={ESTILO_INPUT}
                style={{ borderColor: '#C0D1C7' }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="sp-departamento" className="font-poppins font-light text-xs text-[#407178]">
                {data.etiquetas?.departamento}
              </label>
              <select
                id="sp-departamento"
                required
                value={valores.departamento}
                onChange={cambiar('departamento')}
                className={ESTILO_INPUT}
                style={{ borderColor: '#C0D1C7' }}
              >
                <option value="">Selecciona un departamento</option>
                {DEPARTAMENTOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="sp-programa" className="font-poppins font-light text-xs text-[#407178]">
                {data.etiquetas?.programa}
              </label>
              <select
                id="sp-programa"
                value={valores.programa}
                onChange={cambiar('programa')}
                className={ESTILO_INPUT}
                style={{ borderColor: '#C0D1C7' }}
              >
                {PROGRAMAS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="sp-motivo" className="font-poppins font-light text-xs text-[#407178]">
                {data.etiquetas?.motivo}
              </label>
              <textarea
                id="sp-motivo"
                rows={4}
                value={valores.motivo}
                onChange={cambiar('motivo')}
                className={ESTILO_INPUT}
                style={{ borderColor: '#C0D1C7', resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Honeypot anti-spam (oculto para personas) */}
          <input
            type="text"
            name="_gotcha"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="mt-5 flex flex-col md:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={enviando}
              className="w-full md:w-auto rounded-full px-8 py-2.5 font-montserrat italic font-semibold text-sm md:text-base text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ backgroundColor: '#0DADD4' }}
            >
              {enviando ? 'Enviando...' : data.etiquetas?.boton}
            </button>
            <div role="status" aria-live="polite">
              {estado === 'ok' && (
                <p className="font-poppins font-light text-xs text-[#356194]">
                  Cita solicitada, te contactaremos para confirmarla.
                </p>
              )}
              {estado === 'error' && (
                <p className="font-poppins font-light text-xs text-red-600">
                  No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}