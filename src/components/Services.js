import React from 'react';
import { Code, Smartphone, Database, Shield, Palette, Search } from 'lucide-react';

const Services = ({ data }) => {
  const iconMap = {
    'Code': Code,
    'Smartphone': Smartphone,
    'Database': Database,
    'Shield': Shield,
    'Palette': Palette,
    'Search': Search
  };

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="section-title">Services & Expertise</h2>
          <p className="section-subtitle">
            Comprehensive development solutions for your digital needs
          </p>
        </div>
        
        <div className="services-grid">
          {data.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <IconComponent size={32} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-technologies">
                  {service.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="service-projects">
                  <span className="projects-count">{service.projectsCount} Projects</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;