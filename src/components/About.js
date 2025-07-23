import React from 'react';
import { MapPin, Heart, Coffee, Code2 } from 'lucide-react';

const About = ({ data }) => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <span className="section-badge">Portfolio</span>
          <h2 className="section-title">Hello! I'm Sanu Khan</h2>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              {data.description}
            </p>
            
            <div className="about-highlights">
              <div className="highlight">
                <MapPin size={20} />
                <span>Based in Dubai, UAE</span>
              </div>
              <div className="highlight">
                <Code2 size={20} />
                <span>10+ Years of Coding</span>
              </div>
              <div className="highlight">
                <Heart size={20} />
                <span>Passionate Problem Solver</span>
              </div>
              <div className="highlight">
                <Coffee size={20} />
                <span>Coffee Enthusiast</span>
              </div>
            </div>
            
            <div className="current-focus">
              <h3>🌱 Currently Learning</h3>
              <p>{data.currentLearning}</p>
              
              <h3>🎯 Current Focus</h3>
              <p>{data.currentFocus}</p>
              
              <h3>😄 Fun Fact</h3>
              <p>{data.funFact}</p>
            </div>
          </div>
          
          <div className="about-skills">
            <h3>Core Technologies</h3>
            <div className="skills-grid">
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;