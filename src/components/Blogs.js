import React, { useState } from 'react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

const Blogs = ({ data }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedBlogs = showAll ? data : data.slice(0, 6);

  return (
    <section className="blogs">
      <div className="blogs-container">
        <div className="blogs-header">
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">
            Sharing knowledge and insights about modern development
          </p>
        </div>
        
        <div className="blogs-grid">
          {displayedBlogs.map((blog, index) => (
            <article key={index} className="blog-card">
              <div className="blog-header">
                <div className="blog-meta">
                  <span className="blog-platform">{blog.platform}</span>
                  <div className="blog-date">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                  </div>
                </div>
                <a href={blog.url} className="blog-link" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} />
                </a>
              </div>
              
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.description}</p>
                
                <div className="blog-tags">
                  {blog.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="blog-tag">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="blog-footer">
                <a href={blog.url} className="read-more" target="_blank" rel="noopener noreferrer">
                  Read Article →
                </a>
              </div>
            </article>
          ))}
        </div>
        
        {data.length > 6 && (
          <div className="blogs-footer">
            <button 
              className="btn-outline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show All ${data.length} Articles`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;