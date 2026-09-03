import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink } from "react-router";
import logo from "../../imagenes/logo.png";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [programasOpen, setProgramasOpen] = useState(false);
    const [actividadOpen, setActividadOpen] = useState(false);
    const programasRef = useRef(null);
    const actividadRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (programasRef.current && !programasRef.current.contains(event.target)) {
                setProgramasOpen(false);
            }
            if (actividadRef.current && !actividadRef.current.contains(event.target)) {
                setActividadOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavigation = () => {
        setIsOpen(false);
        setProgramasOpen(false);
        setActividadOpen(false);
    };

    return (
        // Se cambia bg-white por un color celeste muy claro que asemeja el de la imagen.
        // Puedes ajustar el hex color según la paleta exacta de tu proyecto.
        <header className="bg-[#EAF7FA] sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[90px]">
                {/* h-full añadido aquí para que ocupe los 90px enteros */}
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center">
                        <NavLink
                            to="/"
                            onClick={handleNavigation}
                            className="flex items-center gap-2"
                        >
                            <img
                                src={logo}
                                alt="Fundación Levántate Mujer"
                                className="h-12 object-contain"
                            />
                        </NavLink>
                    </div>

                    {/* Desktop Menu - Usamos items-stretch para que los enlaces tomen el 100% del alto */}
                    <nav className="hidden md:flex items-stretch h-full space-x-6 lg:space-x-8">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `flex items-center justify-center px-8 text-sm font-medium transition-all duration-300 ${
                                    isActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl shadow-md" // Gradiente y redondeo inferior
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`
                            }
                        >
                            Inicio
                        </NavLink>

                        <NavLink
                            to="/quienesSomos"
                            className={({ isActive }) =>
                                `flex items-center justify-center text-center leading-tight text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl px-6 shadow-md"
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`
                            }
                        >
                            Quienes
                            <br />
                            Somos
                        </NavLink>

                        <div
                            className="relative flex items-center"
                            ref={programasRef}
                        >
                            <button
                                onClick={() => setProgramasOpen(!programasOpen)}
                                className="flex items-center justify-center gap-1 text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors h-full"
                            >
                                Programas
                                <ChevronDown
                                    className={`w-4 h-4 fill-current transition-transform ${programasOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {programasOpen && (
                                <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 rounded-b-xl shadow-lg py-2 z-50 flex flex-col">
                                    <NavLink
                                        to="/programaI"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `px-4 py-2 text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-cyan text-white"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Programa I
                                    </NavLink>
                                    <NavLink
                                        to="/programaII"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `px-4 py-2 text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-cyan text-white"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Programa II
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="relative flex items-center" ref={actividadRef}>
                            <button
                                onClick={() => setActividadOpen(!actividadOpen)}
                                className="flex items-center justify-center gap-1 text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors h-full"
                            >
                                Actividad
                                <ChevronDown
                                    className={`w-4 h-4 fill-current transition-transform ${actividadOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {actividadOpen && (
                                <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 rounded-b-xl shadow-lg py-2 z-50 flex flex-col">
                                    <NavLink
                                        to="/noticias"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `px-4 py-2 text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-cyan text-white"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Noticias
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <NavLink
                            to="/contacto"
                            className={({ isActive }) =>
                                `flex items-center justify-center text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl px-6 shadow-md"
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`
                            }
                        >
                            Contacto
                        </NavLink>

                        <NavLink
                            to="/lineaAyuda"
                            className={({ isActive }) =>
                                `flex items-center justify-center text-center leading-tight text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl px-6 shadow-md"
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`
                            }
                        >
                            Línea de
                            <br />
                            Ayuda
                        </NavLink>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-lm-cyan hover:text-lm-navy focus:outline-hidden"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Queda prácticamente igual, adaptado a tu lógica) */}
            {isOpen && (
                <div className="md:hidden bg-[#f0fbfb] border-t border-gray-200">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <NavLink
                            to="/"
                            end
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive
                                        ? "bg-lm-cyan text-white"
                                        : "text-lm-cyan"
                                }`
                            }
                        >
                            Inicio
                        </NavLink>

                        <NavLink
                            to="/quienesSomos"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive
                                        ? "bg-lm-cyan text-white"
                                        : "text-lm-cyan"
                                }`
                            }
                        >
                            Quienes Somos
                        </NavLink>

                        <div className="space-y-1">
                            <button
                                onClick={() => setProgramasOpen(!programasOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-lm-cyan"
                            >
                                Programas
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${programasOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {programasOpen && (
                                <div className="pl-6 space-y-1">
                                    <NavLink
                                        to="/programaI"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `block px-3 py-2 rounded-md text-base font-medium ${
                                                isActive
                                                    ? "bg-lm-cyan text-white"
                                                    : "text-lm-cyan hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        Programa I
                                    </NavLink>
                                    <NavLink
                                        to="/programaII"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `block px-3 py-2 rounded-md text-base font-medium ${
                                                isActive
                                                    ? "bg-lm-cyan text-white"
                                                    : "text-lm-cyan hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        Programa II
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <button
                                onClick={() => setActividadOpen(!actividadOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-lm-cyan"
                            >
                                Actividad
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${actividadOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {actividadOpen && (
                                <div className="pl-6 space-y-1">
                                    <NavLink
                                        to="/noticias"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `block px-3 py-2 rounded-md text-base font-medium ${
                                                isActive
                                                    ? "bg-lm-cyan text-white"
                                                    : "text-lm-cyan hover:bg-gray-50"
                                            }`
                                        }
                                    >
                                        Noticias
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <NavLink
                            to="/contacto"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive
                                        ? "bg-lm-cyan text-white"
                                        : "text-lm-cyan"
                                }`
                            }
                        >
                            Contacto
                        </NavLink>

                        <NavLink
                            to="/lineaAyuda"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive
                                        ? "bg-lm-cyan text-white"
                                        : "text-lm-cyan"
                                }`
                            }
                        >
                            Línea de Ayuda
                        </NavLink>
                    </div>
                </div>
            )}
        </header>
    );
}
