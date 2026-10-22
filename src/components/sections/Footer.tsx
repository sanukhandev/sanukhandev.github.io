import { memo } from "react";
import { Link } from "react-router-dom";
import { SanuKhanLogo } from "@/components/SanuKhanLogo";
import { LiveTelemetryBar } from "@/components/LiveTelemetryBar";
import { useSectionData } from "@/lib/i18n";

export function Footer() {
  const footer = useSectionData("footer");
  const nav = useSectionData("nav");

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto border-t border-[#E6E4DD] dark:border-white/[0.08] pt-12 sm:pt-16">
        <footer className="footer shell !mt-0 !pt-0 pb-12">
        <div className="footgrid">
          <div>
            <div className="mb-5">
              <Link to="/" aria-label="SanuKhan.dev" className="inline-block transition-opacity hover:opacity-90">
                <SanuKhanLogo />
              </Link>
            </div>
            <p className="whitespace-pre-line text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              {footer.mission}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <b className="tiny font-mono uppercase text-xs text-zinc-500 dark:text-zinc-400 tracking-wider">
                {footer.location}
              </b>
            </div>
            <p style={{ marginTop: "12px" }}>
              <a
                href={`mailto:${footer.email}`}
                className="font-mono text-xs font-semibold text-[#D5360C] hover:underline"
              >
                {footer.email}
              </a>
            </p>

            <div className="mt-5">
              <LiveTelemetryBar />
            </div>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-wider text-xs">{footer.navTitle}</h4>
            <Link to="/">{nav.home}</Link>
            <Link to="/about">{nav.about}</Link>
            <Link to="/services">{nav.services}</Link>
            <Link to="/projects">{nav.projects}</Link>
            <Link to="/blog">{nav.blogs || nav.notes}</Link>
            <Link to="/contact">{nav.contact}</Link>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-wider text-xs">{footer.followTitle}</h4>
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
            <h4 className="font-mono uppercase tracking-wider text-xs">{footer.newsletterTitle}</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{footer.newsletterText}</p>
            <a className="button dark font-mono text-xs" href={`mailto:${footer.email}`} style={{ marginTop: "14px" }}>
              {footer.connectButton} <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </footer>

      <div className="copyright font-mono text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between px-2 sm:px-6 py-5 border-t border-black/5 dark:border-white/5">
        <span>{footer.copyright}</span>
        <span className="text-[10.5px] text-zinc-400 mt-2 sm:mt-0 tracking-wider">
          25.2048° N, 55.2708° E · DUBAI // GCC
        </span>
      </div>
    </div>
  </div>
  );
}

export default memo(Footer);
