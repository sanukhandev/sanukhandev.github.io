import React from 'react';
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Server, 
  Terminal,
  Cloud,
  GitBranch,
  Layers,
  FileCode,
  Zap,
  Box
} from 'lucide-react';

const TechStack = ({ data }) => {
  // Icon mapping for technologies using only Lucide React icons
  const getIcon = (techName) => {
    switch(techName) {
      case 'JavaScript': return <Zap />;
      case 'React': return <Code />;
      case 'Node.js': return <Server />;
      case 'PHP': return <Globe />;
      case 'Python': return <Terminal />;
      case 'Java': return <FileCode />;
      case 'Flutter': return <Smartphone />;
      case 'MongoDB': return <Database />;
      case 'MySQL': return <Database />;
      case 'Docker': return <Box />;
      case 'AWS': return <Cloud />;
      case 'Git': return <GitBranch />;
      default: return <Code />;
    }
  };

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
                  {getIcon(tech.name)}
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