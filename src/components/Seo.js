import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ title, description, keywords, image, url }) => (
    <Helmet>
        <title>{title || "Sanu Khan | Portfolio"}</title>
        <meta name="description" content={description || "Personal portfolio of Sanu K."} />
        <meta name="keywords" content={keywords || "Sanu Khan, portfolio, web developer, fullstack, projects, resume, JavaScript, React, Node.js, personal website"} />
        <meta name="author" content="Sanu Khan" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={title || "Sanu Khan | Portfolio"} />
        <meta property="og:description" content={description || "Explore the personal portfolio of Sanu Khan, a passionate fullstack web developer. View projects, skills, and contact information."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url || "https://sanukhandev.github.io/sanu-new-portfolio/"} />
        <meta property="og:image" content={image || "https://sanukhandev.github.io/sanu-new-portfolio/og-image.png"} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || "Sanu Khan | Portfolio"} />
        <meta name="twitter:description" content={description || "Explore the personal portfolio of Sanu Khan, a passionate fullstack web developer. View projects, skills, and contact information."} />
        <meta name="twitter:image" content={image || "https://sanukhandev.github.io/sanu-new-portfolio/og-image.png"} />
        <link rel="canonical" href={url || "https://sanukhandev.github.io/sanu-new-portfolio/"} />
    </Helmet>
);

export default Seo;
