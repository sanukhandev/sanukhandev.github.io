import * as Icons from "lucide-react";
import { Mail, Phone, MapPin } from "lucide-react";
import { footer } from "@/data/siteData";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#2b2f3b] bg-[#16171d]/60">
      <div className="container-narrow py-12">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <a
              href="#home"
              className="text-[20px] font-bold tracking-tight text-[#f0f1f4]"
            >
              {footer.brand}
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
                  aria-label={s.label}
                  className="inline-flex items-center gap-2 rounded-md border border-[#2b2f3b] bg-[#0f1015] px-3 py-2 text-sm text-[#8a90a8] transition-all duration-300 hover:scale-[1.02] hover:border-[#38c755]/40 hover:text-[#f0f1f4]"
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
