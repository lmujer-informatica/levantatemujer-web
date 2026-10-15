import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import SalidaSegura from "./components/shared/SalidaSegura";

import Inicio from './pages/inicio/Inicio';
import QuienesSomos from './pages/quienesSomos/quienesSomos';
import LineaAyuda from './pages/lineaAyuda/lineaAyuda';
import ProgramaII from './pages/programa/ProgramaII';
import Material from './pages/material/Material';
import NoticiasII from './pages/noticias/NoticiasII';
import DesgloseNoticia from './pages/noticia/DesgloseNoticia';
import ProgramaI from "./pages/programaI/ProgramaI";
import Noticias from "./pages/actividad/noticias/Noticias";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col font-sans bg-lm-bg">
                <Navbar />
                    <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/quienesSomos" element={<QuienesSomos/>} />
                    <Route path="/lineaAyuda" element={<LineaAyuda />} />
                    <Route path="/programaI" element={<ProgramaI />} />
                    <Route path="/programaII" element={<ProgramaII />} />
                    <Route path="/material" element={<Material />} />
                    <Route path="/noticias" element={<Noticias />} />
                    <Route path="/noticiasII" element={<NoticiasII />} />
                    <Route path="/noticia/:id" element={<DesgloseNoticia />} />
                    </Routes>
                <Footer />
                <SalidaSegura />
            </div>
        </BrowserRouter>
    );
}

export default App;
