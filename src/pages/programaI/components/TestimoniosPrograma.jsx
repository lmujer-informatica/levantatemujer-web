import React, { useState, useRef, useCallback } from "react";
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
                                loading="lazy"
                                decoding="async"
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

/**
 * Hook de carrusel deslizante con animación, soporte touch y botones.
 * Muestra 1 card en móvil, 3 en sm+.
 */
function useSlideCarousel(items) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState(null); // 'left' | 'right'

    // Touch
    const touchStartX = useRef(null);
    const touchCurrentX = useRef(null);
    const [dragOffset, setDragOffset] = useState(0);
    const isDragging = useRef(false);

    const count = items.length;

    const goNext = useCallback(() => {
        if (isAnimating || count === 0) return;
        setSlideDirection("left");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % count);
            setIsAnimating(false);
            setSlideDirection(null);
        }, 350);
    }, [isAnimating, count]);

    const goPrev = useCallback(() => {
        if (isAnimating || count === 0) return;
        setSlideDirection("right");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + count) % count);
            setIsAnimating(false);
            setSlideDirection(null);
        }, 350);
    }, [isAnimating, count]);

    const onTouchStart = useCallback((e) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchCurrentX.current = e.targetTouches[0].clientX;
        isDragging.current = true;
        setDragOffset(0);
    }, []);

    const onTouchMove = useCallback((e) => {
        if (!isDragging.current) return;
        touchCurrentX.current = e.targetTouches[0].clientX;
        const delta = touchCurrentX.current - touchStartX.current;
        setDragOffset(delta);
    }, []);

    const onTouchEnd = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const diff = touchStartX.current - touchCurrentX.current;
        setDragOffset(0);
        if (diff > 50) {
            goNext();
        } else if (diff < -50) {
            goPrev();
        }
    }, [goNext, goPrev]);

    return {
        currentIndex,
        isAnimating,
        slideDirection,
        dragOffset,
        goNext,
        goPrev,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    };
}

/** Carrusel genérico con deslizamiento animado */
function SlideCarousel({
    items,
    renderCard,
    carousel,
    prevBtnClass,
    nextBtnClass,
}) {
    const {
        currentIndex,
        isAnimating,
        slideDirection,
        dragOffset,
        goNext,
        goPrev,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    } = carousel;

    if (!items || items.length === 0) return null;

    // Construir los ítems visibles: prev group | current group | next group
    const count = items.length;
    const getItem = (offset) => items[((currentIndex + offset) % count + count) % count];

    // Para desktop (3 cards) y mobile (1 card), mostramos 3 grupos de 3 cards
    const prevItems = [getItem(-3), getItem(-2), getItem(-1)];
    const currItems = [getItem(0), getItem(1), getItem(2)];
    const nextItems = [getItem(3), getItem(4), getItem(5)];

    // Animación de deslizamiento
    let translatePercent = 0;
    if (slideDirection === "left") translatePercent = -100;
    if (slideDirection === "right") translatePercent = 100;

    // Drag offset en porcentaje del contenedor
    const dragPercent = dragOffset !== 0 ? (dragOffset / window.innerWidth) * 100 : 0;

    return (
        <div
            className="relative flex items-center gap-3 sm:gap-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Botón Anterior */}
            <button
                onClick={goPrev}
                className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors cursor-pointer z-10 ${prevBtnClass}`}
                aria-label="Anterior"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Track del carrusel */}
            <div className="flex-1 overflow-hidden">
                <div
                    className="flex w-[300%]"
                    style={{
                        transform: `translateX(calc(-33.333% + ${translatePercent / 3}% + ${dragPercent / 3}%))`,
                        transition:
                            isAnimating
                                ? "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)"
                                : "none",
                    }}
                >
                    {/* Grupo anterior */}
                    <div className="w-1/3 grid grid-cols-1 sm:grid-cols-3 gap-4 px-0 shrink-0">
                        {prevItems.map((item, idx) => (
                            <div
                                key={`prev-${item?.id || idx}`}
                                className={
                                    idx === 0
                                        ? "block col-span-1"
                                        : "hidden sm:block col-span-1"
                                }
                            >
                                {renderCard(item, idx)}
                            </div>
                        ))}
                    </div>

                    {/* Grupo actual */}
                    <div className="w-1/3 grid grid-cols-1 sm:grid-cols-3 gap-4 px-0 shrink-0">
                        {currItems.map((item, idx) => (
                            <div
                                key={`curr-${item?.id || idx}`}
                                className={
                                    idx === 0
                                        ? "block col-span-1"
                                        : "hidden sm:block col-span-1"
                                }
                            >
                                {renderCard(item, idx)}
                            </div>
                        ))}
                    </div>

                    {/* Grupo siguiente */}
                    <div className="w-1/3 grid grid-cols-1 sm:grid-cols-3 gap-4 px-0 shrink-0">
                        {nextItems.map((item, idx) => (
                            <div
                                key={`next-${item?.id || idx}`}
                                className={
                                    idx === 0
                                        ? "block col-span-1"
                                        : "hidden sm:block col-span-1"
                                }
                            >
                                {renderCard(item, idx)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Botón Siguiente */}
            <button
                onClick={goNext}
                className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors cursor-pointer z-10 ${nextBtnClass}`}
                aria-label="Siguiente"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
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

    const carouselSup = useSlideCarousel(testimoniosSuperior);
    const carouselInf = useSlideCarousel(testimoniosInferior);

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
                <div className="mb-8">
                    <SlideCarousel
                        items={testimoniosSuperior}
                        carousel={carouselSup}
                        prevBtnClass="bg-lm-navy hover:bg-lm-navy/80"
                        nextBtnClass="bg-lm-navy hover:bg-lm-navy/80"
                        renderCard={(testimonio) => (
                            <TestimonialFlipCard
                                testimonio={testimonio}
                                colorVolteado="#0DADD4"
                            />
                        )}
                    />
                </div>

                {/* Fila 2: Carrusel inferior (volteo con fondo verde) */}
                <SlideCarousel
                    items={testimoniosInferior}
                    carousel={carouselInf}
                    prevBtnClass="bg-lm-olive hover:bg-lm-olive/80"
                    nextBtnClass="bg-lm-olive hover:bg-lm-olive/80"
                    renderCard={(testimonio) => (
                        <TestimonialFlipCard
                            testimonio={testimonio}
                            colorVolteado="#859430"
                        />
                    )}
                />
            </div>
        </section>
    );
}
