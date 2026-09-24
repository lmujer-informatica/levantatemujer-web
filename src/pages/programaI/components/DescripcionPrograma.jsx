import React from "react";
import serviciosIcon from "../../../imagenes/programaI/servicios.png";
import testimoniosIcon from "../../../imagenes/programaI/testimonios.png";

export default function DescripcionPrograma() {
    const handleTestimoniosClick = () => {
        const el = document.getElementById("testimonios");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleServiciosClick = () => {
        const el = document.getElementById("actividades");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="w-full bg-[#F1FFFF] py-10 md:py-16 overflow-hidden">
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 lg:gap-10">
                {/* Columna Izquierda: Descripción del Programa */}
                <div className="w-full lg:flex-1 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-[max(2.5rem,calc((100vw-1280px)/2+2rem))] pr-4 sm:pr-6 lg:pr-8 flex flex-col justify-center">
                    {/* Título con línea inferior */}
                    <div className="flex flex-col items-center sm:items-start mb-6">
                        <h2 className="text-[#00A8CC] font-semibold text-2xl sm:text-3xl italic tracking-wide">
                            El Programa
                        </h2>
                        <div className="w-44 h-0.5 bg-[#00A8CC] mt-1.5" />
                    </div>

                    {/* Texto del programa */}
                    <div className="flex flex-col gap-4 text-gray-700 text-sm sm:text-base leading-relaxed text-justify sm:text-left">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipiscing
                            elit congue, dictum per commodo nostra aliquet
                            quisque etiam luctus, velit cum mauris mi fusce
                            bibendum euismod. Nibh libero fermentum donec duis
                            risus maecenas, scelerisque cubilia hac hendrerit
                            quisque torquent, vel netus ultricies fames egestas.
                            Himenaeos rutrum placerat morbi conubia potenti mus
                            nulla habitant turpis, est netus gravida natoque
                            metus dignissim congue laoreet.
                        </p>
                        <p>
                            Scelerisque parturient hendrerit per habitasse
                            integer litora nisi, luctus pulvinar himenaeos
                            euismod purus condimentum nullam arcu, vehicula
                            imperdiet quis tristique.
                        </p>
                    </div>
                </div>

                {/* Columna Derecha: Contenedor curvado pegado al borde derecho de la página */}
                <div className="w-full lg:w-[440px] xl:w-[500px] 2xl:w-[540px] shrink-0 flex justify-end">
                    <div className="w-full bg-[#1B7B94] rounded-l-[80px] sm:rounded-l-[110px] lg:rounded-l-[140px] rounded-r-none py-8 sm:py-10 pl-6 sm:pl-8 lg:pl-12 pr-0 flex flex-col items-end justify-center gap-6 shadow-[-10px_6px_25px_rgba(0,0,0,0.08)]">
                        {/* Botón Servicios (ligeramente más corto horizontalmente) */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={handleServiciosClick}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleServiciosClick()
                            }
                            className="w-[86%] sm:w-[88%] bg-white rounded-l-full rounded-r-none p-2 sm:p-2.5 pl-3 sm:pl-4 pr-6 sm:pr-8 flex items-center gap-3 sm:gap-5 shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 cursor-pointer select-none"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A2C738] flex items-center justify-center p-3 sm:p-3.5 shrink-0 shadow-xs">
                                <img
                                    src={serviciosIcon}
                                    alt="Servicios"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="flex-1 text-center font-medium text-2xl sm:text-3xl text-[#A2C738] tracking-wide">
                                Servicios
                            </span>
                        </div>

                        {/* Botón Testimonios (ligeramente más largo, más cerca del centro) */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={handleTestimoniosClick}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleTestimoniosClick()
                            }
                            className="w-full bg-white rounded-l-full rounded-r-none p-2 sm:p-2.5 pl-3 sm:pl-4 pr-6 sm:pr-8 flex items-center gap-3 sm:gap-5 shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 cursor-pointer select-none"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00A8CC] flex items-center justify-center p-3 sm:p-3.5 shrink-0 shadow-xs">
                                <img
                                    src={testimoniosIcon}
                                    alt="Testimonios"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="flex-1 text-center font-medium text-2xl sm:text-3xl text-[#00A8CC] tracking-wide">
                                Testimonios
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
