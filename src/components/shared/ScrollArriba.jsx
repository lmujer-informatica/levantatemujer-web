import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

// Al cambiar de página, empieza arriba (React Router no lo hace solo).
// Con "Atrás/Adelante" (POP) no se toca el scroll. Las anclas (ej. /programaI#testimonios)
// las resuelve la propia página: primero se sube y luego ella baja a su sección.
export default function ScrollArriba() {
    const { pathname } = useLocation();
    const tipo = useNavigationType();

    useLayoutEffect(() => {
        if (tipo === "POP") return;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
}
