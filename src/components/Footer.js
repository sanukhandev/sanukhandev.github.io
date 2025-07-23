import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Coffee } from 'lucide-react';

const Footer = ({ data }) => {
  const socialLinks = [
    { icon: Github, href: data.social.github, label: 'GitHub' },
    { icon: Linkedin, href: data.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: data.social.twitter, label: 'Twitter' },
  ];

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Sanu Khan</h3>
              <p>Full Stack Developer</p>
            </div>
            
            <p className="footer-description">
              Building digital experiences with passion and precision. 
              Always excited to work on challenging projects and learn new technologies.
            </p>
            
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-list">
              <div className="contact-item">
                <MapPin size={18} />
                <span>{data.location}</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <a href={`tel:${data.phone}`}>{data.phone}</a>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="service-list">
              <li>Web Development</li>
              <li>Mobile Apps</li>
              <li>API Development</li>
              <li>Database Design</li>
              <li>System Architecture</li>
              <li>Technical Consulting</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Current Status</h4>
            <div className="status-badge">
              <div className="status-indicator available"></div>
              <span>Available for freelance</span>
            </div>
            
            <p className="availability-text">
              🤔 Open for: Freelance or full-time opportunities
            </p>
            
            <button className="btn-contact">
              <Coffee size={18} />
              Let's grab a coffee!
            </button>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-meta">
            <p>&copy; 2024 Sanu Khan. All rights reserved.</p>
            <p>Made with ❤️ in Dubai</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;