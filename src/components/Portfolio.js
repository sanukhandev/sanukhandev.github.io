import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import TechStack from './TechStack';
import Services from './Services';
import Projects from './Projects';
import Blogs from './Blogs';
import Certifications from './Certifications';
import Testimonials from './Testimonials';
import Footer from './Footer';
import { mockData } from '../data/mock';

const Portfolio = () => {
  const [data] = useState(mockData);

  return (
    <div className="portfolio">
      <Header />
      <Hero data={data.hero} />
      <About data={data.about} />
      <TechStack data={data.techStack} />
      <Services data={data.services} />
      <Projects data={data.projects} />
      <Blogs data={data.blogs} />
      <Certifications data={data.certifications} />
      <Testimonials data={data.testimonials} />
      <Footer data={data.contact} />
    </div>
  );
};

export default Portfolio;