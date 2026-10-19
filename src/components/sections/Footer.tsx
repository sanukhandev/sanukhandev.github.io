import { memo, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Send } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { Link } from "react-router-dom";

export function Footer() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="border-t border-border/80 bg-background text-foreground pt-16 pb-12 transition-colors duration-200">
      <div className="sk-shell space-y-16">
        {/* Top Split: Bio Statement & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="space-y-4 max-w-lg">
            <p className="text-base sm:text-lg leading-relaxed text-secondary">
              {ar ? (
                <>
                  أركّز على تصميم وبناء نظم موزعة فائقة الموثوقية وتجارب رقمية بديهية تمزج بين{" "}
                  <strong className="text-primary font-semibold">قوة العمارة والأداء المتسارع</strong> لتمكين المنتجات من التوسع بثقة.
                </>
              ) : (
                <>
                  Focused on crafting clean, resilient distributed systems and intuitive experiences that blend architectural rigor and high throughput to{" "}
                  <strong className="text-primary font-semibold">help products scale with confidence</strong>.
                </>
              )}
            </p>
            <div className="pt-2">
              <a
                href="mailto:hello@sanukhan.dev"
                className="font-mono text-sm text-accent hover:underline underline-offset-4 tracking-wide font-medium"
              >
                hello@sanukhan.dev
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3 md:justify-self-end w-full max-w-md">
            <label htmlFor="footer-newsletter" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {ar ? "النشرة البريدية / ملاحظات هندسية" : "Newsletter / Technical Notes"}
            </label>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-12 bg-secondary/15 border border-border ps-4 pe-16 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  aria-label={ar ? "اشتراك" : "Subscribe"}
                  className="absolute inset-inline-end-1 top-1 bottom-1 px-4 bg-primary text-primary-foreground hover:bg-accent hover:text-white transition-colors flex items-center justify-center font-mono text-xs uppercase font-semibold"
                >
                  {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4 rtl:rotate-180" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-accent font-medium">
                  {ar ? "شكراً لاشتراكك! ستصلك التحديثات الهندسية دورياً." : "Thank you for subscribing! You'll receive technical updates."}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Large Watermark Wordmark */}
        <div className="border-t border-b border-border/60 py-6 overflow-hidden">
          <div className="flex items-baseline justify-between select-none">
            <h2 className="sk-video-footer-watermark tracking-tight text-primary">
              Sanu Khan<span className="text-accent text-[0.45em] align-top font-sans">®</span>
            </h2>
            <span className="hidden lg:inline-block font-mono text-xs text-muted-foreground tracking-widest uppercase">
              {ar ? "تصميم النظم والحلول السحابية المتقدمة" : "System Design · Solutions Expert · Cloud Platforms"}
            </span>
          </div>
        </div>

        {/* Bottom Navigation & Socials */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-4">
          <nav className="flex flex-wrap items-center gap-6 text-sm font-medium" aria-label={ar ? "روابط التذييل" : "Footer navigation"}>
            <Link to="/" className="text-secondary hover:text-accent transition-colors">
              {ar ? "الرئيسية" : "Home"}
            </Link>
            <Link to="/about" className="text-secondary hover:text-accent transition-colors">
              {ar ? "نبذة عني" : "About Me"}
            </Link>
            <Link to="/#services" className="text-secondary hover:text-accent transition-colors">
              {ar ? "الخدمات" : "Services"}
            </Link>
            <Link to="/projects" className="text-secondary hover:text-accent transition-colors">
              {ar ? "الأعمال" : "Projects"}
            </Link>
            <Link to="/blog" className="text-secondary hover:text-accent transition-colors">
              {ar ? "الملاحظات" : "Articles"}
            </Link>
            <Link to="/contact" className="text-secondary hover:text-accent transition-colors">
              {ar ? "التواصل" : "Contact"}
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-secondary">
            <a
              href="https://www.linkedin.com/in/sanukhandev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-accent transition-colors"
            >
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/sanukhandev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-accent transition-colors"
            >
              GitHub <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://dev.to/sanukhandev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-accent transition-colors"
            >
              Dev.to <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono pt-4 border-t border-border/40">
          <span>
            {ar ? `© ${new Date().getFullYear()} سانو خان. جميع الحقوق محفوظة.` : `Copyright & Engineering by Sanu Khan · ${new Date().getFullYear()}`}
          </span>
          <span>Dubai, United Arab Emirates</span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
