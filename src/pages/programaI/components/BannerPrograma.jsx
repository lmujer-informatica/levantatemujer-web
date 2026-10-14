import React from "react";
import programaIData from "../../../data/programaI.json";
import mujeresLibresImg from "../../../imagenes/programaI/mujeres-libres.jpeg";

export default function BannerPrograma() {
    const imagenHero = programaIData?.heroImagen || mujeresLibresImg;

    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-white flex items-center justify-center">
            {/* Background image taking full container space */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={imagenHero}
                    alt="Mujeres Libres de Violencia"
                    className="w-full h-full object-cover"
                />
                {/* Overlay for contrast */}
                <div className="absolute inset-0 bg-black/35" />
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
