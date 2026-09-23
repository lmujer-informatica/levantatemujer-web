import React, { useRef, useState, useEffect } from "react";
import inicioData from "../../../data/inicio.json";
import ContadorOdometer from "./ContadorOdometer";
import Personas_capacitadas from "../../../imagenes/Inicio/Personas_capacitadas.png";
import Personas_atendidas from "../../../imagenes/Inicio/Personas_atendidas.png";
import Personas_sensibilizadas from "../../../imagenes/Inicio/Personas_sensibilizadas.png";
import Persona_y_organizaciones_voluntarias from "../../../imagenes/Inicio/Persona_ y_organizaciones_voluntarias.png";
import Centros from "../../../imagenes/Inicio/Centros.png";

export default function NuestrosAlcances() {
    const data = inicioData.estadisticas || [];
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        if (!("IntersectionObserver" in window)) {
            setInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect(); // Solo se dispara una vez al entrar en el viewport
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px",
            },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-[#EAF7FA]">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <h2 className="section-title section-title-navy text-3xl md:text-4xl text-center mb-16">
                    NUESTROS ALCANCES
                </h2>

                {/* Fila superior: 3 elementos en Cyan */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full mb-16">
                    {data.slice(0, 3).map((est, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="w-24 h-24 bg-lm-cyan text-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                {idx === 0 && (
                                    <img
                                        src={Personas_capacitadas}
                                        alt="Personas Capacitadas"
                                        className="w-12 h-12 object-contain"
                                    />
                                )}
                                {idx === 1 && (
                                    <img
                                        src={Personas_atendidas}
                                        alt="Personas Atendidas"
                                        className="w-12 h-12 object-contain"
                                    />
                                )}
                                {idx === 2 && (
                                    <img
                                        src={Personas_sensibilizadas}
                                        alt="Personas Sensibilizadas"
                                        className="w-12 h-12 object-contain"
                                    />
                                )}
                            </div>
                            <h3 className="text-[2.5rem] font-light text-lm-cyan mb-1 tracking-tight leading-none min-h-[40px] flex items-center justify-center">
                                <ContadorOdometer
                                    valor={est.valor}
                                    start={inView}
                                    duration={2000}
                                />
                            </h3>
                            <p className="text-lm-cyan font-medium text-lg leading-tight px-4">
                                {est.etiqueta}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Fila inferior: 2 elementos en Verde Oliva */}
                <div className="flex flex-col sm:flex-row justify-center gap-16 w-full max-w-2xl mx-auto">
                    {data.slice(3, 5).map((est, idx) => (
                        <div
                            key={idx + 3}
                            className="flex flex-col items-center text-center w-full sm:w-1/2"
                        >
                            <div className="w-24 h-24 bg-lm-olive text-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                {idx === 0 ? (
                                    <img
                                        src={
                                            Persona_y_organizaciones_voluntarias
                                        }
                                        alt="Voluntarias"
                                        className="w-12 h-12 object-contain"
                                    />
                                ) : (
                                    <img
                                        src={Centros}
                                        alt="Centros"
                                        className="w-12 h-12 object-contain"
                                    />
                                )}
                            </div>
                            <h3 className="text-[2.5rem] font-light text-lm-olive mb-1 tracking-tight leading-none min-h-[40px] flex items-center justify-center">
                                <ContadorOdometer
                                    valor={
                                        idx === 0 && !est.valor.startsWith("+")
                                            ? `+${est.valor}`
                                            : est.valor
                                    }
                                    start={inView}
                                    duration={2000}
                                />
                            </h3>
                            <p className="text-lm-olive font-medium text-lg leading-tight px-4">
                                {est.etiqueta}
                            </p>
                        </div>
                    ))}

                    {/* Si falta el elemento 5 en el JSON de prueba, lo mostramos para match de diseño */}
                    {data.length < 5 && (
                        <div className="flex flex-col items-center text-center w-full sm:w-1/2">
                            <div className="w-24 h-24 bg-lm-olive text-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <svg
                                    className="w-12 h-12"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z" />
                                </svg>
                            </div>
                            <h3 className="text-[2.5rem] font-light text-lm-olive mb-1 tracking-tight leading-none min-h-[40px] flex items-center justify-center">
                                <ContadorOdometer
                                    valor="6"
                                    start={inView}
                                    duration={1500}
                                />
                            </h3>
                            <p className="text-lm-olive font-medium text-lg leading-tight px-4">
                                Centros en Bolivia
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
