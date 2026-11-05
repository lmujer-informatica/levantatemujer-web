// Utilidades para las noticias de src/data/noticias.json.
// Las noticias no usan el "id" del JSON: el enlace al detalle es un slug calculado de fecha y título.
import noticiasData from "../data/noticias.json";
import { ordenarPorFecha } from "./ultimos";

/**
 * Slug base de una noticia: "<fecha>-<titulo>" en minúsculas, sin tildes ni símbolos.
 * Ej.: "2026-09-20-inicio-de-talleres-de-capacitacion-tecnica".
 */
function slugBase(noticia) {
    return (
        `${noticia?.fecha ?? ""}-${noticia?.titulo ?? ""}`
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "noticia"
    );
}

/**
 * Devuelve cada noticia con su slug único (campo `slug`), sin modificar las originales.
 * Si dos noticias generan el mismo slug, el repetido recibe -2, -3... según su posición
 * en la lista, así que el resultado es estable mientras no cambie el orden del archivo.
 */
export function asignarSlugs(lista) {
    const usados = new Set();
    return lista.map((noticia) => {
        const base = slugBase(noticia);
        let slug = base;
        for (let n = 2; usados.has(slug); n++) slug = `${base}-${n}`;
        usados.add(slug);
        return { ...noticia, slug };
    });
}

const listaOriginal = noticiasData?.noticias ?? [];
// Los slugs se asignan en el orden del archivo (no en el orden de muestra) para que sean estables
const conSlug = asignarSlugs(listaOriginal);
const noticias = ordenarPorFecha(conSlug);

// Slug único de una noticia original del JSON (el objeto de noticiasData.noticias)
const slugPorNoticia = new WeakMap(
    listaOriginal.map((noticia, i) => [noticia, conSlug[i].slug])
);

/** Todas las noticias con su `slug`, de la más reciente a la más antigua. */
export function obtenerNoticias() {
    return noticias;
}

/** Noticia (con `slug`) o undefined si no existe. */
export function buscarNoticiaPorSlug(slug) {
    return conSlug.find((noticia) => noticia.slug === slug);
}

/** Slug único de una noticia tomada de noticias.json (o el slug base si no se reconoce). */
export function slugDeNoticia(noticia) {
    return slugPorNoticia.get(noticia) ?? slugBase(noticia);
}
