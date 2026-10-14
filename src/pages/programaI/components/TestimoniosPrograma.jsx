import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import programaIData from "../../../data/programaI.json";

/** Image placeholder */
function ImagePlaceholder({ className = "" }) {
    return (
        <div
            className={`bg-gray-300 flex items-center justify-center ${className}`}
        >
            <svg
                className="w-10 h-10 text-white opacity-60"
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

/** Card de testimonio con animación de volteo 3D (Flip Card) */
function TestimonialFlipCard({ testimonio, colorVolteado }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="h-[270px] w-full cursor-pointer select-none"
            style={{ perspective: "1000px" }}
            onClick={() => setIsFlipped((prev) => !prev)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsFlipped((prev) => !prev);
                }
            }}
            title="Haz clic para voltear"
        >
            <div
                className="relative w-full h-full transition-transform duration-700 shadow-md rounded-t-[50%] rounded-b-xl"
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* ================= CARA FRONTAL ================= */}
                {/* Diseño: Imagen + Nombre del testigo + Cargo del testigo */}
                <div
                    className={`absolute inset-0 w-full h-full rounded-t-[50%] rounded-b-xl overflow-hidden flex flex-col items-center bg-[#E3FFF8] border-2 border-[#b0e8dc] transition-opacity duration-300 ${
                        isFlipped
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    {/* Foto del testigo */}
                    <div className="w-full h-40 rounded-t-[50%] overflow-hidden bg-gray-300 flex items-center justify-center shrink-0">
                        {testimonio.imagen ? (
                            <img
                                src={testimonio.imagen}
                                alt={testimonio.autor || "Testigo"}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <ImagePlaceholder className="w-full h-40 rounded-t-[50%]" />
                        )}
                    </div>

                    {/* Nombre y cargo */}
                    <div className="px-4 py-3 text-center flex flex-col justify-center grow">
                        <p
                            className="text-xs font-semibold leading-tight mb-1"
                            style={{ color: "#407178" }}
                        >
                            {testimonio.autor || "(Nombre)"}
                        </p>
                        <p
                            className="text-xs font-normal"
                            style={{ color: "#407178" }}
                        >
                            {testimonio.rol || "(Cargo)"}
                        </p>
                    </div>
                </div>

                {/* ================= CARA TRASERA ================= */}
                {/* Diseño: Título del testimonio + Texto del testimonio */}
                <div
                    className="absolute inset-0 w-full h-full rounded-t-[50%] rounded-b-xl overflow-hidden flex flex-col items-center justify-center p-6 shadow-md"
                    style={{
                        backgroundColor: colorVolteado,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <h3 className="font-medium text-lg italic mb-3 text-center text-[#E3FFF8] leading-tight">
                        {testimonio.titulo || "Título"}
                    </h3>
                    <p className="text-xs leading-relaxed text-center text-[#E3FFF8] overflow-y-auto max-h-[140px] px-2">
                        {testimonio.texto ||
                            "Lorem ipsum dolor sit amet consectetur adipiscing elit congue..."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function obtenerVisibles(items, indexInicio) {
    if (!Array.isArray(items) || items.length === 0) return [];
    if (items.length <= 3) return items;
    return [
        items[indexInicio % items.length],
        items[(indexInicio + 1) % items.length],
        items[(indexInicio + 2) % items.length],
    ];
}

export default function TestimoniosPrograma() {
    const testimoniosSuperior =
        programaIData?.testimoniosSuperior?.length > 0
            ? programaIData.testimoniosSuperior
            : programaIData?.testimonios || [];

    const testimoniosInferior =
        programaIData?.testimoniosInferior?.length > 0
            ? programaIData.testimoniosInferior
            : programaIData?.testimonios || [];

    const [indexSuperior, setIndexSuperior] = useState(0);
    const [indexInferior, setIndexInferior] = useState(0);

    const prevSuperior = () =>
        setIndexSuperior(
            (i) =>
                (i - 1 + testimoniosSuperior.length) %
                testimoniosSuperior.length
        );
    const nextSuperior = () =>
        setIndexSuperior((i) => (i + 1) % testimoniosSuperior.length);

    const prevInferior = () =>
        setIndexInferior(
            (i) =>
                (i - 1 + testimoniosInferior.length) %
                testimoniosInferior.length
        );
    const nextInferior = () =>
        setIndexInferior((i) => (i + 1) % testimoniosInferior.length);

    const visiblesSuperior = obtenerVisibles(testimoniosSuperior, indexSuperior);
    const visiblesInferior = obtenerVisibles(testimoniosInferior, indexInferior);

    return (
        <section
            id="testimonios"
            className="w-full bg-[#0DADD4] py-8 md:py-12 scroll-mt-24"
        >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section title */}
                <div className="flex items-center justify-center mb-8">
                    <div className="relative flex items-center">
                        <div className="absolute -left-6 w-4 h-6 bg-[#0DADD4]" />
                        <div className="bg-[#0DADD4] px-4 py-1 flex items-center gap-3">
                            <div className="w-3 h-8 bg-[#0DADD4]" />
                            <h2 className="italic font-medium text-[#E3FFF8] text-2xl md:text-3xl tracking-wide">
                                TESTIMONIOS
                            </h2>
                            <div className="w-3 h-8 bg-[#0DADD4]" />
                        </div>
                    </div>
                </div>

                {/* Fila 1: Carrusel superior (volteo con fondo celeste) */}
                <div className="relative flex items-center gap-4 mb-8">
                    {/* Botón Anterior */}
                    <button
                        onClick={prevSuperior}
                        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 transition-colors cursor-pointer"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Grid de 3 tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                        {visiblesSuperior.map((testimonio, idx) => (
                            <TestimonialFlipCard
                                key={testimonio.id || `sup-${idx}`}
                                testimonio={testimonio}
                                colorVolteado="#0DADD4"
                            />
                        ))}
                    </div>

                    {/* Botón Siguiente */}
                    <button
                        onClick={nextSuperior}
                        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 transition-colors cursor-pointer"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Fila 2: Carrusel inferior (volteo con fondo verde) */}
                <div className="relative flex items-center gap-4">
                    {/* Botón Anterior */}
                    <button
                        onClick={prevInferior}
                        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-olive text-white hover:bg-lm-olive/80 transition-colors cursor-pointer"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Grid de 3 tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                        {visiblesInferior.map((testimonio, idx) => (
                            <TestimonialFlipCard
                                key={testimonio.id || `inf-${idx}`}
                                testimonio={testimonio}
                                colorVolteado="#859430"
                            />
                        ))}
                    </div>

                    {/* Botón Siguiente */}
                    <button
                        onClick={nextInferior}
                        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-olive text-white hover:bg-lm-olive/80 transition-colors cursor-pointer"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
