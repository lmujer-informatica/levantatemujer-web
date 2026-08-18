import React from 'react';
import Navbar from './components/Navbar';
import SeccionHero from './components/SeccionHero';
import NuestrosAlcances from './components/NuestrosAlcances';
import ProgramasPrioritarios from './components/ProgramasPrioritarios';
import NuestroTrabajo from './components/NuestroTrabajo';
import LineaAyuda from './components/LineaAyuda';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-lm-bg">
      <Navbar />
      <main className="flex-grow flex flex-col gap-0">
        <SeccionHero />
        <NuestrosAlcances />
        <ProgramasPrioritarios />
        <NuestroTrabajo />
        <LineaAyuda />
      </main>
      <Footer />
    </div>
  );
}

export default App;
