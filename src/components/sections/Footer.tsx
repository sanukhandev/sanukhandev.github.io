import { memo } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";
import { SanuKhanLogo } from "@/components/SanuKhanLogo";

export function Footer() {
  const { locale } = useLocale();
  const ar = locale === "ar";

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
            <p>
              {ar ? (
                <>
                  بناء منصات رقمية مرنة،
                  <br />
                  وربط الأنظمة ومساعدة الفرق
                  <br />
                  على تسليم ما يهم.
                </>
              ) : (
                <>
                  Building resilient digital platforms,
                  <br />
                  connecting systems and helping teams
                  <br />
                  ship what matters.
                </>
              )}
            </p>
            <b className="tiny">{ar ? "دبي، الإمارات العربية المتحدة" : "Dubai, United Arab Emirates"}</b>
            <p style={{ marginTop: "12px" }}>
              <a href="mailto:hello@sanukhan.dev" style={{ display: "inline" }}>
                hello@sanukhan.dev
              </a>
            </p>
          </div>

          <div>
            <h4>{ar ? "التنقل" : "NAVIGATION"}</h4>
            <Link to="/">{ar ? "الرئيسية" : "Home"}</Link>
            <Link to="/about">{ar ? "نبذة عني" : "About"}</Link>
            <Link to="/services">{ar ? "الخدمات" : "Services"}</Link>
            <Link to="/projects">{ar ? "المشاريع" : "Projects"}</Link>
            <Link to="/blog">{ar ? "المقالات" : "Articles"}</Link>
            <Link to="/contact">{ar ? "تواصل" : "Contact"}</Link>
          </div>

          <div>
            <h4>{ar ? "تابعني" : "FOLLOW"}</h4>
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
            <h4>{ar ? "النشرة / التواصل" : "NEWSLETTER / CONNECT"}</h4>
            <p>
              {ar
                ? "تابع الملاحظات المعمارية وأنماط التكامل والدروس الهندسية."
                : "Follow architecture notes, integration patterns and engineering lessons."}
            </p>
            <a className="button dark" href="mailto:hello@sanukhan.dev" style={{ marginTop: "14px" }}>
              {ar ? "لنتواصل" : "LET'S CONNECT"} <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </footer>

      <div className="copyright">
        © 2026 SANU KHAN — {ar ? "هندسة تصنع الفارق" : "ENGINEERED WITH PURPOSE"}
      </div>
    </>
  );
}

export default memo(Footer);
