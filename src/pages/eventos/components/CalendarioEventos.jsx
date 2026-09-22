import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import eventosData from "../../../data/eventos.json";

const DIAS_SEMANA = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];
const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

function obtenerDiasDelMes(anio, mes) {
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();

    // getDay() returns 0=Sunday, we need 0=Monday
    let diaInicio = primerDia.getDay() - 1;
    if (diaInicio < 0) diaInicio = 6;

    const dias = [];

    // Previous month filler days
    const diasMesAnterior = new Date(anio, mes, 0).getDate();
    for (let i = diaInicio - 1; i >= 0; i--) {
        dias.push({ dia: diasMesAnterior - i, esMesActual: false });
    }

    // Current month days
    for (let i = 1; i <= diasEnMes; i++) {
        dias.push({ dia: i, esMesActual: true });
    }

    // Next month filler days
    const fillerDias = 42 - dias.length; // Always show 6 rows
    for (let i = 1; i <= fillerDias; i++) {
        dias.push({ dia: i, esMesActual: false });
    }

    return dias;
}

function formatearFecha(fechaStr) {
    if (!fechaStr) return "dd - mm - aaaa";
    const fecha = new Date(fechaStr + "T00:00:00");
    const dd = String(fecha.getDate()).padStart(2, "0");
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const aaaa = fecha.getFullYear();
    return `${dd} - ${mm} - ${aaaa}`;
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

export default function CalendarioEventos() {
    const hoy = new Date();
    const [mesActual, setMesActual] = useState(hoy.getMonth());
    const [anioActual, setAnioActual] = useState(hoy.getFullYear());

    const eventosCalendario = eventosData.eventosCalendario || [];
    const eventoDestacado = eventosData.eventoDestacado || null;

    // Build a map of day => events for the current month
    const mapaEventos = useMemo(() => {
        const mapa = {};
        eventosCalendario.forEach((ev) => {
            const fecha = new Date(ev.fecha + "T00:00:00");
            if (
                fecha.getMonth() === mesActual &&
                fecha.getFullYear() === anioActual
            ) {
                const dia = fecha.getDate();
                if (!mapa[dia]) mapa[dia] = [];
                mapa[dia].push(ev);
            }
        });
        return mapa;
    }, [eventosCalendario, mesActual, anioActual]);

    const dias = obtenerDiasDelMes(anioActual, mesActual);

    const mesAnterior = () => {
        if (mesActual === 0) {
            setMesActual(11);
            setAnioActual(anioActual - 1);
        } else {
            setMesActual(mesActual - 1);
        }
    };

    const mesSiguiente = () => {
        if (mesActual === 11) {
            setMesActual(0);
            setAnioActual(anioActual + 1);
        } else {
            setMesActual(mesActual + 1);
        }
    };

    return (
        <section className="w-full bg-[#F1FFFF] py-10 md:py-16">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    {/* ====== LEFT: Calendar ====== */}
                    <div className="w-full lg:w-1/2">
                        {/* Month/Year nav */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={mesAnterior}
                                className="p-2 rounded-full hover:bg-white/60 transition-colors text-lm-navy"
                                aria-label="Mes anterior"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <h2 className="text-xl md:text-2xl font-semibold text-lm-cyan italic">
                                {MESES[mesActual]} - {anioActual}
                            </h2>
                            <button
                                onClick={mesSiguiente}
                                className="p-2 rounded-full hover:bg-white/60 transition-colors text-lm-navy"
                                aria-label="Mes siguiente"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Day headers */}
                        <div className="grid grid-cols-7 border border-gray-300 bg-white">
                            {DIAS_SEMANA.map((nombre) => (
                                <div
                                    key={nombre}
                                    className="py-2 text-center text-[10px] sm:text-xs font-semibold text-lm-navy border-b border-gray-300 truncate"
                                >
                                    {nombre}
                                </div>
                            ))}

                            {/* Day cells */}
                            {dias.map((celda, idx) => {
                                const eventos = celda.esMesActual
                                    ? mapaEventos[celda.dia] || []
                                    : [];
                                const esHoy =
                                    celda.esMesActual &&
                                    celda.dia === hoy.getDate() &&
                                    mesActual === hoy.getMonth() &&
                                    anioActual === hoy.getFullYear();

                                return (
                                    <div
                                        key={idx}
                                        className={`relative min-h-[48px] sm:min-h-[60px] md:min-h-[70px] p-1 border border-gray-200 flex flex-col ${
                                            celda.esMesActual
                                                ? "bg-white"
                                                : "bg-gray-50"
                                        }`}
                                    >
                                        <span
                                            className={`text-[11px] sm:text-xs leading-none ${
                                                celda.esMesActual
                                                    ? "text-gray-700"
                                                    : "text-gray-400"
                                            } ${esHoy ? "font-bold text-lm-cyan" : ""}`}
                                        >
                                            {celda.dia}
                                        </span>

                                        {/* Event chips */}
                                        {eventos.map((ev, evIdx) => (
                                            <div
                                                key={evIdx}
                                                className="mt-auto rounded text-[8px] sm:text-[10px] text-white text-center px-1 py-0.5 leading-tight truncate"
                                                style={{
                                                    backgroundColor:
                                                        ev.color || "#2C8E9E",
                                                }}
                                                title={ev.nombre}
                                            >
                                                <span className="hidden sm:inline">
                                                    {ev.nombre}
                                                </span>
                                                <span className="sm:hidden">
                                                    ●
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ====== RIGHT: Event detail ====== */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        {eventoDestacado ? (
                            <>
                                {/* Date badge */}
                                <div className="flex justify-end mb-3">
                                    <span className="bg-lm-navy text-white text-sm px-6 py-1.5 rounded-l-full">
                                        {formatearFecha(eventoDestacado.fecha)}
                                    </span>
                                </div>

                                {/* Event image */}
                                <div className="relative w-full h-[180px] md:h-[220px] rounded-2xl overflow-hidden mb-4">
                                    {eventoDestacado.imagen ? (
                                        <img
                                            src={eventoDestacado.imagen}
                                            alt={eventoDestacado.titulo}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImagePlaceholder className="w-full h-full rounded-2xl" />
                                    )}
                                    {/* Title overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-lm-cyan/90 py-3 px-6">
                                        <h3 className="text-white text-lg md:text-xl italic font-medium text-center">
                                            {eventoDestacado.titulo}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    {eventoDestacado.descripcion}
                                </p>

                                {/* Location & Time */}
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mb-5">
                                    {eventoDestacado.lugar && (
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <MapPin className="w-5 h-5 text-lm-olive shrink-0" />
                                            <span>{eventoDestacado.lugar}</span>
                                        </div>
                                    )}
                                    {eventoDestacado.hora && (
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Clock className="w-5 h-5 text-lm-navy shrink-0" />
                                            <span>{eventoDestacado.hora}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Audience tags */}
                                {eventoDestacado.dirigidoA?.length > 0 && (
                                    <div>
                                        <h4 className="text-lm-navy font-semibold text-sm italic mb-3 text-center">
                                            ¿A quiénes va dirigido?
                                        </h4>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {eventoDestacado.dirigidoA.map(
                                                (persona, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="border border-lm-navy text-lm-navy rounded-full px-4 py-1 text-xs font-medium"
                                                    >
                                                        {persona}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400 italic">
                                No hay evento destacado
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
