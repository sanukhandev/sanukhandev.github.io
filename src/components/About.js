import React, { useEffect, useState } from 'react';
import { MapPin, Heart, Coffee, Code2 } from 'lucide-react';

// Phrases shown in the typewriter
const PHRASES = [
  'A Passionate Developer',
  'AI/ML Enthusiast',
  'Web3 Dev',
  'DevOps Mastery',
  'Problem Solver',
];

// Optional cursor blink CSS injected once (safe for SSR)
const CURSOR_CSS = `
.typewriter-cursor {
  display: inline-block;
  width: 1ch;
  animation: tw-blink 1s steps(2, start) infinite;
}
@keyframes tw-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

const About = ({ data = {} }) => {
  // Inject cursor CSS once on mount (browser only)
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('tw-cursor-style')) {
      const style = document.createElement('style');
      style.id = 'tw-cursor-style';
      style.innerHTML = CURSOR_CSS;
      document.head.appendChild(style);
    }
  }, []);

  // Typewriter state
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let timeout;

    // Type or delete
    if (!isDeleting && charIndex <= current.length) {
      setTypedText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex > current.length) {
      // Pause when fully typed
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && charIndex >= 0) {
      setTypedText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex < 0) {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  // Safe fallbacks
  const years =
    data?.stats?.experience ??
    data?.yearsOfCoding ??
    '10+';

  const skills = Array.isArray(data?.skills) ? data.skills : [];

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <span className="section-badge">You’re here for</span>
          <h2 className="section-title typewriter" aria-live="polite">
            {typedText}
            <span className="typewriter-cursor">|</span>
          </h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            {data?.description && (
              <p className="about-description">{data.description}</p>
            )}

            <div className="about-highlights">
              <div className="highlight">
                <MapPin size={20} />
                <span>Based in Dubai, UAE</span>
              </div>
              <div className="highlight">
                <Code2 size={20} />
                <span>{years} Years of Coding</span>
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
              <p>{data?.currentLearning || 'Exploring advanced AI/ML workflows and modern cloud architectures.'}</p>

              <h3>🎯 Current Focus</h3>
              <p>{data?.currentFocus || 'Building scalable, secure, multi-tenant apps with clean DevOps pipelines.'}</p>

              <h3>😄 Fun Fact</h3>
              <p>{data?.funFact || 'I tweak my dotfiles way more than I should.'}</p>
            </div>
          </div>

          <div className="about-skills">
            <h3>Core Technologies</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => {
                const name = typeof skill === 'string' ? skill : skill?.name || `Skill ${index + 1}`;
                const level = typeof skill === 'object' && skill?.level != null ? skill.level : 80;
                return (
                  <div key={name + index} className="skill-item">
                    <span className="skill-name">{name}</span>
                    <div className="skill-bar" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
                      <div className="skill-progress" style={{ width: `${Math.min(Math.max(level, 0), 100)}%` }} />
                    </div>
                  </div>
                );
              })}
              {skills.length === 0 && (
                <p className="text-muted">Add your skills to see them here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
