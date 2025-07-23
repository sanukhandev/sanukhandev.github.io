import React, { useEffect, useState } from 'react';
import { ArrowRight, Code, Coffee } from 'lucide-react';

const Hero = ({ data }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!data.title) return;
    let i = 0;
    setTypedTitle('');
    setIsTyping(true);
    let timeoutId;
    const typeChar = () => {
      if (i < data.title.length) {
        setTypedTitle((prev) => prev + data.title[i]);
        i++;
        // Add a small random delay between 70ms and 150ms
        const delay = 70 + Math.random() * 80;
        timeoutId = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
      }
    };
    typeChar();
    return () => clearTimeout(timeoutId);
  }, [data.title]);

  // Split at the dot for line break
  const dotIndex = data.title ? data.title.indexOf('.') : -1;
  const firstLine = dotIndex !== -1 ? data.title.slice(0, dotIndex + 1) : data.title || '';
  const secondLine = dotIndex !== -1 ? data.title.slice(dotIndex + 1) : '';
  const displayedFirst = typedTitle.slice(0, Math.min(typedTitle.length, firstLine.length));
  const displayedSecond = typedTitle.length > firstLine.length ? typedTitle.slice(firstLine.length) : '';

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Code size={16} />
            <span>Full Stack Developer</span>
          </div>
          <h1 className="hero-title typewriter">
            {displayedFirst}
            {firstLine && typedTitle.length >= firstLine.length && <br />}
            {displayedSecond}
            {isTyping && <span className="typewriter-cursor">|</span>}
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