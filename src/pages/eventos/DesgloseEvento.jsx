import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { MapPin, Clock } from "lucide-react";
import { buscarEventoPorSlug, formatearFecha } from "../../lib/eventos";

// Mismo marco con sombra desplazada que usa DesgloseNoticia; sin imagen muestra un placeholder.
function MarcoImagen({ src, alt }) {
    const medidas = "w-44 h-44 md:w-72 md:h-72";
    return (
        <div className="relative shrink-0">
            <div
                className={`absolute inset-0 translate-x-1.5 translate-y-1.5 md:translate-x-2.5 md:translate-y-2.5 rounded-[20px] border-[0.7px] bg-[#E3FFF8] ${medidas}`}
                style={{ borderColor: "#356194" }}
                aria-hidden="true"
            />
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className={`relative rounded-[20px] object-cover ${medidas}`}
                />
            ) : (
                <div
                    className={`relative rounded-[20px] bg-gray-400 flex items-center justify-center ${medidas}`}
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
            )}
        </div>
    );
}

export default function DesgloseEvento() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const evento = buscarEventoPorSlug(slug);

    // Las noticias no hacen scroll al abrirse; aquí sí, para no aterrizar a mitad de página.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Si se entró directo por el enlace no hay historial al que volver: se va a /eventos.
    const volver = () => {
        if (window.history.state?.idx > 0) navigate(-1);
        else navigate("/eventos");
    };

    if (!evento) {
        return (
            <main className="flex flex-col grow items-center justify-center gap-4 bg-[#EFFFFB] px-4 py-16 text-center">
                <h2
                    className="font-montserrat italic font-medium text-xl md:text-2xl"
                    style={{ color: "#356194" }}
                >
                    Evento no encontrado
                </h2>
                <Link
                    to="/eventos"
                    className="rounded-full bg-[#F1FFFF] px-8 py-2 font-poppins text-sm shadow-[4px_4px_4px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
                    style={{ color: "#2B8EA6" }}
                >
                    Ver eventos
                </Link>
            </main>
        );
    }

    const color = evento.colorTema || "#356194";
    const dirigidoA = evento.dirigidoA ?? [];
    const hayDatos = evento.ciudad || evento.lugar || evento.hora;

    return (
        <main className="page-fade-in flex flex-col grow gap-0">
            <div className="w-full py-3 md:py-5" style={{ backgroundColor: color }}>
                <h1 className="px-4 text-center font-montserrat italic font-medium text-xl md:text-3xl text-[#F1FFFF]">
                    {evento.titulo}
                </h1>
            </div>

            <div className="w-full bg-[#EFFFFB] px-4 py-6 md:py-10">
                <div className="relative mx-auto max-w-4xl">
                    <span
                        className="absolute left-0 top-4 md:top-6 z-10 rounded-r-[10px] px-3 md:px-4 py-1 font-poppins text-[10px] md:text-sm text-[#F1FFFF]"
                        style={{ backgroundColor: "#BACB5E" }}
                    >
                        {formatearFecha(evento.fecha)}
                    </span>
                    <div className="flex justify-center pb-5 md:pb-7">
                        <MarcoImagen src={evento.imagen} alt={evento.titulo} />
                    </div>

                    {hayDatos && (
                        <div
                            className="mt-2 md:mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-poppins text-xs md:text-sm"
                            style={{ color: "#356194" }}
                        >
                            {evento.ciudad && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    {evento.ciudad}
                                </span>
                            )}
                            {evento.lugar && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    {evento.lugar}
                                </span>
                            )}
                            {evento.hora && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 shrink-0" />
                                    {evento.hora}
                                </span>
                            )}
                        </div>
                    )}

                    {dirigidoA.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            <span
                                className="font-poppins text-xs md:text-sm font-medium"
                                style={{ color: "#356194" }}
                            >
                                Dirigido a:
                            </span>
                            {dirigidoA.map((etiqueta) => (
                                <span
                                    key={etiqueta}
                                    className="rounded-full border bg-[#F1FFFF] px-3 py-1 font-poppins text-[10px] md:text-xs"
                                    style={{ borderColor: color, color }}
                                >
                                    {etiqueta}
                                </span>
                            ))}
                        </div>
                    )}

                    {evento.descripcion && (
                        <p
                            className="mt-5 md:mt-8 text-justify font-poppins text-xs md:text-sm leading-relaxed whitespace-pre-line"
                            style={{ color: "#356194" }}
                        >
                            {evento.descripcion}
                        </p>
                    )}
                </div>
            </div>

            <div className="w-full py-3 md:py-4" style={{ backgroundColor: "#0DADD4" }}>
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={volver}
                        className="rounded-[30px] bg-[#F1FFFF] px-10 md:px-14 py-1.5 md:py-2 font-poppins text-sm md:text-lg shadow-[4px_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105 active:scale-95"
                        style={{ color: "#2B8EA6" }}
                    >
                        Volver
                    </button>
                </div>
            </div>
        </main>
    );
}
