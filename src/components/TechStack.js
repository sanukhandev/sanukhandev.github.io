import React from 'react';

const TechStack = ({ data }) => {
  return (
    <section className="tech-stack">
      <div className="tech-stack-container">
        <div className="tech-stack-header">
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle">
            Technologies I work with daily
          </p>
        </div>
        
        <div className="tech-grid">
          {data.map((tech, index) => (
            <div key={index} className="tech-item">
              <div className="tech-icon-wrapper">
                <span className="tech-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </span>
              </div>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;