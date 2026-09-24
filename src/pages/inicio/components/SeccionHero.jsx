import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import inicioData from "../../../data/inicio.json";

export default function SeccionHero() {
    const [fraseActual, setFraseActual] = useState(0);

    const frases = inicioData.heroFrases || [];

    useEffect(() => {
        if (frases.length <= 1) return;

        const intervalo = setInterval(() => {
            setFraseActual((actual) => (actual + 1) % frases.length);
        }, 5000);

        return () => clearInterval(intervalo);
    }, [frases.length]);

    return (
        <div className="relative w-full min-h-[500px] md:h-[500px] overflow-hidden bg-lm-bg flex">
            {/* Mitad izquierda */}
            <div className="w-full md:w-[60%] lg:w-[62%] h-full bg-lm-olive flex flex-col justify-center relative z-10 pl-6 sm:pl-8 md:pl-[8%] lg:pl-[10%] pr-4 py-8 md:py-0">
                <h1
                    key={fraseActual}
                    className="hero-text-in text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight z-20 relative max-w-[95%] md:max-w-[85%]"
                >
                    {frases.length > 0
                        ? frases[fraseActual]
                        : "Fundación Levántate Mujer"}
                </h1>

                {/* Botones de navegación en pantallas móviles */}
                <div className="flex md:hidden flex-wrap items-center gap-2 mt-6 z-20">
                    <NavLink
                        to="/quienesSomos"
                        className="px-3.5 py-1.5 bg-white text-lm-navy text-xs font-semibold rounded-full shadow-md hover:bg-gray-100 active:scale-95 transition-transform"
                    >
                        Quiénes Somos
                    </NavLink>
                    <NavLink
                        to="/programaI"
                        className="px-3.5 py-1.5 bg-lm-cyan text-white text-xs font-semibold rounded-full shadow-md hover:bg-lm-cyan/90 active:scale-95 transition-transform"
                    >
                        Mujeres Libres de Violencia
                    </NavLink>
                    <NavLink
                        to="/programaII"
                        className="px-3.5 py-1.5 bg-lm-cyan text-white text-xs font-semibold rounded-full shadow-md hover:bg-lm-cyan/90 active:scale-95 transition-transform"
                    >
                        Respuesta a la Trata e Inmigración
                    </NavLink>
                </div>
            </div>

            {/* Mitad derecha */}
            <div className="hidden md:block absolute right-0 top-0 h-full w-[45%] lg:w-[46%] xl:w-[45%] z-20">
                <div className="w-full h-full bg-[#EAF7FA] rounded-l-[150px] flex items-center justify-center relative p-6 lg:p-8 xl:p-10 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
                    <div className="w-[85%] lg:w-[80%] h-[55%] lg:h-[58%] bg-gray-400 rounded-xl relative flex flex-col items-center justify-center overflow-hidden mb-16 lg:mb-14">
                        {inicioData.heroImagenes &&
                        inicioData.heroImagenes.length > 0 ? (
                            <img
                                src={inicioData.heroImagenes[0]}
                                alt="Hero"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white">
                                <svg
                                    className="w-48 h-48 opacity-80"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                    />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* 3 Botones ajustados al tamaño de los nuevos textos */}
                    <div className="absolute bottom-3 lg:bottom-5 left-0 right-0 px-3 lg:px-6 flex flex-col items-center justify-center gap-1.5 lg:gap-2 z-30">
                        <div className="flex flex-wrap items-center justify-center gap-1.5 lg:gap-2 w-full max-w-[460px]">
                            <NavLink
                                to="/quienesSomos"
                                className="px-3 py-1.5 lg:px-4 lg:py-2 bg-lm-cyan text-white text-xs lg:text-sm font-medium rounded-full shadow-md hover:bg-[#0093b4] transition-all duration-200 hover:scale-105 text-center whitespace-nowrap cursor-pointer"
                            >
                                Quiénes Somos
                            </NavLink>
                            <NavLink
                                to="/programaI"
                                className="px-3 py-1.5 lg:px-4 lg:py-2 bg-lm-cyan text-white text-xs lg:text-sm font-medium rounded-full shadow-md hover:bg-[#0093b4] transition-all duration-200 hover:scale-105 text-center whitespace-nowrap cursor-pointer"
                            >
                                Mujeres Libres de Violencia
                            </NavLink>
                            <NavLink
                                to="/programaII"
                                className="px-3 py-1.5 lg:px-4 lg:py-2 bg-lm-cyan text-white text-xs lg:text-sm font-medium rounded-full shadow-md hover:bg-[#0093b4] transition-all duration-200 hover:scale-105 text-center whitespace-nowrap cursor-pointer"
                            >
                                Respuesta a la Trata e Inmigración
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
