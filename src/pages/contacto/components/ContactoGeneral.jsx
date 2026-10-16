import React, { useState } from "react";
import contactoData from "../../../data/contacto.json";

function ImagePlaceholder({ className = "" }) {
    return (
        <div
            className={`bg-gray-400 flex items-center justify-center ${className}`}
        >
            <svg
                className="w-20 h-20 text-white opacity-60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        </div>
    );
}

const FORMSPREE_ENDPOINT = import.meta.env.FORMSPREE_CONTACTO_GENERAL_ENDPOINT;

const INITIAL_FORM = { nombre: "", celular: "", correo: "", motivo: "" };

export default function ContactoGeneral() {
    const info = contactoData?.contactoGeneral || {};
    const [formData, setFormData] = useState(INITIAL_FORM);
    // "idle" | "enviando" | "ok" | "error"
    const [status, setStatus] = useState("idle");
    const [honeypot, setHoneypot] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (status === "ok" || status === "error") setStatus("idle");
        if (name === "celular") {
            const sanitized = value.replace(/[^0-9+\s-]/g, "");
            setFormData((prev) => ({ ...prev, [name]: sanitized }));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.correo.trim()
    );
    const isFormValid =
        formData.nombre.trim().length > 0 &&
        formData.celular.trim().length >= 6 &&
        isEmailValid &&
        formData.motivo.trim().length > 0;

    const isSending = status === "enviando";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || isSending) return;

        // Honeypot: un bot rellena este campo oculto; fingimos éxito sin enviar.
        if (honeypot) {
            setStatus("ok");
            return;
        }

        if (!FORMSPREE_ENDPOINT) {
            console.error("Falta la variable FORMSPREE_CONTACTO_GENERAL_ENDPOINT");
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
                    ...formData,
                    _subject: `Nuevo contacto general: ${formData.nombre.trim()}`,
                }),
            });
            if (!res.ok) throw new Error(`Formspree respondió ${res.status}`);

            setStatus("ok");
            setFormData(INITIAL_FORM);
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <section className="w-full bg-[#F1FFFF] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Formulario Izquierda */}
                <div className="lg:col-span-7 flex flex-col">
                    <h2 className="text-3xl md:text-4xl text-[#00A8CC] italic font-semibold text-center mb-6">
                        {info.titulo || "Contacto General"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 max-w-[550px] mx-auto w-full"
                    >
                        {/* Nombre y Apellido */}
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="contacto-nombre"
                                className="block text-center text-[#00A8CC] text-sm font-medium"
                            >
                                Nombre y Apellido *
                            </label>
                            <input
                                type="text"
                                id="contacto-nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ej. María Pérez"
                                inputMode="text"
                                autoComplete="name"
                                required
                                className="w-full px-4 py-2.5 bg-white border border-[#00A8CC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A8CC]/40 text-gray-800 text-sm placeholder:text-gray-400 transition-all"
                            />
                        </div>

                        {/* Celular + Correo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="contacto-celular"
                                    className="block text-center text-[#00A8CC] text-sm font-medium"
                                >
                                    Celular *
                                </label>
                                <input
                                    type="tel"
                                    id="contacto-celular"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    placeholder="Ej. 71234567"
                                    inputMode="numeric"
                                    pattern="[0-9+ \-]*"
                                    autoComplete="tel"
                                    required
                                    className="w-full px-4 py-2.5 bg-white border border-[#00A8CC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A8CC]/40 text-gray-800 text-sm placeholder:text-gray-400 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="contacto-correo"
                                    className="block text-center text-[#00A8CC] text-sm font-medium"
                                >
                                    Correo *
                                </label>
                                <input
                                    type="email"
                                    id="contacto-correo"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    placeholder="tu.email@email.com"
                                    inputMode="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-4 py-2.5 bg-white border border-[#00A8CC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A8CC]/40 text-gray-800 text-sm placeholder:text-gray-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Motivo */}
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="contacto-motivo"
                                className="block text-center text-[#00A8CC] text-sm font-medium"
                            >
                                Motivo del contacto *
                            </label>
                            <textarea
                                id="contacto-motivo"
                                name="motivo"
                                rows="4"
                                value={formData.motivo}
                                onChange={handleChange}
                                placeholder="Cuéntanos brevemente el motivo de tu consulta o mensaje..."
                                inputMode="text"
                                required
                                className="w-full px-4 py-2.5 bg-white border border-[#00A8CC] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00A8CC]/40 text-gray-800 text-sm placeholder:text-gray-400 resize-none transition-all"
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

                        {/* Botón CTA Bloqueado hasta completar */}
                        <div className="flex flex-col items-center gap-3 mt-2">
                            <button
                                type="submit"
                                disabled={!isFormValid || isSending}
                                className={`px-10 py-2.5 rounded-full font-medium text-white text-base shadow-md transition-all duration-200 ${
                                    isFormValid && !isSending
                                        ? "bg-[#00A8CC] hover:bg-[#008ba8] active:scale-95 cursor-pointer"
                                        : "bg-[#00A8CC] opacity-40 cursor-not-allowed pointer-events-none"
                                }`}
                            >
                                {isSending ? "Enviando..." : "Agendar cita"}
                            </button>

                            <div role="status" aria-live="polite">
                                {status === "ok" && (
                                    <p className="text-sm text-center font-medium text-[#00A8CC]">
                                        Gracias por comunicarte con nosotros.
                                        Nos pondremos en contacto pronto.
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="text-sm text-center font-medium text-red-600">
                                        No pudimos enviar tu mensaje. Intenta de
                                        nuevo en unos minutos.
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Tarjeta Visual Derecha (Gestionable mediante Decap CMS) */}
                <div className="lg:col-span-5 flex justify-center">
                    <div className="w-full max-w-[380px] bg-white rounded-t-[50px] rounded-b-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                        <div className="p-4 flex items-center justify-center bg-gray-50">
                            {info.imagen ? (
                                <img
                                    src={info.imagen}
                                    alt="Contacto General"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-[260px] object-cover rounded-t-[40px]"
                                />
                            ) : (
                                <ImagePlaceholder className="w-full h-[260px] rounded-t-[40px]" />
                            )}
                        </div>
                        <div className="bg-[#A2BA37] py-4 px-6 text-center">
                            <p className="text-white text-base md:text-lg font-medium leading-snug">
                                {info.mensajeImagen ||
                                    "Escríbenos, juntos construimos soluciones."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
