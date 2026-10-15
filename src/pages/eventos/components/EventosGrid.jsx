import React, { useState, useMemo } from "react";
import { MapPin, Clock } from "lucide-react";
import eventosData from "../../../data/eventos.json";

function formatearFecha(fechaStr) {
    if (!fechaStr) return "dd - mm - aaaa";
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

/** Image placeholder SVG */
function ImagePlaceholder({ className = "" }) {
    return (
        <div
            className={`bg-gray-400 flex items-center justify-center ${className}`}
        >
            <svg
                className="w-16 h-16 text-white opacity-60"
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

function TarjetaEvento({ evento }) {
    const color = evento.colorTema || "#2C8E9E";

    return (
        <article
            className="relative flex flex-col w-full bg-white rounded-t-[40px] rounded-b-2xl overflow-hidden min-h-[440px] shadow-sm hover:shadow-lg transition-all duration-300"
            style={{ border: `2px solid ${color}` }}
        >
            {/* Top Image area */}
            <div className="relative w-full h-[220px] bg-gray-200 shrink-0 overflow-hidden">
                <div className="absolute inset-0">
                    {evento.imagen ? (
                        <img
                            src={evento.imagen}
                            alt={evento.titulo}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    ) : (
                        <ImagePlaceholder className="w-full h-full" />
                    )}
                </div>

                {/* City / Sede Badge (top-left) */}
                {evento.ciudad && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-800 shadow-sm flex items-center gap-1 z-10">
                        <MapPin className="w-3.5 h-3.5 text-lm-olive shrink-0" />
                        <span>{evento.ciudad}</span>
                    </div>
                )}

                {/* Date Badge (top-right) */}
                <div
                    className="absolute top-4 right-0 px-4 sm:px-6 py-1.5 rounded-l-full text-white text-xs sm:text-sm font-semibold shadow-xs z-10"
                    style={{ backgroundColor: color }}
                >
                    {formatearFecha(evento.fecha)}
                </div>
            </div>

            {/* Bottom arched content area */}
            <div
                className="flex-1 flex flex-col justify-between items-center px-5 sm:px-8 py-6 -mt-8 rounded-t-[45px] z-10 shadow-sm text-center"
                style={{ backgroundColor: color }}
            >
                <div className="w-full flex flex-col items-center">
                    {/* Event Title */}
                    <h3 className="italic text-white text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center line-clamp-2 leading-tight">
                        {evento.titulo}
                    </h3>

                    {/* Meta: Hora y Lugar */}
                    {(evento.hora || evento.lugar) && (
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/90 text-xs mb-3 font-medium">
                            {evento.hora && (
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 shrink-0" />
                                    {evento.hora}
                                </span>
                            )}
                            {evento.lugar && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                                    {evento.lugar}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-white text-xs sm:text-sm text-center leading-relaxed opacity-95 line-clamp-3 px-2">
                        {evento.descripcion}
                    </p>
                </div>

                {/* Action Button */}
                <div className="mt-4 w-full flex justify-center">
                    <button
                        className="bg-white px-8 py-2 rounded-full text-xs sm:text-sm font-bold shadow-md hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all max-w-[200px] w-full cursor-pointer"
                        style={{ color }}
                    >
                        Leer más
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function EventosGrid() {
    const [cantidadVisible, setCantidadVisible] = useState(6);

    // Eventos ordenados en pila (LIFO / fecha descendente: los más recientes subidos primero)
    const eventosOrdenados = useMemo(() => {
        const raw =
            eventosData?.tarjetasEventos || eventosData?.eventos || [];
        return [...raw].sort((a, b) => {
            const tA = new Date(
                a.fecha?.includes("T") ? a.fecha : a.fecha + "T00:00:00"
            ).getTime();
            const tB = new Date(
                b.fecha?.includes("T") ? b.fecha : b.fecha + "T00:00:00"
            ).getTime();
            if (!isNaN(tA) && !isNaN(tB) && tB !== tA) {
                return tB - tA;
            }
            return 0;
        });
    }, []);

    const eventosVisibles = eventosOrdenados.slice(0, cantidadVisible);
    const hayMasEventos = cantidadVisible < eventosOrdenados.length;

    const toggleVerMas = () => {
        if (hayMasEventos) {
            setCantidadVisible((prev) => prev + 6);
        } else {
            setCantidadVisible(6);
        }
    };

    return (
        <section className="w-full bg-[#F1FFFF] flex flex-col">
            {/* Section Banner Header */}
            <div
                className="w-full py-4 flex items-center justify-center shadow-xs"
                style={{ backgroundColor: "#859430" }}
            >
                <h2 className="italic font-medium text-white text-xl sm:text-2xl md:text-3xl tracking-widest uppercase">
                    ACTIVIDADES Y EVENTOS
                </h2>
            </div>

            {/* Grid container */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
                {eventosVisibles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {eventosVisibles.map((evento, idx) => (
                            <TarjetaEvento
                                key={evento.id || `${evento.fecha}-${idx}`}
                                evento={evento}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-lm-navy/60 text-sm italic">
                        No hay eventos disponibles actualmente.
                    </div>
                )}
            </div>

            {/* View more button section */}
            {eventosOrdenados.length > 6 && (
                <div
                    className="w-full py-8 flex items-center justify-center"
                    style={{ backgroundColor: "#0DADD4" }}
                >
                    <button
                        onClick={toggleVerMas}
                        className="bg-white px-10 sm:px-14 py-2.5 sm:py-3 rounded-full text-lg sm:text-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        style={{ color: "#0DADD4" }}
                    >
                        {hayMasEventos ? "Ver Más Eventos" : "Mostrar Menos"}
                    </button>
                </div>
            )}
        </section>
    );
}
