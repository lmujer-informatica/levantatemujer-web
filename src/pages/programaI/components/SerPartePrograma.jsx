import React, { useState } from "react";
import { NavLink } from "react-router";
import { ChevronDown } from "lucide-react";

const FORMSPREE_ENDPOINT = import.meta.env.FORMSPREE_PROGRAMA_I_ENDPOINT;

const INITIAL_FORM = {
    nombre: "",
    celular: "",
    correo: "",
    departamento: "La Paz",
    programa: "Mujeres Libres de Violencia",
    motivo: "",
};

export default function SerPartePrograma() {
    const [form, setForm] = useState(INITIAL_FORM);
    // "idle" | "enviando" | "ok" | "error"
    const [status, setStatus] = useState("idle");
    const [honeypot, setHoneypot] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (status === "ok" || status === "error") setStatus("idle");
        if (name === "celular") {
            const sanitized = value.replace(/[^0-9+\s-]/g, "");
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
        form.departamento.trim().length > 0 &&
        form.programa.trim().length > 0 &&
        form.motivo.trim().length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || status === "enviando") return;

        // Honeypot: un bot rellena este campo oculto; fingimos éxito sin enviar.
        if (honeypot) {
            setStatus("ok");
            return;
        }

        if (!FORMSPREE_ENDPOINT) {
            console.error("Falta la variable FORMSPREE_PROGRAMA_I_ENDPOINT");
            setStatus("error");
            return;
        }

        setStatus("enviando");
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    _subject: `Nueva solicitud: ${form.programa} (${form.departamento})`,
                }),
            });
            if (!res.ok) throw new Error(`Formspree respondió ${res.status}`);

            setStatus("ok");
            setForm(INITIAL_FORM);
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
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
                                htmlFor="parte-nombre"
                                className="text-sm font-medium text-center"
                                style={{ color: "#859430" }}
                            >
                                Nombre y Apellido *
                            </label>
                            <input
                                type="text"
                                id="parte-nombre"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ej. María Pérez"
                                inputMode="text"
                                autoComplete="name"
                                required
                                className="w-full rounded-full border border-[#859430] bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 transition-all"
                            />
                        </div>

                        {/* Celular + Correo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="parte-celular"
                                    className="text-sm font-medium text-center"
                                    style={{ color: "#859430" }}
                                >
                                    Celular *
                                </label>
                                <input
                                    type="tel"
                                    id="parte-celular"
                                    name="celular"
                                    value={form.celular}
                                    onChange={handleChange}
                                    placeholder="Ej. 71234567"
                                    inputMode="numeric"
                                    pattern="[0-9+ \-]*"
                                    autoComplete="tel"
                                    required
                                    className="w-full rounded-full border border-[#859430] bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="parte-correo"
                                    className="text-sm font-medium text-center"
                                    style={{ color: "#859430" }}
                                >
                                    Correo *
                                </label>
                                <input
                                    type="email"
                                    id="parte-correo"
                                    name="correo"
                                    value={form.correo}
                                    onChange={handleChange}
                                    placeholder="tu.email@email.com"
                                    inputMode="email"
                                    autoComplete="email"
                                    required
                                    className="w-full rounded-full border border-[#859430] bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 transition-all"
                                />
                            </div>
                        </div>

                        {/* Departamento + Programa */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="parte-departamento"
                                    className="text-sm font-medium text-center"
                                    style={{ color: "#859430" }}
                                >
                                    Sede *
                                </label>
                                <div className="relative">
                                    <select
                                        id="parte-departamento"
                                        name="departamento"
                                        value={form.departamento}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-full border border-[#859430] bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 appearance-none cursor-pointer"
                                    >
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
                                    htmlFor="parte-programa"
                                    className="text-sm font-medium text-center"
                                    style={{ color: "#859430" }}
                                >
                                    Programa *
                                </label>
                                <div className="relative">
                                    <select
                                        id="parte-programa"
                                        name="programa"
                                        value={form.programa}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-full border border-[#859430] bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 appearance-none cursor-pointer"
                                    >
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
                                htmlFor="parte-motivo"
                                className="text-sm font-medium text-center"
                                style={{ color: "#859430" }}
                            >
                                ¿Por qué te interesa el programa? *
                            </label>
                            <textarea
                                id="parte-motivo"
                                name="motivo"
                                value={form.motivo}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Cuéntanos brevemente tus inquietudes o tu interés en participar..."
                                inputMode="text"
                                required
                                className="w-full rounded-2xl border border-[#859430] bg-white p-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#859430]/40 resize-none transition-all"
                            />
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

                        {/* Botón de envío */}
                        <div className="flex flex-col items-center gap-3 mt-2">
                            <button
                                type="submit"
                                disabled={!isFormValid || status === "enviando"}
                                className={`px-12 py-2.5 rounded-full font-medium text-white text-base shadow-md transition-all ${
                                    isFormValid && status !== "enviando"
                                        ? "hover:opacity-90 active:scale-95 cursor-pointer shadow-md"
                                        : "opacity-40 cursor-not-allowed pointer-events-none"
                                }`}
                                style={{ backgroundColor: "#859430" }}
                            >
                                {status === "enviando"
                                    ? "Enviando..."
                                    : "Agendar cita"}
                            </button>

                            <div role="status" aria-live="polite">
                                {status === "ok" && (
                                    <p className="text-sm text-center font-medium text-[#859430]">
                                        Solicitud enviada correctamente. Nos
                                        comunicaremos contigo pronto.
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="text-sm text-center font-medium text-red-600">
                                        No pudimos enviar tu solicitud. Intenta
                                        de nuevo en unos minutos.
                                    </p>
                                )}
                            </div>
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
