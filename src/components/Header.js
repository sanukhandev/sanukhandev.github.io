import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <svg
            className="logo-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 520 90"
            role="img"
            aria-label="SanuKhan.dev Logo"
          >
            <title>SanuKhan.dev</title>
            <style>{`.text { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600; letter-spacing: 1px; }`}</style>
            <text x="0" y="60" className="text" fontSize="48" fill="#ffffff">
              SanuKhan<tspan fill="#14b8a6">.</tspan>dev
            </text>
          </svg>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="social-links">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="social-link"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;