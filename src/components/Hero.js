import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Code as CodeIcon,
  Coffee,
  Database,
  Globe,
  Smartphone,
  Server,
  Terminal,
  Pin,
} from 'lucide-react';

// Blinking badge CSS as a string (single declaration)
const BLINK_BADGE_CSS = `
.blink-badge {
  animation: blink-badge 1.2s steps(2, start) infinite;
}
@keyframes blink-badge {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
`;

const Hero = ({ data = {} }) => {
  // Inject blinking badge style once on mount (browser only)
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('blink-badge-style')) {
      const style = document.createElement('style');
      style.id = 'blink-badge-style';
      style.innerHTML = BLINK_BADGE_CSS;
      document.head.appendChild(style);
    }
  }, []);

  // Typewriter state
  const [typedTitle, setTypedTitle] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullTitle = data.title || '';
  const dotIndex = fullTitle.indexOf('.');
  const firstLine = dotIndex !== -1 ? fullTitle.slice(0, dotIndex + 1) : fullTitle;
  const secondLine = dotIndex !== -1 ? fullTitle.slice(dotIndex + 1).trim() : '';

  useEffect(() => {
    if (!fullTitle) return;

    setTypedTitle('');
    setIsTyping(true);

    let i = 0;
    let timeoutId;

    const typeChar = () => {
      if (i <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, i));
        i++;
        timeoutId = setTimeout(typeChar, 60 + Math.random() * 30);
      } else {
        setIsTyping(false);
      }
    };

    typeChar();
    return () => clearTimeout(timeoutId);
  }, [fullTitle]);

  const displayedFirst = typedTitle.slice(0, firstLine.length);
  const displayedSecond = typedTitle.length > firstLine.length ? typedTitle.slice(firstLine.length) : '';

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Pin size={16} />
            <span>Dubai, UAE • Available for Opportunities</span>
          </div>

          <h1 className="hero-title typewriter">
            {displayedFirst}
            {firstLine && typedTitle.length >= firstLine.length && <br />}
            {displayedSecond}
          </h1>

          {data.subtitle && <p className="hero-subtitle">{data.subtitle}</p>}

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{data.stats?.experience ?? '0'}</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">{data.stats?.projects ?? '0'}</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">{data.stats?.clients ?? '0'}</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>

          <div className="hero-actions">
            <button className="btn-primary">
              Let&apos;s Chat! <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">
              <Coffee size={18} />
              Buy me coffee
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-container">
            <img
              src="/assets/images/sanu.png"
              alt="Sanu Khan - Full Stack Developer"
              className="profile-image"
            />
          </div>

          <div className="floating-icons">
            {/* Back layer - blurred and behind image */}
            <div className="tech-icon back-layer large java">
              <Server size={36} title="Java" />
            </div>
            <div className="tech-icon back-layer large python">
              <Database size={36} title="Python" />
            </div>
            <div className="tech-icon back-layer medium php">
              <Globe size={32} title="PHP" />
            </div>
            <div className="tech-icon back-layer medium dart">
              <Smartphone size={32} title="Dart/Flutter" />
            </div>

            {/* Front layer - small and sharp, in front of image */}
            <div className="tech-icon front-layer small js">
              <CodeIcon size={20} title="JavaScript" />
            </div>
            <div className="tech-icon front-layer small cpp">
              <Terminal size={20} title="C/C++" />
            </div>
            <div className="tech-icon front-layer small typescript">
              <CodeIcon size={20} title="TypeScript" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
