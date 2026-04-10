/**
 * Contact Component - Contact Form
 */

import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { profile, contactLinks } from '../data/portfolioData';

function Contact() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">&lt; Contact /&gt;</span>
          <h2 className="section-title">$ ./connect.sh</h2>
          <div className="section-line"></div>
          <p className="section-subtitle">Let's build something amazing together</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div 
              ref={ref}
              className={`contact-wrapper glass-card scroll-reveal ${isVisible ? 'revealed' : ''}`}
            >
              <div className="contact-info-side">
                <h3 className="contact-title">Contact Details</h3>
                <p className="contact-text">
                  Reach out directly using any of the channels below.
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <i className="bi bi-envelope-fill"></i>
                    <span>{profile.email}</span>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>{profile.location}</span>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-clock-fill"></i>
                    <span>Open to collaborations</span>
                  </div>
                </div>
                <div className="social-links">
                  <a href={contactLinks.github} className="social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                    <i className="bi bi-github"></i>
                  </a>
                  <a href={contactLinks.linkedIn} className="social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href={contactLinks.email} className="social-link" aria-label="Email">
                    <i className="bi bi-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
