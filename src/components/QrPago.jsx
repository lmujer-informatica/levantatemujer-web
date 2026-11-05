import React, { useState } from 'react';
import qrPago from '../data/qrPago.json';
import { estaVigente, formatearFechaLarga } from '../lib/ultimos';

// QR de pago único para los formularios de donación.
// Solo se muestra si hay imagen y hoy está entre fechaCreacion y fechaVencimiento (inclusive).
export default function QrPago({ onCerrar }) {
  const [falloImagen, setFalloImagen] = useState(false);
  const { imagen, fechaCreacion, fechaVencimiento, titulo, instrucciones } = qrPago;

  if (!imagen || !estaVigente(fechaCreacion, fechaVencimiento)) return null;

  const hasta = formatearFechaLarga(fechaVencimiento);

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full max-w-sm mx-auto mt-6 rounded-2xl border border-[#0DADD4]/40 bg-white p-5 text-center shadow-md"
    >
      {titulo && <h3 className="text-lg font-semibold text-[#356194]">{titulo}</h3>}

      {falloImagen ? (
        <p className="mt-4 text-sm font-medium text-slate-700">
          No pudimos cargar el QR, te contactaremos para coordinar tu donación.
        </p>
      ) : (
        <img
          src={imagen}
          alt="Código QR para pagar tu donación"
          onError={() => setFalloImagen(true)}
          className="mx-auto mt-4 h-auto w-64 max-w-full bg-white object-contain p-2"
        />
      )}

      {!falloImagen && instrucciones && (
        <p className="mt-4 text-sm text-slate-700 leading-relaxed">{instrucciones}</p>
      )}
      {!falloImagen && hasta && (
        <p className="mt-2 text-xs text-slate-500">Válido hasta {hasta}</p>
      )}

      <button
        type="button"
        onClick={onCerrar}
        className="mt-4 rounded-full border border-[#356194] px-6 py-1.5 text-sm font-medium text-[#356194] hover:bg-[#356194]/10 focus:outline-none focus:ring-2 focus:ring-[#356194]/40"
      >
        Cerrar
      </button>
    </div>
  );
}
