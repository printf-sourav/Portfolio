/**
 * Hero Component - Full Screen with Typing Effect
 */

import React, { useRef, useState } from 'react';
import useTypingEffect from '../hooks/useTypingEffect';
import useCountUp from '../hooks/useCountUp';
import { profile } from '../data/portfolioData';
import miniModelImage from '../assets/mini-model.png';



function Hero() {
  const typingText = useTypingEffect(profile.roles);

  return (
    <section id="hero" className="hero-section">
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-lg-8">
            <div className="hero-content">
              <p className="hero-greeting text-accent fade-in-up">
                <span className="terminal-prompt">$</span> ./hello_world.sh
              </p>
              
              <h1 className="hero-title fade-in-up" style={{ animationDelay: '0.2s' }}>
                Hi, I'm <span className="text-accent glitch" data-text={profile.name}>{profile.name}</span>
              </h1>

              <div className="hero-subtitle fade-in-up" style={{ animationDelay: '0.4s' }}>
                <span className="typing-text">{typingText}</span>
                <span className="cursor">|</span>
              </div>
              
              <p className="hero-description fade-in-up" style={{ animationDelay: '0.6s' }}>
                Building practical web apps, backend services, and small experiments.<br />
                Focused on JavaScript, TypeScript, and Python projects.
              </p>
              
              <div className="hero-cta fade-in-up" style={{ animationDelay: '0.8s' }}>
                <a href="#projects" className="btn btn-primary-custom me-3">
                  <i className="bi bi-folder2-open me-2"></i>View Projects
                </a>
                <a href="#terminal" className="btn btn-outline-custom">
                  <i className="bi bi-terminal me-2"></i>Open Terminal
                </a>
              </div>
              
              <div className="hero-stats fade-in-up" style={{ animationDelay: '1s' }}>
                {profile.stats.map((stat, index) => (
                  <StatItem key={index} count={stat.count} label={stat.label} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 d-none d-lg-block">
            <div className="hero-visual fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="hero-model-on-line d-flex align-items-flex-start">
                <HeroModel src={miniModelImage} />
              </div>
              <CodeWindow />
            </div>
          </div>
        </div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
}

function HeroModel({ src }) {
  const figureRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    if (!figureRef.current) {
      return;
    }

    const rect = figureRef.current.getBoundingClientRect();
    const centerX = rect.left + (rect.width / 2);
    const centerY = rect.top + (rect.height / 2);

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    const dodgeRadius = 200;
    const maxShift = 24;

    if (distance > dodgeRadius) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const repelStrength = (1 - (distance / dodgeRadius)) * maxShift;
    const safeDistance = Math.max(distance, 1);

    setOffset({
      x: (-deltaX / safeDistance) * repelStrength,
      y: (-deltaY / safeDistance) * repelStrength
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={figureRef}
      className="hero-model-figure"
      style={{ transform: `translate(${offset.x}px, calc(-100px + ${offset.y}px))` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <img src={src} alt="" className="hero-model-image" />
    </div>
  );
}

function StatItem({ count, label }) {
  const displayCount = useCountUp(count, 2000);
  
  return (
    <div className="stat-item">
      <span className="stat-number">{displayCount}</span>+
      <span className="stat-label">{label}</span>
    </div>
  );
}

function CodeWindow() {
  return (
    <div className="code-window glass-card">
      <div className="code-header">
        <span className="code-dot red"></span>
        <span className="code-dot yellow"></span>
        <span className="code-dot green"></span>
        <span className="code-title">sourav.js</span>
      </div>
      <pre className="code-content">
        <code>
          <span className="code-keyword">const</span> <span className="code-variable">sourav</span> = {'{'}
          {'\n'}  <span className="code-property">model</span>: <span className="code-string">"mini-model.png"</span>,
          {'\n'}  <span className="code-property">role</span>: <span className="code-string">"Full Stack Developer"</span>,
          {'\n'}  <span className="code-property">focus</span>: <span className="code-string">"GitHub projects & real-world apps"</span>,
          {'\n'}  <span className="code-property">coffee</span>: <span className="code-boolean">true</span>,
          {'\n'}  
          {'\n'}  <span className="code-method">code</span>() {'{'}
          {'\n'}    <span className="code-keyword">return</span> <span className="code-string">"Building dreams"</span>;
          {'\n'}  {'}'}
          {'\n'}{'}'};
        </code>
      </pre>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <div className="mouse">
        <div className="wheel"></div>
      </div>
      <span>Scroll Down</span>
    </div>
  );
}

export default Hero;
