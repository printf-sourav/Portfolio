/**
 * About Component - Terminal Output Style
 */

import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { profile } from '../data/portfolioData';

function About() {
  const [terminalRef, terminalVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">&lt; About Me /&gt;</span>
          <h2 className="section-title">$ whoami</h2>
          <div className="section-line"></div>
        </div>

        <div className="row align-items-center">
          {/* Terminal Output Side */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div 
              ref={terminalRef}
              className={`terminal-window glass-card scroll-reveal ${terminalVisible ? 'revealed' : ''}`}
            >
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">bash ~ whoami</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="prompt">visitor@portfolio:~$</span> whoami
                </div>
                <div className="terminal-output">
                  <p className="output-text">{profile.name} — {profile.tagline}</p>
                </div>
                <div className="terminal-line">
                  <span className="prompt">visitor@portfolio:~$</span> cat about.txt
                </div>
                <div className="terminal-output">
                  <p className="output-text">
                    → Builds JavaScript, TypeScript, and Python projects<br />
                    → Works on full stack apps, backend APIs, and security-focused tools<br />
                    → Maintains 10 public repositories on GitHub<br />
                    → Likes clean UI, practical features, and simple workflows<br />
                    → Open to collaborations and new project ideas
                  </p>
                </div>
                <div className="terminal-line">
                  <span className="prompt">visitor@portfolio:~$</span> ls interests/
                </div>
                <div className="terminal-output">
                  <span className="folder">JavaScript/</span>
                  <span className="folder">TypeScript/</span>
                  <span className="folder">Python/</span>
                  <span className="folder">Security/</span>
                  <span className="file">projects.json</span>
                  <span className="file">build.sh</span>
                </div>
                <div className="terminal-line active">
                  <span className="prompt">visitor@portfolio:~$</span>
                  <span className="cursor-blink">█</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="col-lg-6">
            <div 
              ref={contentRef}
              className={`about-content scroll-reveal ${contentVisible ? 'revealed' : ''}`}
            >
              <h3 className="about-title">
                Turning <span className="text-accent">GitHub repos</span> into a portfolio
              </h3>
              <p className="about-text">
                I'm Sourav Kumar Sahu, and this portfolio is built around my public GitHub work.
                It highlights the projects I have already shipped, from full stack apps to small experiments and forks.
              </p>
              <p className="about-text">
                My focus is on practical applications, readable code, and fast iteration.
                I work mainly with JavaScript, TypeScript, and Python while learning from every project I publish.
              </p>

              <div className="about-details">
                <div className="detail-item">
                  <i className="bi bi-geo-alt-fill text-accent"></i>
                  <span>Location: <strong>{profile.location}</strong></span>
                </div>
                <div className="detail-item">
                  <i className="bi bi-envelope-fill text-accent"></i>
                  <span>Email: <strong>{profile.email}</strong></span>
                </div>
                <div className="detail-item">
                  <i className="bi bi-briefcase-fill text-accent"></i>
                  <span>Status: <strong className="text-success">Open to collaborations</strong></span>
                </div>
              </div>

              <a href="#contact" className="btn btn-primary-custom mt-4">
                <i className="bi bi-send me-2"></i>Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
