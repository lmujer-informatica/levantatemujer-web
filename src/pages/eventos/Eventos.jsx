import React from "react";
import BannerEventos from "./components/BannerEventos";
import CalendarioEventos from "./components/CalendarioEventos";
import EventosGrid from "./components/EventosGrid";

export default function Eventos() {
    return (
        <main className="grow flex flex-col gap-0">
            <BannerEventos />
            <CalendarioEventos />
            <EventosGrid />
        </main>
    );
}
