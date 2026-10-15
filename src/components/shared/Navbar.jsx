import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import logo from "../../imagenes/logo.png";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [programasOpen, setProgramasOpen] = useState(false);
    const [actividadOpen, setActividadOpen] = useState(false);
    const [mobileProgramasOpen, setMobileProgramasOpen] = useState(false);
    const [mobileActividadOpen, setMobileActividadOpen] = useState(false);

    const programasRef = useRef(null);
    const actividadRef = useRef(null);
    const location = useLocation();

    const isProgramasActive = location.pathname.startsWith("/programa");
    const isActividadActive =
        location.pathname === "/noticias" || location.pathname === "/eventos";

    // Auto expand mobile accordion when navigating to a child page
    useEffect(() => {
        if (isProgramasActive) setMobileProgramasOpen(true);
        if (isActividadActive) setMobileActividadOpen(true);
    }, [location.pathname, isProgramasActive, isActividadActive]);

    // Close desktop dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                programasRef.current &&
                !programasRef.current.contains(event.target)
            ) {
                setProgramasOpen(false);
            }
            if (
                actividadRef.current &&
                !actividadRef.current.contains(event.target)
            ) {
                setActividadOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavigation = () => {
        setIsOpen(false);
        setProgramasOpen(false);
        setActividadOpen(false);
    };

    return (
        <header className="bg-[#EAF7FA] sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[90px]">
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

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-stretch h-full space-x-4 lg:space-x-6 xl:space-x-8">
                        {/* Inicio */}
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `flex items-center justify-center px-6 lg:px-8 text-sm font-medium transition-all duration-300 ${
                                    isActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl shadow-md"
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`
                            }
                        >
                            Inicio
                        </NavLink>

                        {/* Quienes Somos */}
                        <NavLink
                            to="/quienesSomos"
                            className={({ isActive }) =>
                                `flex items-center justify-center text-center leading-tight text-sm font-medium px-5 lg:px-6 transition-all duration-300 ${
                                    isActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl shadow-md"
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`
                            }
                        >
                            Quienes
                            <br />
                            Somos
                        </NavLink>

                        {/* Programas (Dropdown en Desktop) */}
                        <div
                            className="relative flex items-stretch h-full"
                            ref={programasRef}
                        >
                            <button
                                type="button"
                                onClick={() => setProgramasOpen(!programasOpen)}
                                className={`flex items-center justify-center gap-1.5 px-5 lg:px-6 text-sm font-medium transition-all duration-300 h-full cursor-pointer ${
                                    isProgramasActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl shadow-md"
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`}
                            >
                                <span>Programas</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        programasOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {programasOpen && (
                                <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-100 rounded-b-xl shadow-xl py-2 z-50 flex flex-col">
                                    <NavLink
                                        to="/programaI"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `px-4 py-2.5 text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-cyan text-white font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Mujeres Libres de Violencia
                                    </NavLink>
                                    <NavLink
                                        to="/programaII"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `px-4 py-2.5 text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-cyan text-white font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Respuesta a la Trata e Inmigración
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Actividad (Dropdown en Desktop) */}
                        <div
                            className="relative flex items-stretch h-full"
                            ref={actividadRef}
                        >
                            <button
                                type="button"
                                onClick={() => setActividadOpen(!actividadOpen)}
                                className={`flex items-center justify-center gap-1.5 px-5 lg:px-6 text-sm font-medium transition-all duration-300 h-full cursor-pointer ${
                                    isActividadActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl shadow-md"
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`}
                            >
                                <span>Actividad</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        actividadOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {actividadOpen && (
                                <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 rounded-b-xl shadow-xl py-2 z-50 flex flex-col">
                                    <NavLink
                                        to="/noticias"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `px-4 py-2.5 text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-cyan text-white font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Noticias
                                    </NavLink>
                                    <NavLink
                                        to="/eventos"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `px-4 py-2.5 text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-cyan text-white font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Eventos
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Contacto */}
                        <NavLink
                            to="/contacto"
                            className={({ isActive }) =>
                                `flex items-center justify-center px-5 lg:px-6 text-sm font-medium transition-all duration-300 ${
                                    isActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl shadow-md"
                                        : "text-lm-cyan hover:text-lm-navy"
                                }`
                            }
                        >
                            Contacto
                        </NavLink>

                        {/* Línea de Ayuda */}
                        <NavLink
                            to="/lineaAyuda"
                            className={({ isActive }) =>
                                `flex items-center justify-center text-center leading-tight text-sm font-medium px-5 lg:px-6 transition-all duration-300 ${
                                    isActive
                                        ? "bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl shadow-md"
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
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-lm-cyan hover:text-lm-navy focus:outline-hidden p-2 rounded-lg cursor-pointer"
                            aria-label="Abrir menú"
                        >
                            {isOpen ? (
                                <X className="h-7 w-7" />
                            ) : (
                                <Menu className="h-7 w-7" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#f0fbfb] border-t border-gray-200 shadow-lg">
                    <div className="px-4 pt-3 pb-5 space-y-2">
                        {/* Inicio */}
                        <NavLink
                            to="/"
                            end
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                                    isActive
                                        ? "bg-lm-cyan text-white shadow-xs font-semibold"
                                        : "text-lm-cyan hover:bg-white"
                                }`
                            }
                        >
                            Inicio
                        </NavLink>

                        {/* Quienes Somos */}
                        <NavLink
                            to="/quienesSomos"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                                    isActive
                                        ? "bg-lm-cyan text-white shadow-xs font-semibold"
                                        : "text-lm-cyan hover:bg-white"
                                }`
                            }
                        >
                            Quienes Somos
                        </NavLink>

                        {/* Programas (Dropdown en móvil) */}
                        <div className="space-y-1">
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileProgramasOpen((prev) => !prev)
                                }
                                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                                    isProgramasActive
                                        ? "bg-lm-cyan text-white shadow-xs font-semibold"
                                        : "text-lm-cyan hover:bg-white"
                                }`}
                            >
                                <span>Programas</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        mobileProgramasOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {mobileProgramasOpen && (
                                <div className="pl-3 pr-1 py-1.5 space-y-1 bg-white/70 rounded-lg border border-cyan-100 my-1">
                                    <NavLink
                                        to="/programaI"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `block px-4 py-2.5 rounded-md text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-navy text-white font-semibold shadow-xs"
                                                    : "text-gray-700 hover:bg-cyan-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Mujeres Libres de Violencia
                                    </NavLink>
                                    <NavLink
                                        to="/programaII"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `block px-4 py-2.5 rounded-md text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-navy text-white font-semibold shadow-xs"
                                                    : "text-gray-700 hover:bg-cyan-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Respuesta a la Trata e Inmigración
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Actividad (Dropdown en móvil) */}
                        <div className="space-y-1">
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileActividadOpen((prev) => !prev)
                                }
                                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                                    isActividadActive
                                        ? "bg-lm-cyan text-white shadow-xs font-semibold"
                                        : "text-lm-cyan hover:bg-white"
                                }`}
                            >
                                <span>Actividad</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        mobileActividadOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {mobileActividadOpen && (
                                <div className="pl-3 pr-1 py-1.5 space-y-1 bg-white/70 rounded-lg border border-cyan-100 my-1">
                                    <NavLink
                                        to="/noticias"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `block px-4 py-2.5 rounded-md text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-navy text-white font-semibold shadow-xs"
                                                    : "text-gray-700 hover:bg-cyan-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Noticias
                                    </NavLink>
                                    <NavLink
                                        to="/eventos"
                                        onClick={handleNavigation}
                                        className={({ isActive }) =>
                                            `block px-4 py-2.5 rounded-md text-sm transition-colors ${
                                                isActive
                                                    ? "bg-lm-navy text-white font-semibold shadow-xs"
                                                    : "text-gray-700 hover:bg-cyan-50 hover:text-lm-cyan"
                                            }`
                                        }
                                    >
                                        Eventos
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Contacto */}
                        <NavLink
                            to="/contacto"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                                    isActive
                                        ? "bg-lm-cyan text-white shadow-xs font-semibold"
                                        : "text-lm-cyan hover:bg-white"
                                }`
                            }
                        >
                            Contacto
                        </NavLink>

                        {/* Línea de Ayuda */}
                        <NavLink
                            to="/lineaAyuda"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                                    isActive
                                        ? "bg-lm-cyan text-white shadow-xs font-semibold"
                                        : "text-lm-cyan hover:bg-white"
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
