import React from 'react';
import { ArrowRight, Code, Coffee } from 'lucide-react';

const Hero = ({ data }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Code size={16} />
            <span>Full Stack Developer</span>
          </div>
          
          <h1 className="hero-title">
            {data.title}
          </h1>
          
          <p className="hero-subtitle">
            {data.subtitle}
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{data.stats.experience}</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">{data.stats.projects}</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">{data.stats.clients}</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
          
          <div className="hero-actions">
            <button className="btn-primary">
              Let's Chat! <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">
              <Coffee size={18} />
              Buy me coffee
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="image-placeholder">
            <div className="avatar">
              <span>SK</span>
            </div>
          </div>
          
          <div className="floating-icons">
            <div className="tech-icon react">⚛️</div>
            <div className="tech-icon node">🟢</div>
            <div className="tech-icon php">🐘</div>
            <div className="tech-icon js">⚡</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;