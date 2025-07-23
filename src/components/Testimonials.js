import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = ({ data }) => {
  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">
            What clients say about me
          </p>
        </div>
        
        <div className="testimonials-grid">
          {data.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`star ${i < testimonial.rating ? 'filled' : ''}`}
                    />
                  ))}
                </div>
                <span className="rating-text">{testimonial.rating}.0 Rating</span>
              </div>
              
              <div className="testimonial-content">
                <Quote size={24} className="quote-icon" />
                <p className="testimonial-text">
                  {testimonial.text}
                </p>
              </div>
              
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>{testimonial.author.charAt(0)}</span>
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.author}</h4>
                  <p className="author-title">{testimonial.position}</p>
                  <p className="author-company">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;