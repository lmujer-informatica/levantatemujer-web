// Cliente para enviar formularios a /api/formulario (correo con Resend).

// Convierte un File a base64 (sin el prefijo "data:...;base64,").
function archivoABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
        reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
        reader.readAsDataURL(file);
    });
}

/**
 * Envía un formulario al servidor.
 * @param {string} id      Id del formulario (ej. "contacto_general").
 * @param {object} datos   Campos del formulario.
 * @param {object} [opciones]
 * @param {string} [opciones._gotcha]  Valor del campo honeypot.
 * @param {File}   [opciones.archivo]  Archivo adjunto (solo postulación de profesionales).
 * @throws {Error} Si la respuesta no es ok o falla la red.
 */
export async function enviarFormulario(id, datos, { _gotcha, archivo } = {}) {
    const cuerpo = { ...datos, formulario: id, _gotcha };

    if (archivo) {
        cuerpo.archivo = {
            nombre: archivo.name,
            tipo: archivo.type,
            base64: await archivoABase64(archivo),
        };
    }

    const res = await fetch("/api/formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Error al enviar el formulario (${res.status})`);
    }
    return json;
}
