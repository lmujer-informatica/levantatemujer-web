import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import SalidaSegura from "./components/shared/SalidaSegura";

import Inicio from "./pages/inicio/Inicio";
import QuienesSomos from "./pages/quienesSomos/quienesSomos";
import LineaAyuda from "./pages/lineaAyuda/lineaAyuda";
import ProgramaI from "./pages/programaI/ProgramaI";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col font-sans bg-lm-bg">
                <Navbar />

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
                </Routes>

                <Footer />
                <SalidaSegura />
            </div>
        </BrowserRouter>
    );
}

export default App;
