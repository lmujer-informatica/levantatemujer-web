import React from "react";
import { NavLink } from "react-router";
import contactoData from "../../../data/contacto.json";

export default function LineaAyudaBarra() {
    const texto = contactoData.lineaAyudaTexto || "Línea de Ayuda";

    return (
        <section className="w-full bg-[#2C5E8A] py-3 px-4 sm:px-8">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                <h2 className="text-white italic text-xl sm:text-2xl md:text-3xl font-medium tracking-wide">
                    {texto}
                </h2>
                <NavLink
                    to="/lineaAyuda"
                    className="bg-white text-[#2C5E8A] px-6 sm:px-8 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base shadow-sm hover:bg-gray-100 transition-colors"
                >
                    Click Aquí
                </NavLink>
            </div>
        </section>
    );
}
