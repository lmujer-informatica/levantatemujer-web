import React from 'react';

export default function FormularioEmergencia() {
  return (
    <section className="bg-lm-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="section-title section-title-olive text-2xl md:text-3xl text-center mb-12">
          Contacto de Emergencia Levántate Mujer
        </h2>

        <form className="w-full flex flex-col gap-6">
          {/* Fila 1 */}
          <div className="flex flex-col">
            <label htmlFor="nombre" className="text-lm-olive text-center mb-2">
              Nombre y Apellido
            </label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              className="border border-lm-olive rounded-full px-6 py-2 outline-none focus:ring-2 focus:ring-lm-olive bg-white"
            />
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="edad" className="text-lm-olive text-center mb-2">
                Edad
              </label>
              <input 
                type="text" 
                id="edad" 
                name="edad" 
                className="border border-lm-olive rounded-full px-6 py-2 outline-none focus:ring-2 focus:ring-lm-olive bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="celular" className="text-lm-olive text-center mb-2">
                Celular
              </label>
              <input 
                type="tel" 
                id="celular" 
                name="celular" 
                className="border border-lm-olive rounded-full px-6 py-2 outline-none focus:ring-2 focus:ring-lm-olive bg-white"
              />
            </div>
          </div>

          {/* Fila 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="departamento" className="text-lm-olive text-center mb-2">
                Departamento
              </label>
              <select 
                id="departamento" 
                name="departamento" 
                className="border border-lm-olive rounded-full px-6 py-2 outline-none focus:ring-2 focus:ring-lm-olive bg-white appearance-none cursor-pointer text-center"
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
              <label htmlFor="municipio" className="text-lm-olive text-center mb-2">
                Municipio
              </label>
              <select 
                id="municipio" 
                name="municipio" 
                className="border border-lm-olive rounded-full px-6 py-2 outline-none focus:ring-2 focus:ring-lm-olive bg-white appearance-none cursor-pointer text-center"
              >
                <option value=""></option>
                <option value="1">Municipio 1</option>
                <option value="2">Municipio 2</option>
              </select>
            </div>
          </div>

          {/* Fila 4 */}
          <div className="flex flex-col">
            <label htmlFor="tipo_emergencia" className="text-lm-olive text-center mb-2">
              Tipo de Emergencia
            </label>
            <select 
              id="tipo_emergencia" 
              name="tipo_emergencia" 
              className="border border-lm-olive rounded-full px-6 py-2 outline-none focus:ring-2 focus:ring-lm-olive bg-white appearance-none cursor-pointer text-center"
            >
              <option value=""></option>
              <option value="violencia">Violencia</option>
              <option value="trata">Trata y Tráfico</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Fila 5 */}
          <div className="flex flex-col">
            <label htmlFor="descripcion" className="text-lm-olive text-center mb-2">
              Describe tu emergencia
            </label>
            <textarea 
              id="descripcion" 
              name="descripcion" 
              rows="5"
              className="border border-lm-olive rounded-3xl px-6 py-4 outline-none focus:ring-2 focus:ring-lm-olive bg-white resize-none"
            ></textarea>
          </div>

          {/* Botón */}
          <div className="flex justify-center mt-4">
            <button 
              type="button" 
              className="bg-lm-olive hover:bg-lime-600 text-white text-xl py-3 px-16 rounded-full transition-colors shadow-md"
            >
              Contactar
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
