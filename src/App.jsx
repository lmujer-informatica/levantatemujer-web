import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

import Inicio from './pages/inicio/Inicio';
import QuienesSomos from './pages/quienesSomos/quienesSomos';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans bg-lm-bg">
        <Navbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quienesSomos" element={<QuienesSomos/>} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;