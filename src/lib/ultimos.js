// Utilidades para elegir "lo último" de una lista por fecha y mostrarlo en español.
// Reconoce dos formatos de fecha: "YYYY-MM-DD" (ISO) y "dd - mm - aaaa" (noticias de la carpeta).

/**
 * Convierte "YYYY-MM-DD" o "dd - mm - aaaa" (espacios opcionales) en un Date local a medianoche.
 * Devuelve null si el texto no tiene un formato válido o la fecha no existe (ej. 31-02).
 */
export function parsearFecha(texto) {
    const t = String(texto ?? "").trim();
    let anio, mes, dia;

    let m = t.match(/^(\d{4})\s*-\s*(\d{1,2})\s*-\s*(\d{1,2})(?:$|T)/);
    if (m) {
        [anio, mes, dia] = [m[1], m[2], m[3]];
    } else {
        m = t.match(/^(\d{1,2})\s*-\s*(\d{1,2})\s*-\s*(\d{4})$/);
        if (!m) return null;
        [dia, mes, anio] = [m[1], m[2], m[3]];
    }

    const fecha = new Date(Number(anio), Number(mes) - 1, Number(dia));
    // Descarta fechas que JS "corrige" solo, como 31 de febrero
    if (
        fecha.getFullYear() !== Number(anio) ||
        fecha.getMonth() !== Number(mes) - 1 ||
        fecha.getDate() !== Number(dia)
    ) {
        return null;
    }
    return fecha;
}

const formatoLargo = new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
});

/** "2026-10-15" -> "15 de octubre de 2026". Devuelve "" si la fecha no es válida. */
export function formatearFechaLarga(texto) {
    const fecha = parsearFecha(texto);
    return fecha ? formatoLargo.format(fecha) : "";
}

/**
 * Copia de la lista ordenada de la fecha más reciente a la más antigua (campo `campo`).
 * Las entradas sin fecha válida van al final; con igual fecha se respeta el orden original.
 */
export function ordenarPorFecha(lista, campo = "fecha") {
    return (lista ?? [])
        .map((item, indice) => ({
            item,
            indice,
            tiempo: parsearFecha(item?.[campo])?.getTime(),
        }))
        .sort((a, b) => {
            if (a.tiempo === undefined && b.tiempo === undefined) return a.indice - b.indice;
            if (a.tiempo === undefined) return 1;
            if (b.tiempo === undefined) return -1;
            return b.tiempo - a.tiempo || a.indice - b.indice;
        })
        .map(({ item }) => item);
}

/**
 * Elemento con la fecha más reciente (campo `campo`). Ignora los que no tienen fecha válida.
 * Si dos tienen la misma fecha gana el que aparece después en la lista.
 * Devuelve null si la lista está vacía o ninguna fecha es válida.
 */
export function ultimoPorFecha(lista, campo = "fecha") {
    let mejor = null;
    let mejorTiempo = -Infinity;
    for (const item of lista ?? []) {
        const tiempo = parsearFecha(item?.[campo])?.getTime();
        if (tiempo !== undefined && tiempo >= mejorTiempo) {
            mejor = item;
            mejorTiempo = tiempo;
        }
    }
    return mejor;
}

/**
 * El evento más cercano desde hoy (hoy incluido); si no queda ninguno por venir,
 * el último que ya pasó. Misma regla que el panel "Próxima Actividad Destacada" del calendario.
 */
export function proximoOUltimo(lista, hoy = new Date(), campo = "fecha") {
    const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).getTime();

    let proximo = null;
    let proximoTiempo = Infinity;
    for (const item of lista ?? []) {
        const tiempo = parsearFecha(item?.[campo])?.getTime();
        // Con empate se queda el primero de la lista
        if (tiempo !== undefined && tiempo >= inicioHoy && tiempo < proximoTiempo) {
            proximo = item;
            proximoTiempo = tiempo;
        }
    }
    return proximo ?? ultimoPorFecha(lista, campo);
}
