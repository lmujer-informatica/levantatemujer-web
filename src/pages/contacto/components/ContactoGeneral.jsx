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

export default function ContactoGeneral() {
    const info = contactoData.contactoGeneral || {};
    const [formData, setFormData] = useState({
        nombre: "",
        celular: "",
        correo: "",
        motivo: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            "Gracias por comunicarte con nosotros. Nos pondremos en contacto pronto.",
        );
        setFormData({ nombre: "", celular: "", correo: "", motivo: "" });
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
                        <div>
                            <label className="block text-center text-[#00A8CC] text-sm font-medium mb-1">
                                Nombre y Apellido
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-white border border-[#00A8CC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A8CC]/40 text-gray-800 text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-center text-[#00A8CC] text-sm font-medium mb-1">
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-white border border-[#00A8CC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A8CC]/40 text-gray-800 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-center text-[#00A8CC] text-sm font-medium mb-1">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-white border border-[#00A8CC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A8CC]/40 text-gray-800 text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-center text-[#00A8CC] text-sm font-medium mb-1">
                                Motivo del contacto
                            </label>
                            <textarea
                                name="motivo"
                                rows="4"
                                value={formData.motivo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-white border border-[#00A8CC] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00A8CC]/40 text-gray-800 text-sm resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-center mt-2">
                            <button
                                type="submit"
                                className="bg-[#00A8CC] hover:bg-[#008ba8] text-white px-10 py-2.5 rounded-full font-medium shadow-md transition-colors text-base"
                            >
                                Agendar cita
                            </button>
                        </div>
                    </form>
                </div>

                {/* Tarjeta Visual Derecha */}
                <div className="lg:col-span-5 flex justify-center">
                    <div className="w-full max-w-[380px] bg-white rounded-t-[50px] rounded-b-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                        <div className="p-4 flex items-center justify-center bg-gray-50">
                            {info.imagen ? (
                                <img
                                    src={info.imagen}
                                    alt="Contacto"
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
