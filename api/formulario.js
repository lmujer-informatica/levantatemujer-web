// Función serverless: recibe los formularios del sitio y los envía por correo con Resend.
// Variables de entorno (solo servidor): RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL.

// Lista blanca de formularios aceptados: id -> nombre legible para el asunto.
const FORMULARIOS = {
  programa_i_donacion: 'Programa I - Donación',
  programa_ii_donacion: 'Programa II - Donación',
};

// Solo este formulario puede traer adjunto (CV).
const FORMULARIOS_CON_ARCHIVO = new Set(['postulacion_profesionales']);

const MAX_CAMPO = 5000;
const MAX_ARCHIVO_BYTES = 3 * 1024 * 1024; // 3 MB
const TIPOS_ARCHIVO = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};
const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/;

const escapeHtml = (v) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Una sola línea y longitud acotada: sirve para el asunto (evita inyección de cabeceras).
const unaLinea = (v, max = 80) => String(v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

// "tipo_emergencia" -> "Tipo emergencia"
const etiqueta = (clave) => {
  const t = clave.replace(/_/g, ' ').trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

// Solo acepta texto/números/booleanos; recorta cada valor a MAX_CAMPO.
function limpiarCampos(body) {
  const campos = {};
  for (const [clave, valor] of Object.entries(body)) {
    if (clave === 'formulario' || clave === '_gotcha' || clave === 'archivo') continue;
    if (!/^[a-zA-Z0-9_]{1,50}$/.test(clave)) continue;
    if (['string', 'number', 'boolean'].includes(typeof valor)) {
      campos[clave] = String(valor).trim().slice(0, MAX_CAMPO);
    }
  }
  return campos;
}

// Devuelve { adjunto } o { error } a partir de { nombre, tipo, base64 }.
function validarArchivo(archivo) {
  if (!archivo || typeof archivo !== 'object') return { error: 'Archivo inválido' };
  const { nombre, tipo, base64 } = archivo;
  if (typeof nombre !== 'string' || typeof tipo !== 'string' || typeof base64 !== 'string') {
    return { error: 'Archivo inválido' };
  }
  const extensiones = TIPOS_ARCHIVO[tipo];
  const ext = nombre.toLowerCase().match(/\.[a-z0-9]+$/)?.[0];
  if (!extensiones || !ext || !extensiones.includes(ext)) {
    return { error: 'Solo se permiten archivos PDF o Word' };
  }
  const limpio = base64.replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(limpio)) return { error: 'Archivo inválido' };
  const bytes = Math.floor((limpio.length * 3) / 4) - (limpio.endsWith('==') ? 2 : limpio.endsWith('=') ? 1 : 0);
  if (bytes <= 0 || bytes > MAX_ARCHIVO_BYTES) {
    return { error: 'El archivo supera el máximo de 3 MB' };
  }
  const filename = nombre.replace(/[^a-zA-Z0-9.\-_]/g, '_').slice(-100);
  return { adjunto: { filename, content: limpio } };
}

function construirHtml(titulo, campos) {
  const filas = Object.entries(campos)
    .map(
      ([clave, valor]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #ddd;background:#f5f5f5;font-weight:bold;vertical-align:top">${escapeHtml(
          etiqueta(clave),
        )}</td><td style="padding:6px 12px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(valor) || '&mdash;'}</td></tr>`,
    )
    .join('');
  return `<div style="font-family:Arial,sans-serif;font-size:14px;color:#222"><h2 style="margin:0 0 12px">${escapeHtml(
    titulo,
  )}</h2><table style="border-collapse:collapse">${filas}</table></div>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : null;
  if (!body) {
    return res.status(400).json({ ok: false, error: 'Solicitud inválida' });
  }

  const titulo = FORMULARIOS[body.formulario];
  if (!Object.prototype.hasOwnProperty.call(FORMULARIOS, body.formulario) || !titulo) {
    return res.status(400).json({ ok: false, error: 'Formulario no reconocido' });
  }

  // Honeypot: un bot rellenó el campo oculto; se responde éxito sin enviar nada.
  if (body._gotcha) {
    return res.status(200).json({ ok: true });
  }

  const campos = limpiarCampos(body);
  if (Object.keys(campos).length === 0) {
    return res.status(400).json({ ok: false, error: 'Faltan datos del formulario' });
  }

  let adjuntos;
  if (body.archivo) {
    if (!FORMULARIOS_CON_ARCHIVO.has(body.formulario)) {
      return res.status(400).json({ ok: false, error: 'Este formulario no admite archivos' });
    }
    const { adjunto, error } = validarArchivo(body.archivo);
    if (error) return res.status(400).json({ ok: false, error });
    adjuntos = [adjunto];
  }

  const { RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL } = process.env;
  const destinatarios = (FORMS_TO_EMAIL || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
  if (!RESEND_API_KEY || !FORMS_FROM_EMAIL || destinatarios.length === 0) {
    console.error('/api/formulario: faltan RESEND_API_KEY, FORMS_TO_EMAIL o FORMS_FROM_EMAIL');
    return res.status(500).json({ ok: false, error: 'No se pudo enviar el formulario' });
  }

  const nombre = unaLinea(campos.nombre || '');
  const payload = {
    from: FORMS_FROM_EMAIL,
    to: destinatarios,
    subject: `Nuevo formulario web: ${titulo}${nombre ? ` - ${nombre}` : ''}`,
    html: construirHtml(titulo, campos),
  };
  if (campos.correo && EMAIL_RE.test(campos.correo)) payload.reply_to = campos.correo;
  if (adjuntos) payload.attachments = adjuntos;

  try {
    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!respuesta.ok) {
      // El detalle va solo al log del servidor, nunca al cliente.
      const detalle = await respuesta.text().catch(() => '');
      console.error(`/api/formulario: Resend respondió ${respuesta.status}`, detalle.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'No se pudo enviar el formulario' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('/api/formulario: error al llamar a Resend', error?.message);
    return res.status(502).json({ ok: false, error: 'No se pudo enviar el formulario' });
  }
}
