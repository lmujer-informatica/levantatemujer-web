import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import contactoData from "../../../data/contacto.json";

// Icono personalizado para Leaflet con SVG
const createPinIcon = (color = "#00A8CC") =>
    L.divIcon({
        className: "custom-map-pin",
        html: `<div style="display: flex; justify-content: center; align-items: center; transform: translate(-50%, -100%); filter: drop-shadow(0 2px 5px rgba(0,0,0,0.35));">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
        <circle cx="12" cy="10" r="3" fill="#ffffff"/>
      </svg>
    </div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
    });

function RedesSociales({ facebook = "#", instagram = "#", tiktok = "#" }) {
    return (
        <div className="flex items-center justify-center gap-4 mt-3">
            {/* Facebook */}
            <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-[#1877F2] rounded-full text-white flex items-center justify-center font-bold text-sm hover:opacity-90 transition-opacity shadow-sm"
                aria-label="Facebook"
            >
                f
            </a>
            {/* Instagram */}
            <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-lg text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity"
                aria-label="Instagram"
            >
                <div className="w-4 h-4 border-2 border-white rounded-[4px] relative flex items-center justify-center">
                    <div className="w-1.5 h-1.5 border border-white rounded-full"></div>
                </div>
            </a>
            {/* TikTok */}
            <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-black rounded-full text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity"
                aria-label="TikTok"
            >
                <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.22-2.19.49-4.46 1.89-6.08 1.48-1.74 3.73-2.73 6-2.71v4.06c-1.37.06-2.61.94-3.23 2.15-.55 1.05-.59 2.33-.07 3.4.52 1.06 1.57 1.78 2.75 1.91 1.25.11 2.56-.37 3.32-1.35.59-.76.92-1.75.92-2.73.02-3.95.01-7.9.01-11.85z" />
                </svg>
            </a>
        </div>
    );
}

function TarjetaInfo({ sede, colorTema, isLeftArch }) {
    const bgColor = colorTema === "cyan" ? "bg-[#00A8CC]" : "bg-[#9BB03E]";
    const archClass = isLeftArch
        ? "lg:rounded-l-full rounded-2xl"
        : "lg:rounded-r-full rounded-2xl";

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div
                className={`${bgColor} ${archClass} text-white w-full py-8 px-6 sm:px-10 shadow-sm flex flex-col justify-center gap-3.5 min-h-[220px]`}
            >
                <div className="flex items-center gap-3 text-sm sm:text-base">
                    <Phone className="w-5 h-5 shrink-0" />
                    <span className="font-light">
                        {sede.telefono || "+591 60000000"}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                    <Mail className="w-5 h-5 shrink-0" />
                    <span className="font-light truncate">
                        {sede.correo || "levantate@gmail.com"}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                    <MapPin className="w-5 h-5 shrink-0" />
                    <span className="font-light">
                        {sede.direccion || "Zona, calle, número"}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                    <Clock className="w-5 h-5 shrink-0" />
                    <span className="font-light">
                        {sede.horario || "8:00 - 20:00"}
                    </span>
                </div>
            </div>
            <RedesSociales
                facebook={sede.facebook}
                instagram={sede.instagram}
                tiktok={sede.tiktok}
            />
        </div>
    );
}

function SedeMapa({ sede, colorTema }) {
    const pinColor = colorTema === "cyan" ? "#00A8CC" : "#9BB03E";
    const lat = sede.lat || -16.4955;
    const lng = sede.lng || -68.1336;

    return (
        <div className="w-full bg-[#E5F9FA] p-3 sm:p-4 rounded-xl border border-[#C5ECEF] shadow-sm">
            <div className="w-full h-[260px] sm:h-[300px] rounded-lg overflow-hidden relative z-0">
                <MapContainer
                    center={[lat, lng]}
                    zoom={14}
                    scrollWheelZoom={false}
                    className="w-full h-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={[lat, lng]}
                        icon={createPinIcon(pinColor)}
                    >
                        <Popup>
                            <div className="text-center font-sans">
                                <strong className="text-sm font-semibold">
                                    {sede.nombre}
                                </strong>
                                <p className="text-xs text-gray-600 mt-1">
                                    {sede.direccion}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {sede.horario}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}

export default function NuestrasSedes() {
    const sedes = contactoData.sedes || [];

    return (
        <section className="w-full bg-white flex flex-col pb-16">
            {/* Banner Titulo */}
            <div className="w-full bg-[#00A8CC] py-3.5 mb-10 flex items-center justify-center shadow-xs">
                <h2 className="text-white italic font-semibold text-2xl sm:text-3xl md:text-4xl tracking-widest uppercase">
                    NUESTRAS SEDES
                </h2>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-14">
                {sedes.map((sede, index) => {
                    const isEven = index % 2 === 1; // 0=La Paz (cyan right), 1=El Alto (olive left), 2=Oruro (cyan right), 3=Santa Cruz (olive left), 4=Sucre (cyan right)
                    const colorTema = isEven ? "olive" : "cyan";

                    return (
                        <div
                            key={sede.nombre || index}
                            className="flex flex-col items-center w-full"
                        >
                            {/* Titulo de la sede con subrayado */}
                            <div className="relative mb-6 text-center">
                                <h3 className="italic text-2xl sm:text-3xl font-semibold text-gray-800">
                                    {sede.nombre}
                                </h3>
                                <div className="w-full h-0.5 bg-[#00A8CC] mt-1 mx-auto max-w-[120px]"></div>
                            </div>

                            {/* Contenedor alternado Mapa / Info */}
                            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                                {!isEven ? (
                                    <>
                                        {/* Impar: Mapa Izquierda (col 7), Info Derecha (col 5) */}
                                        <div className="lg:col-span-7 w-full order-1">
                                            <SedeMapa
                                                sede={sede}
                                                colorTema={colorTema}
                                            />
                                        </div>
                                        <div className="lg:col-span-5 w-full order-2">
                                            <TarjetaInfo
                                                sede={sede}
                                                colorTema={colorTema}
                                                isLeftArch={true}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Par: Info Izquierda (col 5), Mapa Derecha (col 7) */}
                                        <div className="lg:col-span-5 w-full order-2 lg:order-1">
                                            <TarjetaInfo
                                                sede={sede}
                                                colorTema={colorTema}
                                                isLeftArch={false}
                                            />
                                        </div>
                                        <div className="lg:col-span-7 w-full order-1 lg:order-2">
                                            <SedeMapa
                                                sede={sede}
                                                colorTema={colorTema}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
