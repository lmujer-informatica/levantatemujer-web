import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function handler(req, res) {
  // Solo permitir solicitudes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { file, name, type } = req.body;

    if (!file || !name) {
      return res.status(400).json({ error: 'Faltan datos del archivo' });
    }

    // Configurar el cliente de S3 para Cloudflare R2
    const s3 = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    // Generar un nombre único para evitar colisiones
    const timestamp = Date.now();
    const safeName = name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const fileName = `uploads/${timestamp}-${safeName}`;

    // Convertir Base64 a Buffer
    const buffer = Buffer.from(file, 'base64');

    // Parámetros para la subida
    const uploadParams = {
      Bucket: process.env.R2_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: type || 'application/octet-stream',
    };

    // Ejecutar subida
    await s3.send(new PutObjectCommand(uploadParams));

    // Construir la URL pública final, evitando dobles slashes o slashes faltantes
    const base = (process.env.R2_PUBLIC_URL || `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}`)
      .replace(/\/+$/, ''); // quita cualquier slash al final

    const publicUrl = `${base}/${fileName}`;

    return res.status(200).json({ url: publicUrl });
  } catch (error) {
    console.error("Error en /api/upload:", error);
    return res.status(500).json({ error: 'Error interno del servidor al subir el archivo' });
  }
}