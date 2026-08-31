import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router';
import logo from '../../imagenes/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = () => {
    setIsOpen(false);
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
              <img src={logo} alt="Fundación Levántate Mujer" className="h-12 object-contain" />
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
                    ? 'bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl shadow-md' // Gradiente y redondeo inferior
                    : 'text-lm-cyan hover:text-lm-navy'
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
                    ? 'bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl px-6 shadow-md'
                    : 'text-lm-cyan hover:text-lm-navy'
                }`
              }
            >
              Quienes<br />Somos
            </NavLink>

            <button className="flex items-center justify-center gap-1 text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors">
              Programas
              <ChevronDown className="w-4 h-4 fill-current" />
            </button>

            <button className="flex items-center justify-center gap-1 text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors">
              Actividad
              <ChevronDown className="w-4 h-4 fill-current" />
            </button>

            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `flex items-center justify-center text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl px-6 shadow-md'
                    : 'text-lm-cyan hover:text-lm-navy'
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
                    ? 'bg-linear-to-b from-[#00b4d8] to-[#0077b6] text-white rounded-b-4xl px-6 shadow-md'
                    : 'text-lm-cyan hover:text-lm-navy'
                }`
              }
            >
              Línea de<br />Ayuda
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
                    ? 'bg-lm-cyan text-white'
                    : 'text-lm-cyan'
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
                    ? 'bg-lm-cyan text-white'
                    : 'text-lm-cyan'
                }`
              }
            >
              Quienes Somos
            </NavLink>

            <NavLink
              to="/programas"
              onClick={handleNavigation}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-lm-cyan text-white'
                    : 'text-lm-cyan'
                }`
              }
            >
              Programas
            </NavLink>

            <NavLink
              to="/actividad"
              onClick={handleNavigation}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-lm-cyan text-white'
                    : 'text-lm-cyan'
                }`
              }
            >
              Actividad
            </NavLink>

            <NavLink
              to="/contacto"
              onClick={handleNavigation}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-lm-cyan text-white'
                    : 'text-lm-cyan'
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
                    ? 'bg-lm-cyan text-white'
                    : 'text-lm-cyan'
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