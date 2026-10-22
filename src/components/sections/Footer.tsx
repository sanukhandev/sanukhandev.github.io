import { memo } from "react";
import { Link } from "react-router-dom";
import { SanuKhanLogo } from "@/components/SanuKhanLogo";
import { useSectionData } from "@/lib/i18n";

export function Footer() {
  const footer = useSectionData("footer");
  const nav = useSectionData("nav");

  return (
    <footer className="footer w-full bg-[#EAE5DC] dark:bg-[#121215] text-[#141413] dark:text-[#FAFAFA] !mt-16 sm:!mt-24 !pt-16 sm:!pt-20 !pb-12 transition-colors">
      <div className="shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <a
              href={`mailto:${footer.email}`}
              className="group inline-flex items-center justify-between gap-3 mt-3.5 px-4 py-2.5 rounded-lg bg-[#D5360C] hover:bg-[#AD2A09] !text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C] focus-visible:ring-offset-2"
            >
              <span className="!text-white">{footer.connectButton}</span>
              <span
                className="inline-grid place-items-center w-5 h-5 rounded bg-white/20 !text-white text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        <div className="copyright font-mono text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between pt-8 mt-4">
          <span>{footer.copyright}</span>
          <span className="text-[10.5px] text-zinc-400 mt-2 sm:mt-0 tracking-wider">
            25.2048° N, 55.2708° E · DUBAI // GCC
          </span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
