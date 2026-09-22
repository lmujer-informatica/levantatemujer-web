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

export default function PostulacionProfesionales() {
    const info = contactoData.postulacion || {};
    const [formData, setFormData] = useState({
        nombre: "",
        celular: "",
        correo: "",
        cv: null,
    });
    const [fileName, setFileName] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, cv: e.target.files[0] }));
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Postulación recibida. Revisaremos tu perfil a la brevedad.");
        setFormData({ nombre: "", celular: "", correo: "", cv: null });
        setFileName("");
    };

    return (
        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Tarjeta Visual Izquierda */}
                <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                    <div className="w-full max-w-[380px] bg-white rounded-t-[50px] rounded-b-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                        <div className="p-4 flex items-center justify-center bg-gray-50">
                            {info.imagen ? (
                                <img
                                    src={info.imagen}
                                    alt="Postulación"
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
                            <button
                                type="button"
                                onClick={() =>
                                    alert(
                                        "Descarga de modelo de CV en formato PDF.",
                                    )
                                }
                                className="bg-[#2C5E8A] hover:bg-[#204566] text-white text-sm font-medium px-6 py-1.5 rounded-full transition-colors shadow-sm"
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
                        <div>
                            <label className="block text-center text-[#8FA832] text-sm font-medium mb-1">
                                Nombre y Apellido
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-white border border-[#8FA832] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8FA832]/40 text-gray-800 text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-center text-[#8FA832] text-sm font-medium mb-1">
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-white border border-[#8FA832] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8FA832]/40 text-gray-800 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-center text-[#8FA832] text-sm font-medium mb-1">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-white border border-[#8FA832] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8FA832]/40 text-gray-800 text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-center text-[#8FA832] text-sm font-medium mb-1">
                                Carga tu CV
                            </label>
                            <div className="relative flex items-center border border-[#8FA832] rounded-full px-3 py-1.5 bg-white overflow-hidden">
                                <input
                                    type="file"
                                    id="cv-upload"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                    required
                                />
                                <span className="text-gray-500 text-xs sm:text-sm truncate pl-2 flex-1">
                                    {fileName ||
                                        "Seleccionar archivo (PDF o Word)..."}
                                </span>
                                <span className="bg-gray-200 text-gray-700 text-xs px-4 py-1 rounded-full font-medium shrink-0">
                                    Examinar
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center mt-2">
                            <button
                                type="submit"
                                className="bg-[#A2BA37] hover:bg-[#8e9f2d] text-white px-12 py-2.5 rounded-full font-medium shadow-md transition-colors text-base"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
