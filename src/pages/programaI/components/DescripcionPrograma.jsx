import React from 'react';

export default function DescripcionPrograma() {
  return (
    <section className="w-full bg-[#F1FFFF] py-8 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">

          {/* Left: Program description */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Title */}
            <h2 className="text-[#15A4C9] font-medium text-xl md:text-2xl italic">
              El Programa
            </h2>

            {/* Separator line */}
            <div className="w-full h-px bg-[#15A4C9]/40" />

            {/* Body text */}
            <p className="text-[#407178] text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra
              aliquet quisque etiam luctus, velit cum mauris mi fusce bibendum euismod. Nibh libero
              fermentum donec duis risus maecenas, scelerisque cubilia hac hendrerit quisque torquent,
              vel netus ultricies fames egestas. Himenaeos rutrum placerat morbi conubia potenti mus
              nulla habitant turpis, est netus gravida natoque metus dignissim congue laoreet.
            </p>
            <p className="text-[#407178] text-sm leading-relaxed">
              Scelerisque parturient hendrerit per habitasse integer litora nisi, luctus pulvinar
              himenaeos euismod purus condimentum nullam arcu, vehicula imperdiet quis tristique.
            </p>
          </div>

          {/* Right: Navigation cards to Servicios and Testimonios */}
          <div className="flex flex-col gap-4 min-w-[200px] md:min-w-[240px]">

            {/* Servicios card */}
            <div className="flex items-center gap-3 bg-[#EFFFF7] rounded-2xl p-4 shadow-sm border border-[#d0f5e8] hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-lm-olive flex items-center justify-center shrink-0">
                {/* Ellipse icon placeholder */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="6" />
                </svg>
              </div>
              <span className="text-lm-olive font-medium text-lg">Servicios</span>
            </div>

            {/* Testimonios card */}
            <div className="flex items-center gap-3 bg-[#E3FFF8] rounded-2xl p-4 shadow-sm border border-[#b0e8dc] hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#15A4C9] flex items-center justify-center shrink-0">
                {/* Ellipse icon placeholder */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="6" />
                </svg>
              </div>
              <span className="text-[#15A4C9] font-medium text-lg">Testimonios</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
