import React, { useEffect } from "react";
import { useLocation } from "react-router";
import BannerPrograma from "./components/BannerPrograma";
import DescripcionPrograma from "./components/DescripcionPrograma";
import ActividadesPrograma from "./components/ActividadesPrograma";
import TestimoniosPrograma from "./components/TestimoniosPrograma";
import MetodologiasPrograma from "./components/MetodologiasPrograma";
import InvestigacionesPrograma from "./components/InvestigacionesPrograma";
import DonacionPrograma from "./components/DonacionPrograma";
import programaIData from "../../data/programaI.json";

export default function ProgramaI() {
    const { hash } = useLocation();

    // Al llegar con #ancla (ej. /programaI#testimonios) baja a esa sección
    useEffect(() => {
        if (!hash) return;
        const temporizador = setTimeout(() => {
            document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(temporizador);
    }, [hash]);

    return (
        <main className="grow flex flex-col gap-0">
            <BannerPrograma />
            <DescripcionPrograma />
            <ActividadesPrograma />
            <TestimoniosPrograma />
            <MetodologiasPrograma />
            <InvestigacionesPrograma />
            <DonacionPrograma data={programaIData.donacion} />
        </main>
    );
}
