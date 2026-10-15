import React from 'react';

/** Image placeholder SVG */
function ImagePlaceholder({ className = '' }) {
  return (
    <div className={`bg-gray-400 flex items-center justify-center ${className}`}>
      <svg className="w-16 h-16 text-white opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

const NEWS_ITEMS = [
  {
    id: 1,
    date: 'dd - mm - aaaa',
    title: 'Título',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus,',
    themeColor: '#2C8E9E', // Teal/Cyan color from image
  },
  {
    id: 2,
    date: 'dd - mm - aaaa',
    title: 'Título',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus,',
    themeColor: '#2C8E9E', // Teal/Cyan color from image
  },
  {
    id: 3,
    date: 'dd - mm - aaaa',
    title: 'Título',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus,',
    themeColor: '#93A635', // Olive/Lime color from image
  },
  {
    id: 4,
    date: 'dd - mm - aaaa',
    title: 'Título',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit congue, dictum per commodo nostra aliquet quisque etiam luctus,',
    themeColor: '#93A635', // Olive/Lime color from image
  }
];

function NewsCard({ item }) {
  return (
    <div 
      className="relative flex flex-col w-full bg-white rounded-t-[40px] rounded-b-sm overflow-hidden h-[400px]"
      style={{ border: `1px solid ${item.themeColor}` }}
    >
      {/* Top Image area */}
      <div className="relative w-full h-[220px]">
        {/* The image doesn't fill the whole top due to margins in the design */}
        <div className="absolute inset-x-8 top-8 bottom-0 bg-gray-400 rounded-t-lg overflow-hidden flex items-center justify-center">
             <ImagePlaceholder className="w-full h-full" />
        </div>
        
        {/* Date Badge */}
        <div 
          className="absolute top-4 right-0 px-6 py-1.5 rounded-l-full text-white text-sm font-medium"
          style={{ backgroundColor: item.themeColor }}
        >
          {item.date}
        </div>
      </div>

      {/* Bottom arched content area */}
      <div 
        className="flex-1 flex flex-col items-center justify-center px-6 py-6 mt-[-40px] rounded-t-[50%] z-10"
        style={{ backgroundColor: item.themeColor }}
      >
        <h3 className="italic text-white text-xl md:text-2xl font-medium mb-3">
          {item.title}
        </h3>
        <p className="text-white text-xs text-center mb-6 leading-relaxed opacity-90">
          {item.description}
        </p>
        <button className="bg-white px-10 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity w-full max-w-[200px]" style={{ color: item.themeColor }}>
          Leer más
        </button>
      </div>
    </div>
  );
}

export default function NoticiasGrid() {
  return (
    <section className="w-full bg-[#F1FFFF] flex flex-col">
      {/* Section title */}
      <div className="w-full py-4 flex items-center justify-center" style={{ backgroundColor: '#B8CA5A' }}>
        <h2 className="italic font-medium text-white text-2xl md:text-4xl tracking-wide uppercase">
          NUESTRAS ÚLTIMAS NOTICIAS
        </h2>
      </div>

      {/* Grid container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {NEWS_ITEMS.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* View more button section */}
      <div className="w-full py-8 flex items-center justify-center" style={{ backgroundColor: '#0DADD4' }}>
        <button className="bg-white px-12 py-3 rounded-full text-xl md:text-2xl font-medium shadow-md hover:shadow-lg transition-shadow" style={{ color: '#0DADD4' }}>
          Ver más Noticias
        </button>
      </div>
    </section>
  );
}
