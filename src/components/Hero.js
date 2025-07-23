import React, { useEffect, useState } from 'react';
import { ArrowRight, Code, Coffee } from 'lucide-react';
import {
  SiJava, SiPython, SiPhp, SiJavascript, SiDart, SiCplusplus
} from 'react-icons/si';

const Hero = ({ data = {} }) => {
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
        const delay = 100 + Math.random() * 80;
        timeoutId = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
      }
    };

    typeChar();
    return () => clearTimeout(timeoutId);
  }, [data.title]);

  const fullTitle = data.title || '';
  const dotIndex = fullTitle.indexOf('.');
  const firstLine = dotIndex !== -1 ? fullTitle.slice(0, dotIndex + 1) : fullTitle;
  const secondLine = dotIndex !== -1 ? fullTitle.slice(dotIndex + 1) : '';

  const displayedFirst = typedTitle.slice(0, firstLine.length);
  const displayedSecond = typedTitle.length > firstLine.length
    ? typedTitle.slice(firstLine.length)
    : '';

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
          </h1>
          <p className="hero-subtitle">{data.subtitle}</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{data.stats?.experience || 0}</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">{data.stats?.projects || 0}</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">{data.stats?.clients || 0}</span>
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
          <div className="floating-icons grid grid-cols-3 gap-4">
            <div className="tech-icon java">
              <SiJava size={28} color="#f89820" title="Java" />
            </div>
            <div className="tech-icon python">
              <SiPython size={28} color="#3776ab" title="Python" />
            </div>
            <div className="tech-icon php">
              <SiPhp size={28} color="#777bb3" title="PHP" />
            </div>
            <div className="tech-icon js">
              <SiJavascript size={28} color="#f7df1e" title="JavaScript" />
            </div>
            <div className="tech-icon dart">
              <SiDart size={28} color="#0175c2" title="Dart" />
            </div>
            <div className="tech-icon cpp">
              <SiCplusplus size={28} color="#00599c" title="C++" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
