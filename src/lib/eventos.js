// Utilidades para los eventos de src/data/eventos.json.
// Los eventos no tienen id: el slug se calcula a partir de fecha y título.
import eventosData from "../data/eventos.json";

/** Fecha "YYYY-MM-DD" (o ISO) a "dd - mm - aaaa". */
export function formatearFecha(fechaStr) {
    if (!fechaStr) return "dd - mm - aaaa";
    try {
        const fecha = new Date(
            fechaStr.includes("T") ? fechaStr : fechaStr + "T00:00:00"
        );
        if (isNaN(fecha.getTime())) return fechaStr;
        const dd = String(fecha.getDate()).padStart(2, "0");
        const mm = String(fecha.getMonth() + 1).padStart(2, "0");
        const aaaa = fecha.getFullYear();
        return `${dd} - ${mm} - ${aaaa}`;
    } catch {
        return fechaStr;
    }
}

/**
 * Slug base de un evento: "<fecha>-<titulo>" en minúsculas, sin tildes ni símbolos.
 * Ej.: "2026-08-10-taller-de-liderazgo-y-participacion-femenina".
 * No resuelve repetidos; para eso usa asignarSlugs / obtenerEventos.
 */
export function slugEvento(evento) {
    return `${evento?.fecha ?? ""}-${evento?.titulo ?? ""}`
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Devuelve cada evento con su slug único (campo `slug`), sin modificar los originales.
 * Si dos eventos generan el mismo slug, el repetido recibe -2, -3... según su
 * posición en la lista, así que el resultado es estable mientras no cambie el orden.
 */
export function asignarSlugs(lista) {
    const usados = new Set();
    return lista.map((evento) => {
        const base = slugEvento(evento);
        let slug = base;
        for (let n = 2; usados.has(slug); n++) slug = `${base}-${n}`;
        usados.add(slug);
        return { ...evento, slug };
    });
}

const listaOriginal =
    eventosData?.tarjetasEventos || eventosData?.eventos || [];
const eventos = asignarSlugs(listaOriginal);

// Permite obtener el slug único de un evento original (el objeto del JSON),
// incluso cuando hay repetidos y slugEvento solo devolvería el slug base.
const slugPorEvento = new WeakMap(
    listaOriginal.map((evento, i) => [evento, eventos[i].slug])
);

/** Todos los eventos, cada uno con su `slug`. */
export function obtenerEventos() {
    return eventos;
}

/** Evento (con `slug`) o undefined si no existe. */
export function buscarEventoPorSlug(slug) {
    return eventos.find((evento) => evento.slug === slug);
}

/** Slug único de un evento tomado de eventos.json (o el slug base si no se reconoce). */
export function slugDe(evento) {
    return slugPorEvento.get(evento) ?? slugEvento(evento);
}
