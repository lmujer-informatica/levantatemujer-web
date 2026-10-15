import React, { useState, useEffect } from "react";
import eventosData from "../../../data/eventos.json";

export default function BannerEventos() {
    const [fraseActual, setFraseActual] = useState(0);
    const frases = eventosData?.heroFrases || ["Eventos que Inspiran"];
    const heroImagen = eventosData?.heroImagen || "";

    useEffect(() => {
        if (frases.length <= 1) return;
        const intervalo = setInterval(() => {
            setFraseActual((actual) => (actual + 1) % frases.length);
        }, 5000);
        return () => clearInterval(intervalo);
    }, [frases.length]);

    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-white flex items-center justify-center">
            {/* Background image covering full hero container */}
            <div className="absolute inset-0 w-full h-full">
                {heroImagen ? (
                    <img
                        src={heroImagen}
                        alt="Hero Eventos"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                        <svg
                            className="w-32 h-32 text-white opacity-40"
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
                )}
                {/* Subtle dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/35" />
            </div>

            {/* Glow effect and title with vertical rotation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex flex-col items-center justify-center max-w-[90%] md:max-w-[80%]">
                    {/* Olive glow background */}
                    <div className="absolute inset-0 bg-[#d8eb96]/70 blur-2xl rounded-full scale-150" />

                    {/* Smooth rotating title */}
                    <div
                        style={{ perspective: "800px" }}
                        className="overflow-hidden py-2 text-center"
                    >
                        <h1
                            key={fraseActual}
                            className="hero-text-rotate-vertical relative italic font-medium text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl z-10 px-4 drop-shadow-md text-center"
                        >
                            {frases[fraseActual]}
                        </h1>
                    </div>

                    {/* Underline accent */}
                    <div className="relative h-[2px] md:h-[3px] bg-white mt-2 w-[80%] md:w-[120%] z-10 shadow-xs" />
                </div>
            </div>
        </section>
    );
}
