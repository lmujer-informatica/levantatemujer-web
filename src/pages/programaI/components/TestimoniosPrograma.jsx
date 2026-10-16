import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const ANON_ACCENTS = ['#0DADD4', '#859430'];
const ANON_BG = '#E3FFF8';
const NAMED_BG = '#E3FFF8';
const NAMED_BORDER = '#b0e8dc';

/** Image placeholder */
function ImagePlaceholder({ className = '', rounded = '' }) {
  return (
    <div className={`bg-gray-300 flex items-center justify-center ${className} ${rounded}`}>
      <svg className="w-10 h-10 text-white opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

/** Card for anonymous testimonials (no photo) */
function TestimonialCardAnonymous({ title, text, accentColor, bgColor }) {
  return (
    <div
      className="rounded-t-[50%] rounded-b-xl overflow-hidden flex flex-col w-full h-full shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      style={{ backgroundColor: accentColor }}
    >
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10">
        <h3
          className="font-medium text-xl lg:text-3xl italic mb-4 lg:mb-6 text-center"
          style={{ color: bgColor }}
        >
          {title}
        </h3>
        <p className="text-xs md:text-sm lg:text-lg leading-relaxed text-center" style={{ color: bgColor }}>
          {text}
        </p>
      </div>
    </div>
  );
}

/** Card for identified testimonials (with photo) */
function TestimonialCardNamed({ name, role, foto, bgColor, borderColor }) {
  return (
    <div
      className="rounded-t-[50%] rounded-b-xl overflow-hidden flex flex-col items-center shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      style={{ backgroundColor: bgColor, border: `2px solid ${borderColor}` }}
    >
      {/* Profile photo */}
      {foto ? (
        <img
          src={foto}
          alt={name}
          loading="lazy"
          className="w-full h-40 lg:h-64 object-cover rounded-t-[50%]"
        />
      ) : (
        <ImagePlaceholder className="w-full h-40 lg:h-64 rounded-t-[50%]" />
      )}

      {/* Name and role */}
      <div className="px-4 py-4 lg:py-7 text-center">
        <p className="text-xs lg:text-lg font-normal" style={{ color: '#407178' }}>
          {name}
        </p>
        <p className="text-xs lg:text-base font-normal" style={{ color: '#407178' }}>
          {role}
        </p>
      </div>
    </div>
  );
}

export default function TestimoniosPrograma({ data = {} }) {
  const anonimos = data.anonimos ?? [];
  const nombrados = data.nombrados ?? [];
  const [anonIndex, setAnonIndex] = useState(0);
  const [namedIndex, setNamedIndex] = useState(0);

  if (anonimos.length === 0 || nombrados.length === 0) return null;

  const prevAnon = () => setAnonIndex((i) => (i - 1 + anonimos.length) % anonimos.length);
  const nextAnon = () => setAnonIndex((i) => (i + 1) % anonimos.length);

  const prevNamed = () => setNamedIndex((i) => (i - 1 + nombrados.length) % nombrados.length);
  const nextNamed = () => setNamedIndex((i) => (i + 1) % nombrados.length);

  const anon = (offset) => {
    const item = anonimos[(anonIndex + offset) % anonimos.length];
    return { ...item, accent: ANON_ACCENTS[(anonIndex + offset) % ANON_ACCENTS.length] };
  };
  const named = (offset) => nombrados[(namedIndex + offset) % nombrados.length];

  const namedCard = (item) => (
    <TestimonialCardNamed
      name={item.nombre}
      role={item.cargo}
      foto={item.foto}
      bgColor={NAMED_BG}
      borderColor={NAMED_BORDER}
    />
  );
  const anonCard = (item) => (
    <TestimonialCardAnonymous
      title={item.titulo}
      text={item.texto}
      accentColor={item.accent}
      bgColor={ANON_BG}
    />
  );

  const arrowCls = 'shrink-0 w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110 active:scale-95';

  return (
    <section className="w-full bg-[#0DADD4] py-8 md:py-12 lg:py-24">
      <div className="max-w-[1200px] lg:max-w-[1280px] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <Reveal>
          <div className="flex items-center justify-center mb-8 lg:mb-14">
            <div className="relative flex items-center">
              <div className="absolute -left-6 w-4 h-6 bg-[#0DADD4]" />
              <div className="bg-[#0DADD4] px-4 py-1 lg:py-3 flex items-center gap-3">
                <div className="w-3 h-8 lg:h-12 bg-[#0DADD4]" />
                <h2 className="italic font-medium text-[#E3FFF8] text-2xl md:text-3xl lg:text-5xl tracking-wide">
                  TESTIMONIOS
                </h2>
                <div className="w-3 h-8 lg:h-12 bg-[#0DADD4]" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Row 1: Anonymous testimonials */}
        <Reveal retraso={100}>
          <div className="relative flex items-center gap-4 lg:gap-8 mb-8 lg:mb-12">
            <button
              onClick={prevAnon}
              className={`${arrowCls} bg-lm-navy hover:bg-lm-navy/80`}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 lg:w-7 lg:h-7" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-10 flex-1">
              {namedCard(named(0))}
              {anonCard(anon(0))}
              {namedCard(named(1))}
            </div>

            <button
              onClick={nextAnon}
              className={`${arrowCls} bg-lm-navy hover:bg-lm-navy/80`}
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 lg:w-7 lg:h-7" />
            </button>
          </div>
        </Reveal>

        {/* Row 2: Non-anonymous testimonials */}
        <Reveal retraso={150}>
          <div className="relative flex items-center gap-4 lg:gap-8">
            <button
              onClick={prevNamed}
              className={`${arrowCls} bg-lm-olive hover:bg-lm-olive/80`}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 lg:w-7 lg:h-7" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-10 flex-1">
              {namedCard(named(2))}
              {anonCard(anon(1))}
              {namedCard(named(3))}
            </div>

            <button
              onClick={nextNamed}
              className={`${arrowCls} bg-lm-olive hover:bg-lm-olive/80`}
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 lg:w-7 lg:h-7" />
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
