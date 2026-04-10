/**
 * Projects Component - Modern Cards with Hover Effects
 */

import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { projects } from '../data/portfolioData';

function Projects() {
  return (
    <section id="projects" className="projects-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">&lt; Projects /&gt;</span>
          <h2 className="section-title">$ ls ~/projects</h2>
          <div className="section-line"></div>
        </div>

        <div className="row">
          {projects.map((project, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a href="https://github.com/printf-sourav" className="btn btn-outline-custom" target="_blank" rel="noreferrer">
            <i className="bi bi-github me-2"></i>View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div ref={ref} className={`project-card glass-card scroll-reveal ${isVisible ? 'revealed' : ''}`}>
      <div className="project-image">
        <div className="image-placeholder">
          <i className={`bi ${project.icon}`}></i>
        </div>
        <div className="project-overlay">
          {project.demoUrl && (
            <a href={project.demoUrl} className="project-link" aria-label="View Live Demo" target="_blank" rel="noreferrer">
              <i className="bi bi-box-arrow-up-right"></i>
            </a>
          )}
          <a href={project.repoUrl} className="project-link" aria-label="View Code" target="_blank" rel="noreferrer">
            <i className="bi bi-github"></i>
          </a>
        </div>
      </div>
      <div className="project-content">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tech.map((tech, index) => (
            <span className="tech-badge" key={index}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
