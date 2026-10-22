import { memo } from "react";
import { Link } from "react-router-dom";
import { SanuKhanLogo } from "@/components/SanuKhanLogo";
import { useSectionData } from "@/lib/i18n";

export function Footer() {
  const footer = useSectionData("footer");
  const nav = useSectionData("nav");

  return (
    <>
      <footer className="footer shell">
        <div className="footgrid">
          <div>
            <div className="mb-5">
              <Link to="/" aria-label="SanuKhan.dev" className="inline-block transition-opacity hover:opacity-90">
                <SanuKhanLogo />
              </Link>
            </div>
            <p className="whitespace-pre-line">
              {footer.mission}
            </p>
            <b className="tiny">{footer.location}</b>
            <p style={{ marginTop: "12px" }}>
              <a href={`mailto:${footer.email}`} style={{ display: "inline" }}>
                {footer.email}
              </a>
            </p>
          </div>

          <div>
            <h4>{footer.navTitle}</h4>
            <Link to="/">{nav.home}</Link>
            <Link to="/about">{nav.about}</Link>
            <Link to="/services">{nav.services}</Link>
            <Link to="/projects">{nav.projects}</Link>
            <Link to="/blog">{nav.blogs || nav.notes}</Link>
            <Link to="/contact">{nav.contact}</Link>
          </div>

          <div>
            <h4>{footer.followTitle}</h4>
            <a href="https://github.com/sanukhandev" rel="noopener noreferrer" target="_blank">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/sanukhandev/" rel="noopener noreferrer" target="_blank">
              LinkedIn ↗
            </a>
            <a href="https://dev.to/sanukhandev" rel="noopener noreferrer" target="_blank">
              DEV.to ↗
            </a>
          </div>

          <div>
            <h4>{footer.newsletterTitle}</h4>
            <p>{footer.newsletterText}</p>
            <a className="button dark" href={`mailto:${footer.email}`} style={{ marginTop: "14px" }}>
              {footer.connectButton} <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </footer>

      <div className="copyright">
        {footer.copyright}
      </div>
    </>
  );
}

export default memo(Footer);
