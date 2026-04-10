/**
 * Footer Component
 */

import React from 'react';
import { profile } from '../data/portfolioData';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="footer-text">
              <span className="text-accent">&lt;/&gt;</span> with <span className="text-danger">❤</span> by {profile.name}
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="footer-text">
              <span className="text-accent">$</span> echo "© 2026 printf-sourav"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
