import { memo } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { BrandIdentity } from "@/components/BrandIdentity";
import { useLocale } from "@/hooks/use-locale";

export function Footer() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const join = (isAr: boolean, en: string, arabic: string) => (isAr ? arabic : en);

  return (
    <footer className="sk-footer">
      <div className="sk-shell sk-footer__grid">
        <div>
          <a href="/#home">
            <BrandIdentity />
          </a>
          <p>
            {join(
              ar,
              "Tech Lead · Solution Expert | Dubai, UAE",
              "قائد تقني · خبير حلول | دبي، الإمارات",
            )}
          </p>
        </div>
        <nav aria-label={join(ar, "Footer navigation", "روابط التذييل")}>
          <a href="/#architecture">{join(ar, "Capabilities", "القدرات")}</a>
          <a href="/#work">{join(ar, "Work", "الأعمال")}</a>
          <a href="/#writing">{join(ar, "Notes", "الملاحظات")}</a>
          <a href="/about">{join(ar, "About", "عني")}</a>
        </nav>
        <div className="sk-footer__links">
          <a
            href="https://github.com/sanukhandev"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/sanukhandev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a href="mailto:hello@sanukhan.dev">
            <Mail size={14} aria-hidden="true" /> {join(ar, "Email", "البريد الإلكتروني")}
          </a>
        </div>
      </div>
      <div className="sk-shell sk-footer__bottom">
        <span>© {new Date().getFullYear()} Sanu Khan.</span>
        <span>
          <MapPin size={12} aria-hidden="true" /> Dubai, UAE
        </span>
      </div>
    </footer>
  );
}

export default memo(Footer);
