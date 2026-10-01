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
        <div className="relative w-full h-auto md:h-[500px] overflow-hidden bg-lm-bg flex flex-col md:block">
            {/* Mitad izquierda (Contenedor Verde) */}
            <div className="w-full md:w-[60%] lg:w-[62%] h-auto md:h-full min-h-[300px] md:min-h-0 bg-lm-olive flex flex-col justify-center relative z-10 pl-6 sm:pl-8 md:pl-[8%] lg:pl-[10%] pr-4 py-10 md:py-0">
                <h1
                    key={fraseActual}
                    className="hero-text-in text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight z-20 relative max-w-[95%] md:max-w-[85%]"
                >
                    {frases.length > 0
                        ? frases[fraseActual]
                        : "Fundación Levántate Mujer"}
                </h1>

                {/* Botones de navegación en pantallas móviles */}
                <div className="flex md:hidden flex-wrap items-center gap-2 mt-8 z-20">
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

            {/* Mitad derecha (Imagen y Botones Desktop) */}
            <div className="w-full h-[250px] sm:h-[350px] md:h-full relative md:absolute md:right-0 md:top-0 md:w-[45%] lg:w-[46%] xl:w-[45%] z-20">
                <div className="w-full h-full bg-[#EAF7FA] md:rounded-l-[150px] flex items-center justify-center relative md:p-6 lg:p-8 xl:p-10 md:shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
                    
                    {/* Contenedor de la Imagen */}
                    <div className="w-full h-full md:w-[85%] lg:w-[80%] md:h-[55%] lg:h-[58%] bg-gray-400 md:rounded-xl relative flex flex-col items-center justify-center overflow-hidden md:mb-16 lg:mb-14">
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
                                    className="w-24 h-24 md:w-48 md:h-48 opacity-80"
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

                    {/* 3 Botones para Desktop */}
                    <div className="hidden md:flex absolute bottom-3 lg:bottom-5 left-0 right-0 px-3 lg:px-6 flex-col items-center justify-center gap-1.5 lg:gap-2 z-30">
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
