import React, { useState } from 'react';
import Reveal from './Reveal';
import { enviarFormulario } from '../../../lib/enviarFormulario';

const INPUT =
  'border-2 border-lm-olive rounded-full px-6 py-2 md:py-3 md:text-lg outline-none bg-white transition-all duration-200 focus:ring-2 focus:ring-lm-olive focus:scale-[1.01]';
const LABEL = 'text-lm-olive text-center mb-2 md:text-lg';

const VALORES_INICIALES = {
  nombre: '',
  edad: '',
  celular: '',
  departamento: '',
  municipio: '',
  tipo_emergencia: '',
  descripcion: '',
};

// Los value de los select son texto legible: es lo que llega en el correo.
const DEPARTAMENTOS = [
  'La Paz',
  'Santa Cruz',
  'Cochabamba',
  'Oruro',
  'Potosí',
  'Tarija',
  'Chuquisaca',
  'Beni',
  'Pando',
];
// Pendiente: valores de ejemplo, reemplazar por los municipios reales.
const MUNICIPIOS = ['Municipio 1', 'Municipio 2'];
const TIPOS_EMERGENCIA = ['Violencia', 'Trata y Tráfico', 'Otro'];

export default function FormularioEmergencia() {
  const [valores, setValores] = useState(VALORES_INICIALES);
  // 'idle' | 'enviando' | 'ok' | 'error'
  const [estado, setEstado] = useState('idle');
  const [honeypot, setHoneypot] = useState('');
  const enviando = estado === 'enviando';

  const cambiar = (e) => {
    const { name, value } = e.target;
    if (estado === 'ok' || estado === 'error') setEstado('idle');

    let limpio = value;
    if (name === 'celular') limpio = value.replace(/[^0-9+\s-]/g, '');
    if (name === 'edad') limpio = value.replace(/\D/g, '').slice(0, 3);
    setValores((v) => ({ ...v, [name]: limpio }));
  };

  const formularioValido =
    valores.nombre.trim().length > 0 &&
    Number(valores.edad) > 0 &&
    valores.celular.trim().length >= 6 &&
    valores.departamento !== '' &&
    valores.municipio !== '' &&
    valores.tipo_emergencia !== '' &&
    valores.descripcion.trim().length > 0;

  const enviar = async (e) => {
    e.preventDefault();
    if (!formularioValido || enviando) return;

    setEstado('enviando');
    try {
      // El servidor descarta el envío si el honeypot (_gotcha) viene relleno.
      await enviarFormulario('linea_ayuda', valores, { _gotcha: honeypot });

      setEstado('ok');
      setValores(VALORES_INICIALES);
    } catch (err) {
      console.error(err);
      setEstado('error');
    }
  };

  return (
    <section className="bg-lm-bg py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-3xl md:max-w-5xl mx-auto flex flex-col items-center">
        <Reveal>
          <h2 className="section-title section-title-olive text-2xl md:text-4xl text-center mb-10 md:mb-12">
            Contacto de Emergencia Levántate Mujer
          </h2>
        </Reveal>

        <Reveal retraso={120} className="w-full">
          <form
            onSubmit={enviar}
            className="w-full flex flex-col gap-6 md:gap-7 border-2 border-lm-olive rounded-[28px] bg-white p-5 md:p-10 shadow-[0px_6px_16px_rgba(0,0,0,0.12)]"
          >
            <div className="flex flex-col">
              <label htmlFor="nombre" className={LABEL}>
                Nombre y Apellido
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={valores.nombre}
                onChange={cambiar}
                autoComplete="name"
                required
                className={INPUT}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col">
                <label htmlFor="edad" className={LABEL}>
                  Edad
                </label>
                <input
                  type="text"
                  id="edad"
                  name="edad"
                  value={valores.edad}
                  onChange={cambiar}
                  inputMode="numeric"
                  required
                  className={INPUT}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="celular" className={LABEL}>
                  Celular
                </label>
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  value={valores.celular}
                  onChange={cambiar}
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                  className={INPUT}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col">
                <label htmlFor="departamento" className={LABEL}>
                  Departamento
                </label>
                <select
                  id="departamento"
                  name="departamento"
                  value={valores.departamento}
                  onChange={cambiar}
                  required
                  className={`${INPUT} appearance-none cursor-pointer text-center`}
                >
                  <option value=""></option>
                  {DEPARTAMENTOS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="municipio" className={LABEL}>
                  Municipio
                </label>
                <select
                  id="municipio"
                  name="municipio"
                  value={valores.municipio}
                  onChange={cambiar}
                  required
                  className={`${INPUT} appearance-none cursor-pointer text-center`}
                >
                  <option value=""></option>
                  {MUNICIPIOS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="tipo_emergencia" className={LABEL}>
                Tipo de Emergencia
              </label>
              <select
                id="tipo_emergencia"
                name="tipo_emergencia"
                value={valores.tipo_emergencia}
                onChange={cambiar}
                required
                className={`${INPUT} appearance-none cursor-pointer text-center`}
              >
                <option value=""></option>
                {TIPOS_EMERGENCIA.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="descripcion" className={LABEL}>
                Describe tu emergencia
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={valores.descripcion}
                onChange={cambiar}
                rows="5"
                required
                className="border-2 border-lm-olive rounded-3xl px-6 py-4 md:text-lg outline-none bg-white resize-none transition-all duration-200 focus:ring-2 focus:ring-lm-olive"
              ></textarea>
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

            <div className="flex flex-col items-center gap-3 mt-2 md:mt-4">
              <p className="text-lm-olive text-center text-sm md:text-base">
                Si estás en peligro ahora, llama a los números de emergencia de esta página.
              </p>

              <button
                type="submit"
                disabled={!formularioValido || enviando}
                className="bg-lm-olive hover:bg-lime-600 text-white text-xl md:text-2xl py-3 px-16 md:px-20 rounded-full transition-all duration-200 shadow-md hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-lm-olive disabled:hover:shadow-md"
              >
                {enviando ? 'Enviando...' : 'Contactar'}
              </button>

              <div role="status" aria-live="polite">
                {estado === 'ok' && (
                  <p className="text-sm md:text-base text-center font-medium text-lm-olive">
                    Solicitud enviada correctamente. Nos comunicaremos contigo pronto.
                  </p>
                )}
                {estado === 'error' && (
                  <p className="text-sm md:text-base text-center font-medium text-red-600">
                    No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.
                  </p>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
