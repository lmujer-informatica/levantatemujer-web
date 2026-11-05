import React from "react";
import BannerContacto from "./components/BannerContacto";
import LineaAyudaBarra from "./components/LineaAyudaBarra";
import NuestrasSedes from "./components/NuestrasSedes";

export default function Contacto() {
    return (
        <main className="grow flex flex-col gap-0">
            <BannerContacto />
            <LineaAyudaBarra />
            <NuestrasSedes />
        </main>
    );
}
