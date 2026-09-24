import React, { useState } from "react";
import { NavLink } from "react-router";
import { ChevronDown } from "lucide-react";

export default function SerPartePrograma() {
    const [form, setForm] = useState({
        nombre: "",
        celular: "",
        correo: "",
        departamento: "",
        programa: "",
        motivo: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            "Solicitud enviada correctamente. Nos comunicaremos contigo pronto.",
        );
        setForm({
            nombre: "",
            celular: "",
            correo: "",
            departamento: "",
            programa: "",
            motivo: "",
        });
    };

    return (
        <section className="w-full bg-[#F1FFFF] py-0 overflow-hidden">
            {/* Barra de título de la sección */}
            <div
                className="w-full py-3 px-4 flex items-center justify-center shadow-xs"
                style={{ backgroundColor: "#859430" }}
            >
                <h2 className="italic font-medium text-white text-xl sm:text-2xl md:text-3xl tracking-widest uppercase">
                    SE PARTE DEL PROGRAMA
                </h2>
            </div>

            <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 lg:gap-10 py-10 lg:py-16">
                {/* ── Columna Izquierda: Formulario ── */}
                <div className="w-full lg:flex-1 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-[max(2.5rem,calc((100vw-1280px)/2+2rem))] pr-4 sm:pr-6 lg:pr-8 flex flex-col justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 max-w-[580px] mx-auto lg:mx-0 w-full"
                    >
                        {/* Nombre y Apellido */}
                        <div className="flex flex-col gap-1">
                            <label
                                className="text-sm font-medium text-center"
                                style={{ color: "#859430" }}
                            >
                                Nombre y Apellido
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                                className="w-full rounded-full border border-[#859430] bg-white px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#859430]/40"
                            />
                        </div>

                        {/* Celular + Correo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-sm font-medium text-center"
                                    style={{ color: "#859430" }}
                                >
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    name="celular"
                                    value={form.celular}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-full border border-[#859430] bg-white px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#859430]/40"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-sm font-medium text-center"
                                    style={{ color: "#859430" }}
                                >
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={form.correo}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-full border border-[#859430] bg-white px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#859430]/40"
                                />
                            </div>
                        </div>

                        {/* Departamento + Programa */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-sm font-medium text-center"
                                    style={{ color: "#859430" }}
                                >
                                    Departamento
                                </label>
                                <div className="relative">
                                    <select
                                        name="departamento"
                                        value={form.departamento}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-full border border-[#859430] bg-white px-4 py-2 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 appearance-none cursor-pointer"
                                    >
                                        <option value="">
                                            Seleccionar Departamento
                                        </option>
                                        <option value="La Paz">La Paz</option>
                                        <option value="El Alto">El Alto</option>
                                        <option value="Oruro">Oruro</option>
                                        <option value="Santa Cruz">
                                            Santa Cruz
                                        </option>
                                        <option value="Sucre">Sucre</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-[#859430] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-sm font-medium text-center"
                                    style={{ color: "#859430" }}
                                >
                                    Programa
                                </label>
                                <div className="relative">
                                    <select
                                        name="programa"
                                        value={form.programa}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-full border border-[#859430] bg-white px-4 py-2 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 appearance-none cursor-pointer"
                                    >
                                        <option value="">
                                            Seleccionar Programa
                                        </option>
                                        <option value="Mujeres Libres de Violencia">
                                            Mujeres Libres de Violencia
                                        </option>
                                        <option value="Respuesta a la Trata e Inmigración">
                                            Respuesta a la Trata e Inmigración
                                        </option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-[#859430] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Motivo */}
                        <div className="flex flex-col gap-1">
                            <label
                                className="text-sm font-medium text-center"
                                style={{ color: "#859430" }}
                            >
                                ¿Por qué te interesa el programa?
                            </label>
                            <textarea
                                name="motivo"
                                value={form.motivo}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="w-full rounded-2xl border border-[#859430] bg-white p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 resize-none"
                            />
                        </div>

                        {/* Botón de envío */}
                        <div className="flex justify-center mt-2">
                            <button
                                type="submit"
                                className="px-12 py-2.5 rounded-full font-medium text-white text-base shadow-md hover:opacity-90 active:scale-95 transition-all"
                                style={{ backgroundColor: "#859430" }}
                            >
                                Agendar cita
                            </button>
                        </div>
                    </form>
                </div>

                {/* ── Columna Derecha: Contenedor Línea de Ayuda Violencia ── */}
                <div className="w-full lg:w-[460px] xl:w-[520px] shrink-0 flex justify-end">
                    <div className="w-full sm:w-[92%] sm:ml-auto lg:w-full bg-[#00A8CC] rounded-l-[110px] sm:rounded-l-[140px] lg:rounded-l-[180px] rounded-r-none py-12 lg:py-20 pl-8 sm:pl-12 lg:pl-16 pr-4 sm:pr-8 lg:pr-10 flex flex-col items-center justify-center gap-6 shadow-[-10px_6px_25px_rgba(0,0,0,0.08)]">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal italic text-center text-white leading-tight drop-shadow-xs">
                            Línea de Ayuda
                            <br />
                            Violencia
                        </h3>

                        <NavLink
                            to="/lineaAyuda"
                            className="bg-white text-[#00A8CC] hover:bg-gray-50 px-8 sm:px-10 py-2.5 sm:py-3 rounded-full font-medium text-base sm:text-lg shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-center"
                        >
                            Click Aquí
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
