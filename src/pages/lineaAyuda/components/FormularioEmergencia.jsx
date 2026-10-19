import React from 'react';
import Reveal from './Reveal';

const INPUT =
  'border-2 border-lm-olive rounded-full px-6 py-2 md:py-3 md:text-lg outline-none bg-white transition-all duration-200 focus:ring-2 focus:ring-lm-olive focus:scale-[1.01]';
const LABEL = 'text-lm-olive text-center mb-2 md:text-lg';

export default function FormularioEmergencia() {
  return (
    <section className="bg-lm-bg py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-3xl md:max-w-5xl mx-auto flex flex-col items-center">
        <Reveal>
          <h2 className="section-title section-title-olive text-2xl md:text-4xl text-center mb-10 md:mb-12">
            Contacto de Emergencia Levántate Mujer
          </h2>
        </Reveal>

        <Reveal retraso={120} className="w-full">
          <form className="w-full flex flex-col gap-6 md:gap-7 border-2 border-lm-olive rounded-[28px] bg-white p-5 md:p-10 shadow-[0px_6px_16px_rgba(0,0,0,0.12)]">
            <div className="flex flex-col">
              <label htmlFor="nombre" className={LABEL}>
                Nombre y Apellido
              </label>
              <input type="text" id="nombre" name="nombre" className={INPUT} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col">
                <label htmlFor="edad" className={LABEL}>
                  Edad
                </label>
                <input type="text" id="edad" name="edad" className={INPUT} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="celular" className={LABEL}>
                  Celular
                </label>
                <input type="tel" id="celular" name="celular" className={INPUT} />
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
                  className={`${INPUT} appearance-none cursor-pointer text-center`}
                >
                  <option value=""></option>
                  <option value="lapaz">La Paz</option>
                  <option value="santacruz">Santa Cruz</option>
                  <option value="cochabamba">Cochabamba</option>
                  <option value="oruro">Oruro</option>
                  <option value="potosi">Potosí</option>
                  <option value="tarija">Tarija</option>
                  <option value="chuquisaca">Chuquisaca</option>
                  <option value="beni">Beni</option>
                  <option value="pando">Pando</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="municipio" className={LABEL}>
                  Municipio
                </label>
                <select
                  id="municipio"
                  name="municipio"
                  className={`${INPUT} appearance-none cursor-pointer text-center`}
                >
                  <option value=""></option>
                  <option value="1">Municipio 1</option>
                  <option value="2">Municipio 2</option>
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
                className={`${INPUT} appearance-none cursor-pointer text-center`}
              >
                <option value=""></option>
                <option value="violencia">Violencia</option>
                <option value="trata">Trata y Tráfico</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="descripcion" className={LABEL}>
                Describe tu emergencia
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="5"
                className="border-2 border-lm-olive rounded-3xl px-6 py-4 md:text-lg outline-none bg-white resize-none transition-all duration-200 focus:ring-2 focus:ring-lm-olive"
              ></textarea>
            </div>

            <div className="flex justify-center mt-2 md:mt-4">
              <button
                type="button"
                className="bg-lm-olive hover:bg-lime-600 text-white text-xl md:text-2xl py-3 px-16 md:px-20 rounded-full transition-all duration-200 shadow-md hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Contactar
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
