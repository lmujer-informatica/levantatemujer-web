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
        <div className="relative w-full h-[500px] overflow-hidden bg-lm-bg flex">
            {/* Mitad izquierda */}
            <div className="w-full md:w-[65%] h-full bg-lm-olive flex flex-col justify-center relative z-10 pl-6 sm:pl-8 md:pl-[10%] pr-4">
                <h1
                    key={fraseActual}
                    className="hero-text-in text-white text-4xl sm:text-5xl md:text-7xl font-normal leading-tight z-20 relative max-w-[95%] md:max-w-[75%]"
                >
                    {frases.length > 0
                        ? frases[fraseActual]
                        : "Fundación Levántate Mujer"}
                </h1>

                {/* Botones de navegación en pantallas móviles */}
                <div className="flex md:hidden flex-wrap items-center gap-2 mt-6 z-20">
                    <NavLink
                        to="/quienesSomos"
                        className="px-3.5 py-2 bg-white text-lm-navy text-xs font-semibold rounded-full shadow-md hover:bg-gray-100 active:scale-95 transition-transform"
                    >
                        Quiénes Somos
                    </NavLink>
                    <NavLink
                        to="/programaI"
                        className="px-3.5 py-2 bg-lm-cyan text-white text-xs font-semibold rounded-full shadow-md hover:bg-lm-cyan/90 active:scale-95 transition-transform"
                    >
                        Programa I
                    </NavLink>
                    <NavLink
                        to="/programaII"
                        className="px-3.5 py-2 bg-lm-cyan text-white text-xs font-semibold rounded-full shadow-md hover:bg-lm-cyan/90 active:scale-95 transition-transform"
                    >
                        Programa II
                    </NavLink>
                </div>
            </div>

            {/* Mitad derecha */}
            <div className="hidden md:block absolute right-0 top-0 h-full w-[45%] z-20">
                <div className="w-full h-full bg-[#EAF7FA] rounded-l-[150px] flex items-center justify-center relative p-8 lg:p-12 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
                    <div className="w-[85%] lg:w-[80%] h-[65%] lg:h-[68%] bg-gray-400 rounded-xl relative flex flex-col items-center justify-center overflow-hidden mb-6">
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

                    {/* 3 Botones que reemplazan a "Ver Programas" */}
                    <div className="absolute bottom-6 lg:bottom-8 left-0 right-0 px-4 flex items-center justify-center gap-2 lg:gap-3 z-30">
                        <NavLink
                            to="/quienesSomos"
                            className="px-3 py-2 lg:px-4 lg:py-2.5 bg-lm-cyan text-white text-xs lg:text-sm font-medium rounded-full shadow-md hover:bg-[#0093b4] transition-all duration-200 hover:scale-105 text-center whitespace-nowrap cursor-pointer"
                        >
                            Quiénes Somos
                        </NavLink>
                        <NavLink
                            to="/programaI"
                            className="px-3 py-2 lg:px-4 lg:py-2.5 bg-lm-cyan text-white text-xs lg:text-sm font-medium rounded-full shadow-md hover:bg-[#0093b4] transition-all duration-200 hover:scale-105 text-center whitespace-nowrap cursor-pointer"
                        >
                            Programa I
                        </NavLink>
                        <NavLink
                            to="/programaII"
                            className="px-3 py-2 lg:px-4 lg:py-2.5 bg-lm-cyan text-white text-xs lg:text-sm font-medium rounded-full shadow-md hover:bg-[#0093b4] transition-all duration-200 hover:scale-105 text-center whitespace-nowrap cursor-pointer"
                        >
                            Programa II
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
