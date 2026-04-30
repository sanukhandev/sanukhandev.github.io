import * as Icons from "lucide-react";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { footer } from "@/data/siteData";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#2b2f3b] bg-[#16171d]/60">
      <div className="container-narrow py-12">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <a href="#home" aria-label="SanuKhan.dev home">
              <svg
                viewBox="0 0 180 32"
                height="32"
                width="180"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <linearGradient id="footer-logo-grad" x1="-100%" y1="0%" x2="200%" y2="0%" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#38c755" />
                    <stop offset="35%"  stopColor="#38c755" />
                    <stop offset="50%"  stopColor="#b4ffca" />
                    <stop offset="65%"  stopColor="#ffffff" />
                    <stop offset="80%"  stopColor="#38c755" />
                    <stop offset="100%" stopColor="#38c755" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-180 0; 180 0; -180 0"
                      keyTimes="0; 0.5; 1"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                </defs>
                <text
                  x="0" y="24"
                  fontFamily="Montserrat, ui-sans-serif, sans-serif"
                  fontSize="22"
                  fontWeight="800"
                  letterSpacing="-0.5"
                  fill="url(#footer-logo-grad)"
                >
                  Sanu
                </text>
                <text
                  x="57" y="24"
                  fontFamily="Montserrat, ui-sans-serif, sans-serif"
                  fontSize="22"
                  fontWeight="600"
                  letterSpacing="-0.5"
                  fill="url(#footer-logo-grad)"
                >
                  Khan
                </text>
                <text
                  x="116" y="24"
                  fontFamily="Montserrat, ui-sans-serif, sans-serif"
                  fontSize="18"
                  fontWeight="500"
                  fill="#38c755"
                  opacity="0.75"
                >
                  .dev
                </text>
              </svg>
            </a>
            <p className="mt-1 text-[15px] text-[#8a90a8]">{footer.blurb}</p>
          </div>

          <div className="flex gap-4">
            {footer.socials.map((s) => {
              const Icon =
                (
                  Icons as unknown as Record<
                    string,
                    React.ComponentType<{ className?: string }>
                  >
                )[s.icon] || Icons.Link;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all duration-300 hover:scale-[1.02]",
                    s.label === "Buy me a coffee"
                      ? "border-[#38c755]/50 bg-[#38c755]/10 font-semibold text-[#38c755] hover:border-[#38c755] hover:bg-[#38c755]/20"
                      : "border-[#2b2f3b] bg-[#0f1015] text-[#8a90a8] hover:border-[#38c755]/40 hover:text-[#f0f1f4]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-[#2b2f3b] pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-[#8a90a8]">
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${footer.contact.email}`}
              className="inline-flex items-center gap-1 hover:text-[#f0f1f4] transition-colors"
            >
              <Mail className="h-3 w-3" />
              {footer.contact.email}
            </a>
            {footer.contact.phone && (
              <a
                href={`tel:${footer.contact.phone}`}
                className="inline-flex items-center gap-1 hover:text-[#f0f1f4] transition-colors"
              >
                <Phone className="h-3 w-3" />
                {footer.contact.phone}
              </a>
            )}
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {footer.contact.location}
            </span>
          </div>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
