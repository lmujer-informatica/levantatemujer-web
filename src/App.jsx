import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import SalidaSegura from "./components/shared/SalidaSegura";

// Páginas no solicitadas se mantienen estáticas
import QuienesSomos from "./pages/quienesSomos/quienesSomos";
import LineaAyuda from "./pages/lineaAyuda/lineaAyuda";

// Lazy loading de las páginas solicitadas para optimizar la carga inicial y eliminar el lag
const Inicio = lazy(() => import("./pages/inicio/Inicio"));
const ProgramaI = lazy(() => import("./pages/programaI/ProgramaI"));
const Noticias = lazy(() => import("./pages/actividad/noticias/Noticias"));
const Eventos = lazy(() => import("./pages/eventos/Eventos"));
const Contacto = lazy(() => import("./pages/contacto/Contacto"));

/**
 * Componente de fallback con spinner suave durante la transición de carga diferida
 */
function PageFallback() {
    return (
        <div className="grow min-h-[60vh] flex flex-col items-center justify-center p-8 bg-lm-bg">
            <div className="w-12 h-12 border-4 border-lm-cyan/30 border-t-lm-cyan rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-lm-navy/80 tracking-wide animate-pulse">
                Cargando contenido...
            </p>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col font-sans bg-lm-bg">
                <Navbar />

                <Suspense fallback={<PageFallback />}>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/quienesSomos" element={<QuienesSomos />} />
                        <Route path="/lineaAyuda" element={<LineaAyuda />} />
                        <Route path="/programaI" element={<ProgramaI />} />
                        <Route
                            path="/programaII"
                            element={
                                <div className="grow p-8 text-center text-xl text-lm-navy">
                                    Próximamente: Programa II
                                </div>
                            }
                        />
                        <Route path="/noticias" element={<Noticias />} />
                        <Route path="/eventos" element={<Eventos />} />
                        <Route path="/contacto" element={<Contacto />} />
                    </Routes>
                </Suspense>

                <Footer />
                <SalidaSegura />
            </div>
        </BrowserRouter>
    );
}

export default App;
