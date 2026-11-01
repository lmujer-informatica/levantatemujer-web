import React, { useState } from "react";
import contactoData from "../../../data/contacto.json";
import { enviarFormulario } from "../../../lib/enviarFormulario";

const MAX_CV_BYTES = 3 * 1024 * 1024; // 3 MB
const EXTENSIONES_CV = [".pdf", ".doc", ".docx"];
const INITIAL_FORM = { nombre: "", celular: "", correo: "", cv: null };

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

export default function PostulacionProfesionales() {
    const info = contactoData?.postulacion || {};
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [fileName, setFileName] = useState("");
    const [fileError, setFileError] = useState("");
    // Cambiar la key vacía el <input type="file"> (no se puede resetear desde React).
    const [fileKey, setFileKey] = useState(0);
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

    const handleFileChange = (e) => {
        if (status === "ok" || status === "error") setStatus("idle");
        const file = e.target.files && e.target.files[0];
        if (!file) {
            setFormData((prev) => ({ ...prev, cv: null }));
            setFileName("");
            return;
        }

        const nombre = file.name.toLowerCase();
        const extensionValida = EXTENSIONES_CV.some((ext) =>
            nombre.endsWith(ext)
        );
        if (!extensionValida || file.size > MAX_CV_BYTES) {
            setFileError(
                !extensionValida
                    ? "El CV debe ser un archivo PDF o Word (.pdf, .doc, .docx)."
                    : "El CV supera el máximo de 3 MB."
            );
            setFormData((prev) => ({ ...prev, cv: null }));
            setFileName("");
            setFileKey((k) => k + 1);
            return;
        }

        setFileError("");
        setFormData((prev) => ({ ...prev, cv: file }));
        setFileName(file.name);
    };

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.correo.trim()
    );
    const isFormValid =
        formData.nombre.trim().length > 0 &&
        formData.celular.trim().length >= 6 &&
        isEmailValid &&
        formData.cv !== null;

    const isSending = status === "enviando";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || isSending) return;

        setStatus("enviando");
        try {
            const { cv, ...datos } = formData;
            // El servidor descarta el envío si el honeypot (_gotcha) viene relleno.
            await enviarFormulario("postulacion_profesionales", datos, {
                _gotcha: honeypot,
                archivo: cv,
            });

            setStatus("ok");
            setFormData(INITIAL_FORM);
            setFileName("");
            setFileKey((k) => k + 1);
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    // Descarga del archivo PDF (independiente de si el formulario está lleno o no)
    const handleDescargaPdf = () => {
        if (info.archivoPdf) {
            window.open(info.archivoPdf, "_blank");
        } else {
            alert(
                "El modelo de CV en PDF no está disponible temporalmente. Pronto estará habilitado."
            );
        }
    };

    return (
        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Tarjeta Visual Izquierda (Gestionable mediante Decap CMS) */}
                <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                    <div className="w-full max-w-[380px] bg-white rounded-t-[50px] rounded-b-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                        <div className="p-4 flex items-center justify-center bg-gray-50">
                            {info.imagen ? (
                                <img
                                    src={info.imagen}
                                    alt="Postulación de profesionales"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-[240px] object-cover rounded-t-[40px]"
                                />
                            ) : (
                                <ImagePlaceholder className="w-full h-[240px] rounded-t-[40px]" />
                            )}
                        </div>
                        <div className="bg-[#00A8CC] py-5 px-6 text-center flex flex-col items-center">
                            <p className="text-white text-base md:text-lg font-medium leading-snug mb-3">
                                {info.textoDescarga ||
                                    "Descarga nuestro modelo de CV"}
                            </p>
                            {/* Botón de descarga de PDF: no requiere validación del formulario */}
                            <button
                                type="button"
                                onClick={handleDescargaPdf}
                                className="bg-[#2C5E8A] hover:bg-[#204566] active:scale-95 text-white text-sm font-medium px-8 py-2 rounded-full transition-all shadow-md cursor-pointer"
                            >
                                Click Aquí
                            </button>
                        </div>
                    </div>
                </div>

                {/* Formulario Derecha */}
                <div className="lg:col-span-7 flex flex-col order-1 lg:order-2">
                    <h2 className="text-3xl md:text-4xl text-[#8FA832] italic font-semibold text-center mb-1">
                        {info.titulo || "Postulación de profesionales"}
                    </h2>
                    <p className="text-center text-gray-500 italic text-sm mb-6">
                        {info.subtitulo ||
                            "Tu interés nos inspira, revisaremos tu perfil."}
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 max-w-[550px] mx-auto w-full"
                    >
                        {/* Nombre y Apellido */}
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="postulacion-nombre"
                                className="block text-center text-[#8FA832] text-sm font-medium"
                            >
                                Nombre y Apellido *
                            </label>
                            <input
                                type="text"
                                id="postulacion-nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ej. María Pérez"
                                inputMode="text"
                                autoComplete="name"
                                required
                                className="w-full px-4 py-2.5 bg-white border border-[#8FA832] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8FA832]/40 text-gray-800 text-sm placeholder:text-gray-400 transition-all"
                            />
                        </div>

                        {/* Celular + Correo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="postulacion-celular"
                                    className="block text-center text-[#8FA832] text-sm font-medium"
                                >
                                    Celular *
                                </label>
                                <input
                                    type="tel"
                                    id="postulacion-celular"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    placeholder="Ej. 71234567"
                                    inputMode="numeric"
                                    pattern="[0-9+ \-]*"
                                    autoComplete="tel"
                                    required
                                    className="w-full px-4 py-2.5 bg-white border border-[#8FA832] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8FA832]/40 text-gray-800 text-sm placeholder:text-gray-400 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="postulacion-correo"
                                    className="block text-center text-[#8FA832] text-sm font-medium"
                                >
                                    Correo *
                                </label>
                                <input
                                    type="email"
                                    id="postulacion-correo"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    placeholder="tu.email@email.com"
                                    inputMode="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-4 py-2.5 bg-white border border-[#8FA832] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8FA832]/40 text-gray-800 text-sm placeholder:text-gray-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Carga tu CV */}
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="cv-upload"
                                className="block text-center text-[#8FA832] text-sm font-medium"
                            >
                                Carga tu CV *
                            </label>
                            <div className="relative flex items-center border border-[#8FA832] rounded-full px-3 py-2 bg-white overflow-hidden shadow-2xs">
                                <input
                                    key={fileKey}
                                    type="file"
                                    id="cv-upload"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                    required
                                />
                                <span className="text-gray-500 text-xs sm:text-sm truncate pl-2 flex-1">
                                    {fileName || "PDF o Word, máx. 3 MB"}
                                </span>
                                <span className="bg-gray-100 border border-gray-200 text-gray-700 text-xs px-4 py-1.5 rounded-full font-medium shrink-0 pointer-events-none">
                                    Examinar
                                </span>
                            </div>
                            {fileError && (
                                <p
                                    role="alert"
                                    className="text-xs text-center font-medium text-red-600"
                                >
                                    {fileError}
                                </p>
                            )}
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
                                className={`px-12 py-2.5 rounded-full font-medium text-white text-base shadow-md transition-all duration-200 ${
                                    isFormValid && !isSending
                                        ? "bg-[#A2BA37] hover:bg-[#8e9f2d] active:scale-95 cursor-pointer"
                                        : "bg-[#A2BA37] opacity-40 cursor-not-allowed pointer-events-none"
                                }`}
                            >
                                {isSending ? "Enviando..." : "Enviar"}
                            </button>

                            <div role="status" aria-live="polite">
                                {status === "ok" && (
                                    <p className="text-sm text-center font-medium text-[#8FA832]">
                                        Postulación enviada correctamente.
                                        Revisaremos tu perfil a la brevedad.
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="text-sm text-center font-medium text-red-600">
                                        No pudimos enviar tu postulación.
                                        Intenta de nuevo en unos minutos.
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
