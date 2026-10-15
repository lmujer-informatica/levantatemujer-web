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

    // Next month filler days (always keep 6 rows = 42 cells)
    const fillerDias = 42 - dias.length;
    for (let i = 1; i <= fillerDias; i++) {
        dias.push({ dia: i, esMesActual: false });
    }

    return dias;
}

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

export default function CalendarioEventos() {
    const hoy = new Date();
    const [mesActual, setMesActual] = useState(hoy.getMonth());
    const [anioActual, setAnioActual] = useState(hoy.getFullYear());
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

    // Unified list of events from Decap CMS / JSON
    const todosLosEventos = useMemo(() => {
        return eventosData?.tarjetasEventos || eventosData?.eventos || [];
    }, []);

    // Closest future event to today (automatic fallback if no future event)
    const eventoProximo = useMemo(() => {
        if (!todosLosEventos || todosLosEventos.length === 0) return null;

        const hoyDate = new Date();
        const hoyStr = `${hoyDate.getFullYear()}-${String(
            hoyDate.getMonth() + 1
        ).padStart(2, "0")}-${String(hoyDate.getDate()).padStart(2, "0")}`;

        // Future or today events
        const futuros = todosLosEventos.filter(
            (ev) => ev && ev.fecha && ev.fecha >= hoyStr
        );

        if (futuros.length > 0) {
            // Sort ascending by date (closest to today first)
            const ordenados = [...futuros].sort((a, b) =>
                a.fecha.localeCompare(b.fecha)
            );
            return ordenados[0];
        }

        // If no future event exists, return the most recent past event (descending)
        const pasados = [...todosLosEventos].filter((ev) => ev && ev.fecha);
        pasados.sort((a, b) => b.fecha.localeCompare(a.fecha));
        return pasados[0] || todosLosEventos[0];
    }, [todosLosEventos]);

    // Active event displayed on the right panel
    const eventoMostrado = eventoSeleccionado || eventoProximo;

    // Parse chips safely
    const chips = useMemo(() => {
        if (!eventoMostrado?.dirigidoA) return [];
        if (Array.isArray(eventoMostrado.dirigidoA)) {
            return eventoMostrado.dirigidoA
                .map((item) =>
                    typeof item === "string"
                        ? item
                        : item?.etiqueta || item?.publico || ""
                )
                .filter(Boolean);
        }
        return [];
    }, [eventoMostrado]);

    // Build a map of day => events for the current month and year
    const mapaEventos = useMemo(() => {
        const mapa = {};
        todosLosEventos.forEach((ev) => {
            if (!ev || !ev.fecha) return;
            const partes = ev.fecha.split("-");
            if (partes.length < 3) return;
            const evAno = parseInt(partes[0], 10);
            const evMes = parseInt(partes[1], 10) - 1; // 0-based month
            const evDia = parseInt(partes[2], 10);

            if (evMes === mesActual && evAno === anioActual) {
                if (!mapa[evDia]) mapa[evDia] = [];
                mapa[evDia].push(ev);
            }
        });
        return mapa;
    }, [todosLosEventos, mesActual, anioActual]);

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
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
                    {/* ====== LEFT: Interactive Calendar ====== */}
                    <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-200/80 p-4 sm:p-6">
                        {/* Month/Year nav */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={mesAnterior}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-lm-navy cursor-pointer"
                                aria-label="Mes anterior"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <h2 className="text-xl md:text-2xl font-bold text-lm-cyan italic select-none">
                                {MESES[mesActual]} - {anioActual}
                            </h2>
                            <button
                                onClick={mesSiguiente}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-lm-navy cursor-pointer"
                                aria-label="Mes siguiente"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Day headers */}
                        <div className="grid grid-cols-7 border-t border-l border-gray-200 bg-gray-50 rounded-t-lg overflow-hidden">
                            {DIAS_SEMANA.map((nombre) => (
                                <div
                                    key={nombre}
                                    className="py-2.5 text-center text-[10px] sm:text-xs font-bold text-lm-navy border-r border-b border-gray-200 truncate select-none"
                                >
                                    <span className="hidden sm:inline">
                                        {nombre}
                                    </span>
                                    <span className="sm:hidden">
                                        {nombre.slice(0, 3)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Day cells grid */}
                        <div className="grid grid-cols-7 border-l border-gray-200 bg-white rounded-b-lg overflow-hidden">
                            {dias.map((celda, idx) => {
                                const eventosEnDia = celda.esMesActual
                                    ? mapaEventos[celda.dia] || []
                                    : [];
                                const esHoy =
                                    celda.esMesActual &&
                                    celda.dia === hoy.getDate() &&
                                    mesActual === hoy.getMonth() &&
                                    anioActual === hoy.getFullYear();

                                const tieneSeleccionado =
                                    celda.esMesActual &&
                                    eventoMostrado &&
                                    eventosEnDia.some(
                                        (e) =>
                                            e.titulo ===
                                                eventoMostrado.titulo &&
                                            e.fecha === eventoMostrado.fecha
                                    );

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            if (eventosEnDia.length > 0) {
                                                setEventoSeleccionado(
                                                    eventosEnDia[0]
                                                );
                                            }
                                        }}
                                        className={`relative min-h-[56px] sm:min-h-[68px] md:min-h-[76px] p-1 border-r border-b border-gray-200 flex flex-col justify-start transition-colors ${
                                            celda.esMesActual
                                                ? "bg-white"
                                                : "bg-gray-50/60"
                                        } ${
                                            tieneSeleccionado
                                                ? "bg-cyan-50/80 ring-2 ring-inset ring-lm-cyan"
                                                : ""
                                        } ${
                                            eventosEnDia.length > 0
                                                ? "cursor-pointer hover:bg-cyan-50/40"
                                                : ""
                                        }`}
                                    >
                                        {/* Day number */}
                                        <span
                                            className={`text-[11px] sm:text-xs leading-none font-medium mb-1 ${
                                                celda.esMesActual
                                                    ? "text-gray-700"
                                                    : "text-gray-300"
                                            } ${
                                                esHoy
                                                    ? "font-bold text-white bg-lm-cyan w-5 h-5 rounded-full flex items-center justify-center -ml-0.5 -mt-0.5 shadow-xs"
                                                    : ""
                                            }`}
                                        >
                                            {celda.dia}
                                        </span>

                                        {/* Event badges with visible titles on date cell */}
                                        <div className="flex flex-col gap-0.5 sm:gap-1 mt-auto w-full">
                                            {eventosEnDia.map((ev, evIdx) => {
                                                const isCurrent =
                                                    eventoMostrado &&
                                                    eventoMostrado.titulo ===
                                                        ev.titulo &&
                                                    eventoMostrado.fecha ===
                                                        ev.fecha;
                                                const color =
                                                    ev.colorTema || "#2C8E9E";

                                                return (
                                                    <button
                                                        key={evIdx}
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEventoSeleccionado(
                                                                ev
                                                            );
                                                        }}
                                                        title={`${ev.titulo} (${
                                                            ev.ciudad || ""
                                                        }) - ${ev.hora || ""}`}
                                                        className={`w-full text-left rounded px-1 sm:px-1.5 py-0.5 transition-all cursor-pointer shadow-2xs block ${
                                                            isCurrent
                                                                ? "ring-2 ring-lm-navy scale-[1.02] brightness-105"
                                                                : "hover:brightness-95 hover:scale-[1.01]"
                                                        }`}
                                                        style={{
                                                            backgroundColor:
                                                                color,
                                                        }}
                                                    >
                                                        <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-white truncate leading-tight">
                                                            {ev.titulo}
                                                        </p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ====== RIGHT: Event Detail Breakdown ====== */}
                    <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 sm:p-7">
                        {eventoMostrado ? (
                            <>
                                {/* Top status & date header */}
                                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                    {eventoSeleccionado &&
                                    eventoProximo &&
                                    eventoSeleccionado.titulo !==
                                        eventoProximo.titulo ? (
                                        <button
                                            onClick={() =>
                                                setEventoSeleccionado(null)
                                            }
                                            className="text-xs text-lm-cyan hover:text-lm-navy transition-colors font-medium cursor-pointer underline flex items-center gap-1"
                                        >
                                            ← Ver evento más próximo
                                        </button>
                                    ) : (
                                        <span className="text-xs font-semibold uppercase tracking-wider text-lm-olive">
                                            Próxima Actividad Destacada
                                        </span>
                                    )}

                                    {/* Date badge */}
                                    <span
                                        className={`text-white text-xs sm:text-sm px-4 sm:px-6 py-1.5 rounded-l-full font-medium shadow-xs ${
                                            !eventoSeleccionado ||
                                            eventoSeleccionado.titulo ===
                                                eventoProximo?.titulo
                                                ? "bg-lm-navy"
                                                : "bg-lm-olive"
                                        }`}
                                    >
                                        {formatearFecha(eventoMostrado.fecha)}
                                    </span>
                                </div>

                                {/* Event image with arched title overlay */}
                                <div className="relative w-full h-[190px] sm:h-[220px] md:h-[250px] rounded-2xl overflow-hidden mb-4 shadow-sm bg-gray-200">
                                    {eventoMostrado.imagen ? (
                                        <img
                                            src={eventoMostrado.imagen}
                                            alt={eventoMostrado.titulo}
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImagePlaceholder className="w-full h-full rounded-2xl" />
                                    )}
                                    {/* Title overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-lm-cyan/95 py-3 px-4 sm:px-6">
                                        <h3 className="text-white text-base sm:text-lg md:text-xl italic font-semibold text-center leading-snug">
                                            {eventoMostrado.titulo}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-5">
                                    {eventoMostrado.descripcion}
                                </p>

                                {/* Location, Sede & Time */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#F1FFFF] rounded-xl border border-[#0DADD4]/20 mb-5">
                                    {/* Location / Sede */}
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-800">
                                        <MapPin className="w-5 h-5 text-lm-olive shrink-0" />
                                        <span>
                                            {eventoMostrado.ciudad ? (
                                                <strong className="font-semibold text-lm-navy">
                                                    {eventoMostrado.ciudad}:{" "}
                                                </strong>
                                            ) : null}
                                            {eventoMostrado.lugar ||
                                                "Sede Institucional"}
                                        </span>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-800 shrink-0">
                                        <Clock className="w-5 h-5 text-lm-navy shrink-0" />
                                        <span className="font-medium">
                                            {eventoMostrado.hora ||
                                                "09:00 - 12:00"}
                                        </span>
                                    </div>
                                </div>

                                {/* Audience / Classification Tags */}
                                {chips.length > 0 && (
                                    <div className="mt-auto pt-2 border-t border-gray-100">
                                        <h4 className="text-lm-navy font-semibold text-xs sm:text-sm italic mb-3 text-center">
                                            ¿A quiénes va dirigido? /
                                            Clasificación
                                        </h4>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {chips.map((chip, idx) => (
                                                <span
                                                    key={idx}
                                                    className="border border-[#859430] bg-[#859430]/10 text-[#407178] rounded-full px-3.5 py-1 text-xs font-medium shadow-2xs"
                                                >
                                                    {chip}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400 italic py-16">
                                No hay eventos registrados actualmente.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
