import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects = ({ data }) => {
  const [filter, setFilter] = useState('all');
  
  const categories = ['all', 'web', 'mobile', 'fullstack'];
  
  const filteredProjects = filter === 'all' 
    ? data.featured 
    : data.featured.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="section-title">Latest Works</h2>
          <p className="section-subtitle">
            Perfect solutions for digital experience
          </p>
        </div>
        
        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <span className="project-type">{project.category}</span>
                </div>
                <div className="project-overlay">
                  <div className="project-actions">
                    <button className="action-btn">
                      <ExternalLink size={18} />
                    </button>
                    <button className="action-btn">
                      <Github size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-status">
                  <span className={`status ${project.status}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projects-footer">
          <p className="projects-note">
            * Some projects not allow publish for NDA.<br />
            If you want to see more, <a href="#contact" className="contact-link">contact</a>
          </p>
          
          <button className="btn-outline">
            All Projects <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;