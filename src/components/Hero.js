import React, { useEffect, useState } from 'react';
import { ArrowRight, Code, Coffee } from 'lucide-react';

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
          <div className="floating-icons">
            {/* Java */}
            <div className="tech-icon java">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 2C8.268 2 2 8.268 2 16c0 7.732 6.268 14 14 14s14-6.268 14-14C30 8.268 23.732 2 16 2zm0 26c-6.627 0-12-5.373-12-12S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" fill="#f89820" /><path d="M20.5 22.5c-1.5 1-5.5 1-7 0-.5-.5 1.5-1.5 3.5-1.5s4 .5 3.5 1.5z" fill="#f89820" /><path d="M16 8c-2.5 0-4.5 2-4.5 4.5 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5C20.5 10 18.5 8 16 8z" fill="#f89820" /></svg>
            </div>
            {/* Python */}
            <div className="tech-icon python">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 4c-4.418 0-8 3.582-8 8v4h8V8h8V4h-8z" fill="#3776ab" /><path d="M16 28c4.418 0 8-3.582 8-8v-4h-8v8h-8v4h8z" fill="#ffd43b" /></svg>
            </div>
            {/* PHP */}
            <div className="tech-icon php">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="14" ry="10" fill="#777bb3" /><text x="16" y="21" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial">PHP</text></svg>
            </div>
            {/* JavaScript */}
            <div className="tech-icon js">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#f7df1e" /><text x="16" y="21" textAnchor="middle" fontSize="10" fill="#000" fontFamily="Arial">JS</text></svg>
            </div>
            {/* Dart */}
            <div className="tech-icon dart">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#0175c2" /><text x="16" y="21" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial">Dart</text></svg>
            </div>
            {/* C++ */}
            <div className="tech-icon cpp">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#00599c" /><text x="16" y="21" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial">C++</text></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
