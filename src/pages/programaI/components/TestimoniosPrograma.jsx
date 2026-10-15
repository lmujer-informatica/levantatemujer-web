import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      className="rounded-t-[50%] rounded-b-xl overflow-hidden flex flex-col w-full h-full shadow-md"
      style={{ backgroundColor: accentColor }}
    >
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h3
          className="font-medium text-xl italic mb-4 text-center"
          style={{ color: bgColor }}
        >
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-center" style={{ color: bgColor }}>
          {text}
        </p>
      </div>
    </div>
  );
}

/** Card for identified testimonials (with photo) */
function TestimonialCardNamed({ name, role, bgColor, borderColor }) {
  return (
    <div
      className="rounded-t-[50%] rounded-b-xl overflow-hidden flex flex-col items-center shadow-md"
      style={{ backgroundColor: bgColor, border: `2px solid ${borderColor}` }}
    >
      {/* Profile photo */}
      <ImagePlaceholder className="w-full h-40 rounded-t-[50%]" />

      {/* Name and role */}
      <div className="px-4 py-4 text-center">
        <p className="text-xs font-normal" style={{ color: '#407178' }}>
          {name}
        </p>
        <p className="text-xs font-normal" style={{ color: '#407178' }}>
          {role}
        </p>
      </div>
    </div>
  );
}

const ANONYMOUS_TESTIMONIALS = [
  {
    id: 1,
    title: 'Título',
    text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus, velit cum mauris mi fusce bibendum euismod.',
    accentColor: '#0DADD4',
    bgColor: '#E3FFF8',
  },
  {
    id: 2,
    title: 'Título',
    text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus, velit cum mauris mi fusce bibendum euismod.',
    accentColor: '#859430',
    bgColor: '#E3FFF8',
  },
];

const NAMED_TESTIMONIALS = [
  { id: 1, name: '(Nombre)', role: '(Título)', bgColor: '#E3FFF8', borderColor: '#b0e8dc' },
  { id: 2, name: '(Nombre)', role: '(Título)', bgColor: '#E3FFF8', borderColor: '#b0e8dc' },
  { id: 3, name: '(Nombre)', role: '(Título)', bgColor: '#E3FFF8', borderColor: '#b0e8dc' },
  { id: 4, name: '(Nombre)', role: '(Título)', bgColor: '#E3FFF8', borderColor: '#b0e8dc' },
];

export default function TestimoniosPrograma() {
  const [anonIndex, setAnonIndex] = useState(0);
  const [namedIndex, setNamedIndex] = useState(0);

  const prevAnon = () => setAnonIndex((i) => (i - 1 + ANONYMOUS_TESTIMONIALS.length) % ANONYMOUS_TESTIMONIALS.length);
  const nextAnon = () => setAnonIndex((i) => (i + 1) % ANONYMOUS_TESTIMONIALS.length);

  const prevNamed = () => setNamedIndex((i) => (i - 1 + NAMED_TESTIMONIALS.length) % NAMED_TESTIMONIALS.length);
  const nextNamed = () => setNamedIndex((i) => (i + 1) % NAMED_TESTIMONIALS.length);

  // Show 2 named at a time
  const visibleNamed = [
    NAMED_TESTIMONIALS[namedIndex % NAMED_TESTIMONIALS.length],
    NAMED_TESTIMONIALS[(namedIndex + 1) % NAMED_TESTIMONIALS.length],
  ];

  return (
    <section className="w-full bg-[#0DADD4] py-8 md:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative flex items-center">
            <div className="absolute -left-6 w-4 h-6 bg-[#0DADD4]" />
            <div className="bg-[#0DADD4] px-4 py-1 flex items-center gap-3">
              <div className="w-3 h-8 bg-[#0DADD4]" />
              <h2 className="italic font-medium text-[#E3FFF8] text-2xl md:text-3xl tracking-wide">
                TESTIMONIOS
              </h2>
              <div className="w-3 h-8 bg-[#0DADD4]" />
            </div>
          </div>
        </div>

        {/* Row 1: Anonymous testimonials */}
        <div className="relative flex items-center gap-4 mb-8">
          {/* Prev arrow */}
          <button
            onClick={prevAnon}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            {/* Left named card */}
            <TestimonialCardNamed
              name={NAMED_TESTIMONIALS[namedIndex % NAMED_TESTIMONIALS.length].name}
              role={NAMED_TESTIMONIALS[namedIndex % NAMED_TESTIMONIALS.length].role}
              bgColor="#E3FFF8"
              borderColor="#b0e8dc"
            />

            {/* Center anonymous card (highlighted) */}
            <TestimonialCardAnonymous
              title={ANONYMOUS_TESTIMONIALS[anonIndex].title}
              text={ANONYMOUS_TESTIMONIALS[anonIndex].text}
              accentColor={ANONYMOUS_TESTIMONIALS[anonIndex].accentColor}
              bgColor={ANONYMOUS_TESTIMONIALS[anonIndex].bgColor}
            />

            {/* Right named card */}
            <TestimonialCardNamed
              name={NAMED_TESTIMONIALS[(namedIndex + 1) % NAMED_TESTIMONIALS.length].name}
              role={NAMED_TESTIMONIALS[(namedIndex + 1) % NAMED_TESTIMONIALS.length].role}
              bgColor="#E3FFF8"
              borderColor="#b0e8dc"
            />
          </div>

          {/* Next arrow */}
          <button
            onClick={nextAnon}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-navy text-white hover:bg-lm-navy/80 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Row 2: Non-anonymous testimonials */}
        <div className="relative flex items-center gap-4">
          {/* Prev arrow */}
          <button
            onClick={prevNamed}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-olive text-white hover:bg-lm-olive/80 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            {/* Left named card */}
            <TestimonialCardNamed
              name={NAMED_TESTIMONIALS[(namedIndex + 2) % NAMED_TESTIMONIALS.length].name}
              role={NAMED_TESTIMONIALS[(namedIndex + 2) % NAMED_TESTIMONIALS.length].role}
              bgColor="#E3FFF8"
              borderColor="#b0e8dc"
            />

            {/* Center anonymous (olive accent) */}
            <TestimonialCardAnonymous
              title={ANONYMOUS_TESTIMONIALS[(anonIndex + 1) % ANONYMOUS_TESTIMONIALS.length].title}
              text={ANONYMOUS_TESTIMONIALS[(anonIndex + 1) % ANONYMOUS_TESTIMONIALS.length].text}
              accentColor={ANONYMOUS_TESTIMONIALS[(anonIndex + 1) % ANONYMOUS_TESTIMONIALS.length].accentColor}
              bgColor={ANONYMOUS_TESTIMONIALS[(anonIndex + 1) % ANONYMOUS_TESTIMONIALS.length].bgColor}
            />

            {/* Right named card */}
            <TestimonialCardNamed
              name={NAMED_TESTIMONIALS[(namedIndex + 3) % NAMED_TESTIMONIALS.length].name}
              role={NAMED_TESTIMONIALS[(namedIndex + 3) % NAMED_TESTIMONIALS.length].role}
              bgColor="#E3FFF8"
              borderColor="#b0e8dc"
            />
          </div>

          {/* Next arrow */}
          <button
            onClick={nextNamed}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lm-olive text-white hover:bg-lm-olive/80 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
