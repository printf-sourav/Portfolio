/**
 * Navbar Component - Sticky Transparent Navigation
 */

import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero', label: 'Home', num: '01' },
  { id: 'about', label: 'About', num: '02' },
  { id: 'skills', label: 'Skills', num: '03' },
  { id: 'projects', label: 'Projects', num: '04' },
  { id: 'terminal', label: 'Terminal', num: '05' },
  { id: 'contact', label: 'Contact', num: '06' }
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand terminal-text" href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>
          <span className="text-accent">~</span>/printf-sourav<span className="cursor-blink">_</span>
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {navItems.map(item => (
              <li className="nav-item" key={item.id}>
                <a 
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                >
                  <span className="nav-prefix">{item.num}.</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
