import React, { useState, useEffect } from "react";

/**
 * Componente ContadorOdometer
 * Realiza una animación de conteo numérico tipo odómetro desde 0 hasta el valor objetivo.
 * Aplica una función de aceleración 'ease-out' (easeOutQuart) para que el conteo empiece
 * rápidamente y reduzca su velocidad progresivamente al aproximarse al número final.
 *
 * @param {string|number} valor - Valor objetivo (ej. "6840", "120", "20110", "+200", 6)
 * @param {boolean} start - Disparador de la animación (cuando entra en viewport)
 * @param {number} duration - Duración en milisegundos de la animación
 */
export default function ContadorOdometer({
    valor,
    start = false,
    duration = 2000,
}) {
    const [displayCount, setDisplayCount] = useState(0);

    // Extraer prefijo (como '+'), sufijo y el número objetivo
    const rawStr = String(valor ?? "0").trim();
    const hasPlus = rawStr.startsWith("+");
    const numericTarget = parseInt(rawStr.replace(/\D/g, ""), 10) || 0;
    const prefix = hasPlus ? "+" : "";

    useEffect(() => {
        // Si aún no está en el viewport, iniciar en 0
        if (!start) {
            setDisplayCount(0);
            return;
        }

        let animationFrameId;
        const startTime = performance.now();

        // Easing ease-out cuártico: arranca a máxima velocidad y desacelera suavemente hacia el final
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);

            const current = Math.round(easedProgress * numericTarget);
            setDisplayCount(current);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateCounter);
            } else {
                setDisplayCount(numericTarget);
            }
        };

        animationFrameId = requestAnimationFrame(updateCounter);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [start, numericTarget, duration]);

    return (
        <span>
            {prefix}
            {displayCount}
        </span>
    );
}
