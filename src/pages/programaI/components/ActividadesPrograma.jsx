import React, { useState, useRef, useEffect, useCallback } from "react";
import eventosData from "../../../data/eventos.json";

const CITIES = ["La Paz", "El Alto", "Oruro", "Santa Cruz", "Sucre"];

/** Formateador de fecha a DD - MM - AAAA */
function formatearFecha(fechaStr) {
    if (!fechaStr) return "";
    try {
        const fecha = new Date(
            fechaStr.includes("T") ? fechaStr : fechaStr + "T00:00:00"
        );
        if (isNaN(fecha.getTime())) return fechaStr;
        const dd = String(fecha.getDate()).padStart(2, "0");
        const mm = String(fecha.getMonth() + 1).padStart(2, "0");
        const aaaa = fecha.getFullYear();
        return `${dd} - ${mm} - ${aaaa}`;
    } catch {
        return fechaStr;
    }
}

/** Obtiene las 3 actividades (eventos) con las fechas más próximas para la ciudad seleccionada */
function obtenerActividadesProximas(eventos, ciudad) {
    if (!Array.isArray(eventos)) return [];
    const deCiudad = eventos.filter(
        (ev) =>
            ev &&
            ev.ciudad &&
            ev.ciudad.trim().toLowerCase() === ciudad.trim().toLowerCase()
    );

    if (deCiudad.length === 0) return [];

    const hoy = new Date().setHours(0, 0, 0, 0);

    // Separar en eventos futuros y pasados
    const futuros = deCiudad.filter((ev) => {
        const t = new Date(
            ev.fecha?.includes("T") ? ev.fecha : ev.fecha + "T00:00:00"
        ).getTime();
        return !isNaN(t) && t >= hoy;
    });

    const pasados = deCiudad.filter((ev) => {
        const t = new Date(
            ev.fecha?.includes("T") ? ev.fecha : ev.fecha + "T00:00:00"
        ).getTime();
        return isNaN(t) || t < hoy;
    });

    // Los futuros se ordenan de más próximo a más lejano (ascendente)
    futuros.sort(
        (a, b) =>
            new Date(a.fecha?.includes("T") ? a.fecha : a.fecha + "T00:00:00") -
            new Date(b.fecha?.includes("T") ? b.fecha : b.fecha + "T00:00:00")
    );

    // Los pasados se ordenan del más reciente hacia atrás (descendente)
    pasados.sort(
        (a, b) =>
            new Date(b.fecha?.includes("T") ? b.fecha : b.fecha + "T00:00:00") -
            new Date(a.fecha?.includes("T") ? a.fecha : a.fecha + "T00:00:00")
    );

    const ordenados = [...futuros, ...pasados];
    return ordenados.slice(0, 3);
}

/** Image placeholder SVG */
function ImagePlaceholder({ className = "" }) {
    return (
        <div
            className={`bg-gray-300 flex items-center justify-center ${className}`}
        >
            <svg
                className="w-12 h-12 text-white opacity-60"
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

export default function ActividadesPrograma() {
    const [activeCity, setActiveCity] = useState("La Paz");
    const [indicator, setIndicator] = useState({
        left: 0,
        top: 0,
        width: 0,
        ready: false,
    });
    const [isAnimated, setIsAnimated] = useState(false);
    const tabsRef = useRef({});
    const containerRef = useRef(null);

    const poolEventos = eventosData?.tarjetasEventos || [];
    const actividades = obtenerActividadesProximas(poolEventos, activeCity);

    const updateIndicator = useCallback(() => {
        const activeEl = tabsRef.current[activeCity];
        if (activeEl) {
            setIndicator({
                left: activeEl.offsetLeft,
                top: activeEl.offsetTop + activeEl.offsetHeight - 2,
                width: activeEl.offsetWidth,
                ready: true,
            });
        }
    }, [activeCity]);

    useEffect(() => {
        updateIndicator();
        if (!isAnimated) {
            const timer = setTimeout(() => setIsAnimated(true), 50);
            return () => clearTimeout(timer);
        }
    }, [updateIndicator, isAnimated]);

    useEffect(() => {
        const handleResize = () => updateIndicator();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [updateIndicator]);

    useEffect(() => {
        if (document.fonts?.ready) {
            document.fonts.ready.then(updateIndicator);
        }
    }, [updateIndicator]);

    return (
        <section
            id="actividades"
            className="w-full bg-[#EFFFFA] py-8 md:py-12 scroll-mt-24"
        >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section title */}
                <div className="bg-lm-olive py-2 px-4 mb-6 flex items-center justify-center">
                    <h2 className="italic font-medium text-[#E3FFF8] text-2xl md:text-3xl tracking-wide">
                        ACTIVIDADES
                    </h2>
                </div>

                {/* City tabs */}
                <div
                    ref={containerRef}
                    className="relative flex flex-wrap gap-4 md:gap-8 mb-8 border-b border-gray-200"
                >
                    {CITIES.map((city) => (
                        <button
                            key={city}
                            ref={(el) => {
                                if (el) tabsRef.current[city] = el;
                            }}
                            onClick={() => setActiveCity(city)}
                            className={`text-sm md:text-base font-medium transition-colors pb-2.5 cursor-pointer select-none touch-manipulation ${
                                activeCity === city
                                    ? "text-lm-navy"
                                    : "text-lm-navy/60 hover:text-lm-navy"
                            }`}
                        >
                            {city}
                        </button>
                    ))}

                    {/* Línea horizontal indicadora con animación deslizante */}
                    <span
                        className={`absolute h-[2.5px] bg-lm-navy rounded-full z-10 pointer-events-none ${
                            isAnimated
                                ? "transition-all duration-300 ease-out"
                                : "transition-none"
                        }`}
                        style={{
                            left: `${indicator.left}px`,
                            top: `${indicator.top}px`,
                            width: `${indicator.width}px`,
                            opacity: indicator.ready ? 1 : 0,
                        }}
                    />
                </div>

                {/* Activity cards grid */}
                {actividades.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {actividades.map((activity, idx) => {
                            const accentColor =
                                activity.colorTema ||
                                (idx % 2 === 0 ? "#15A4C9" : "#BAcb5E");

                            return (
                                <div
                                    key={activity.id || idx}
                                    className="bg-[#E3FFF8] rounded-t-[50px] rounded-b-xl overflow-hidden shadow-sm flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="w-full h-44 rounded-t-[50px] overflow-hidden bg-gray-300">
                                        {activity.imagen ? (
                                            <img
                                                src={activity.imagen}
                                                alt={activity.titulo || "Actividad"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImagePlaceholder className="w-full h-44 rounded-t-[50px]" />
                                        )}
                                    </div>

                                    {/* Name label */}
                                    <div
                                        className="py-2 px-4 text-center font-medium text-white text-base truncate"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        {activity.titulo || "Actividad"}
                                    </div>

                                    {/* Description and Date */}
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <p
                                            className="text-xs leading-relaxed mb-3 line-clamp-3"
                                            style={{ color: accentColor }}
                                        >
                                            {activity.descripcion ||
                                                "Información sobre la actividad."}
                                        </p>
                                        {activity.fecha && (
                                            <span
                                                className="text-[11px] font-semibold opacity-90 self-end"
                                                style={{ color: accentColor }}
                                            >
                                                {formatearFecha(activity.fecha)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12 text-lm-navy/60 text-sm italic">
                        No hay actividades programadas próximamente en {activeCity}.
                    </div>
                )}
            </div>
        </section>
    );
}
