/**
 * Skills Component - Animated Progress Bars
 */

import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const skillCategories = [
  {
    title: 'Frontend & UI',
    icon: 'bi-code-slash',
    skills: [
      { name: 'HTML5 / CSS3 / SASS', progress: 95 },
      { name: 'JavaScript / TypeScript', progress: 90 },
      { name: 'React / Component Design', progress: 88 },
      { name: 'Bootstrap / Responsive Layouts', progress: 92 }
    ]
  },
  {
    title: 'Backend & APIs',
    icon: 'bi-server',
    skills: [
      { name: 'Node.js / Express', progress: 90 },
      { name: 'Python / FastAPI', progress: 85 },
      { name: 'REST API Design', progress: 87 },
      { name: 'JSON / File Handling', progress: 84 }
    ]
  },
  {
    title: 'Security & Productivity',
    icon: 'bi-shield-lock',
    skills: [
      { name: 'Authentication / Access Control', progress: 78 },
      { name: 'Security-focused UI', progress: 76 },
      { name: 'File Utilities / CSV Workflows', progress: 84 },
      { name: 'Deployment / Hosting', progress: 82 }
    ]
  },
  {
    title: 'Tools & Workflow',
    icon: 'bi-tools',
    skills: [
      { name: 'Git / GitHub', progress: 95 },
      { name: 'Vercel / Deployment', progress: 84 },
      { name: 'Linux / Shell Basics', progress: 88 },
      { name: 'Debugging / Refactoring', progress: 86 }
    ]
  }
];

function Skills() {
  return (
    <section id="skills" className="skills-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">&lt; Skills /&gt;</span>
          <h2 className="section-title">$ cat skills.json</h2>
          <div className="section-line"></div>
        </div>

        <div className="row">
          {skillCategories.map((category, index) => (
            <div className="col-lg-6 mb-5" key={index}>
              <SkillCategory category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategory({ category }) {
  const [ref, isVisible] = useScrollReveal(0.3);

  return (
    <div ref={ref} className={`skill-category glass-card scroll-reveal ${isVisible ? 'revealed' : ''}`}>
      <h3 className="category-title">
        <i className={`bi ${category.icon} text-accent`}></i> {category.title}
      </h3>
      <div className="skills-list">
        {category.skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} isVisible={isVisible} delay={index * 100} />
        ))}
      </div>
    </div>
  );
}

function SkillItem({ skill, isVisible, delay }) {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percent">{skill.progress}%</span>
      </div>
      <div className="skill-bar">
        <div
          className={`skill-progress ${isVisible ? 'animated' : ''}`}
          style={{
            '--progress-width': `${skill.progress}%`,
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );
}

export default Skills;
