import React from "react";
import mujeresLibresImg from "../../../imagenes/programaI/mujeres-libres.jpeg";

export default function BannerPrograma() {
    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-white flex items-center justify-center">
            {/* Background image container with real photo */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] sm:w-[420px] md:w-[520px] h-[260px] sm:h-[320px] md:h-[360px] rounded-2xl overflow-hidden relative shadow-md">
                    <img
                        src={mujeresLibresImg}
                        alt="Mujeres Libres de Violencia"
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay for text contrast */}
                    <div className="absolute inset-0 bg-black/25" />
                </div>
            </div>

            {/* Glow effect and title */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex flex-col items-center justify-center">
                    {/* Olive glow background */}
                    <div className="absolute inset-0 bg-[#d8eb96]/80 blur-2xl rounded-full scale-150" />

                    <h1 className="relative italic font-medium text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl z-10 px-4 drop-shadow-md text-center">
                        Mujeres Libres de Violencia
                    </h1>
                    {/* Underline accent */}
                    <div className="relative h-[2px] md:h-[3px] bg-white mt-2 w-[80%] md:w-[110%] z-10 shadow-xs" />
                </div>
            </div>
        </section>
    );
}
