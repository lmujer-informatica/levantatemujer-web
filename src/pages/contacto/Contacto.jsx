import React from "react";
import BannerContacto from "./components/BannerContacto";
import LineaAyudaBarra from "./components/LineaAyudaBarra";
import ContactoGeneral from "./components/ContactoGeneral";
import PostulacionProfesionales from "./components/PostulacionProfesionales";
import NuestrasSedes from "./components/NuestrasSedes";

export default function Contacto() {
    return (
        <main className="grow flex flex-col gap-0">
            <BannerContacto />
            <LineaAyudaBarra />
            <ContactoGeneral />
            <PostulacionProfesionales />
            <NuestrasSedes />
        </main>
    );
}
