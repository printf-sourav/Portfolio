/**
 * Portfolio React App - Main Component
 * Unix Terminal Inspired Design
 */

import React, { useState, useEffect } from 'react';

// Components
import Loader from './components/Loader';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { profile } from './data/portfolioData';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Console Easter Egg
    console.log(`
%c
 ____            _    __       _ _       
|  _ \\ ___  _ __| |_ / _| ___ | (_) ___  
| |_) / _ \\| '__| __| |_ / _ \\| | |/ _ \\ 
|  __/ (_) | |  | |_|  _| (_) | | | (_) |
|_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/ 
                                          
%cWelcome, curious visitor! 👀
%cBuilt with React!
%c
Looking for Sourav? Let's connect!
Email: ${profile.email}
`,
      'color: #00ffcc; font-family: monospace; font-weight: bold;',
      'color: #00ff88; font-size: 14px;',
      'color: #a0a0a0; font-size: 12px;',
      'color: #e0e0e0; font-size: 12px;'
    );
  }, []);

  const handleLoadComplete = () => {
    setLoading(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="App">
      {loading && <Loader onLoadComplete={handleLoadComplete} />}
      <ParticleCanvas />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Terminal />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
