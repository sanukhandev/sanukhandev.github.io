import React from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const Certifications = ({ data }) => {
  return (
    <section className="certifications">
      <div className="certifications-container">
        <div className="certifications-header">
          <h2 className="section-title">Licenses & Certifications</h2>
          <p className="section-subtitle">
            Professional certifications and achievements
          </p>
        </div>
        
        <div className="certifications-grid">
          {data.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="cert-header">
                <div className="cert-logo">
                  <span className="cert-icon">{cert.logo}</span>
                </div>
                <div className="cert-issuer">
                  <span className="issuer-name">{cert.issuer}</span>
                </div>
              </div>
              
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                
                <div className="cert-meta">
                  <div className="cert-date">
                    <Calendar size={14} />
                    <span>Issued {cert.date}</span>
                  </div>
                  
                  <div className="cert-credential">
                    <Award size={14} />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                </div>
              </div>
              
              <div className="cert-footer">
                <a 
                  href={cert.url} 
                  className="cert-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Show Credential
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="certifications-stats">
          <div className="stat-item">
            <span className="stat-number">{data.length}</span>
            <span className="stat-label">Certifications</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {data.filter(cert => cert.issuer === 'HackerRank').length}
            </span>
            <span className="stat-label">HackerRank</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {new Date().getFullYear() - Math.min(...data.map(cert => parseInt(cert.date.split(' ')[1])))}+
            </span>
            <span className="stat-label">Years Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;