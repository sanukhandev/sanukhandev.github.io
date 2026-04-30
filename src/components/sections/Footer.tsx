import * as Icons from "lucide-react";
import { Mail, MapPin, Zap } from "lucide-react";
import { footer } from "@/data/siteData";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-card/50">
      <div className="container-narrow py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2 font-bold">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-tea-green-500/15 text-tea-green-400">
                <Zap className="h-4 w-4" />
              </span>
              {footer.brand}
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{footer.blurb}</p>
            <div className="mt-4 flex gap-2">
              {footer.socials.map((s) => {
                const Icon =
                  (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ||
                  Icons.Link;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-tea-green-500/40 hover:text-tea-green-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footer.quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-foreground">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footer.servicesLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-foreground">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-tea-green-400" />
                <a href={`mailto:${footer.contact.email}`} className="hover:text-foreground">
                  {footer.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-tea-green-400" />
                {footer.contact.location}
              </li>
            </ul>
            <Button
              asChild
              className="mt-4 bg-tea-green-500 text-jet-black-950 hover:bg-tea-green-400"
            >
              <a href={footer.contact.cta.href}>{footer.contact.cta.label}</a>
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
