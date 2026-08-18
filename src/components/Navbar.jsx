import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[90px]">
          <div className="flex-shrink-0 flex items-center">
            {/* Logo placeholder - using text to simulate the logo structure */}
            <a href="/" className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] text-lm-cyan uppercase tracking-widest leading-none mb-0.5">Fundación</span>
                <span className="font-bold text-xl text-lm-cyan leading-none">Levántate</span>
                <span className="font-bold text-xl text-lm-olive leading-none">Mujer</span>
              </div>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="px-6 py-2 bg-lm-cyan text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
              Inicio
            </a>
            
            <a href="#" className="text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors text-center leading-tight">
              Quienes<br/>Somos
            </a>
            
            <button className="flex items-center gap-1 text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors">
              Programas <ChevronDown className="w-4 h-4" />
            </button>
            
            <button className="flex items-center gap-1 text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors">
              Actividad <ChevronDown className="w-4 h-4" />
            </button>
            
            <a href="#" className="text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors">
              Contacto
            </a>
            
            <a href="#" className="text-sm font-medium text-lm-cyan hover:text-lm-navy transition-colors text-center leading-tight">
              Línea de<br/>Ayuda
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-lm-cyan hover:text-lm-navy focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="/" className="block px-3 py-2 bg-lm-cyan text-white rounded-md text-base font-medium">Inicio</a>
            <a href="#" className="block px-3 py-2 text-lm-cyan text-base font-medium">Quienes Somos</a>
            <a href="#" className="block px-3 py-2 text-lm-cyan text-base font-medium">Programas</a>
            <a href="#" className="block px-3 py-2 text-lm-cyan text-base font-medium">Actividad</a>
            <a href="#" className="block px-3 py-2 text-lm-cyan text-base font-medium">Contacto</a>
            <a href="#" className="block px-3 py-2 text-lm-cyan text-base font-medium">Línea de Ayuda</a>
          </div>
        </div>
      )}
    </header>
  );
}
