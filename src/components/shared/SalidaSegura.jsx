import React from 'react';

function SalidaSegura() {
  const handleSafeExit = () => {
    window.location.replace('https://www.google.com');
  };

  return (
    <button
      onClick={handleSafeExit}
      title="Salir de esta página de inmediato"
      aria-label="Salida segura"
      className="
        fixed
        right-4
        bottom-4
        z-50

        w-24
        h-16

        sm:w-28
        sm:h-18

        md:right-6
        md:bottom-6
        md:w-36
        md:h-20

        lg:right-8
        lg:bottom-8
        lg:w-44
        lg:h-24

        bg-[#a6c152]
        rounded-2xl
        md:rounded-l-[80px]

        flex
        items-center
        justify-center

        shadow-lg
        hover:bg-[#9cb64c]
        hover:scale-105

        transition-all
        duration-300

        cursor-pointer

        focus:outline-hidden
        focus:ring-4
        focus:ring-red-500
        focus:ring-offset-2
      "
    >
      <div className="flex flex-col items-center">
        <span
          className="
            text-white
            text-xl
            sm:text-2xl
            md:text-3xl
            lg:text-4xl

            italic
            font-bold
            leading-none
            transform
            -skew-x-6
            drop-shadow-lg
          "
        >
          Salida
        </span>

        <span
          className="
            text-white
            text-xl
            sm:text-2xl
            md:text-3xl
            lg:text-4xl

            italic
            font-bold
            leading-none
            transform
            -skew-x-6
            drop-shadow-lg
          "
        >
          Segura
        </span>
      </div>
    </button>
  );
}

export default SalidaSegura;

