import { memo, useId, type FormEvent } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useSectionData } from "@/lib/i18n";

export interface ContactSectionProps {
  id?: string;
  className?: string;
}

export function ContactSection({ id = "contact", className = "" }: ContactSectionProps) {
  const contact = useSectionData("contact");
  const uniqueId = useId();
  const nameId = `${uniqueId}-name`;
  const emailId = `${uniqueId}-email`;
  const messageId = `${uniqueId}-message`;

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = encodeURIComponent(`${contact.emailSubjectPrefix} ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`);
    window.location.href = `mailto:hello@sanukhan.dev?subject=${subject}&body=${body}`;
  };

  return (
    <section id={id} className={`relative w-full py-20 sm:py-24 md:py-28 ${className}`} aria-label={contact.heading1}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="dark"
          className="relative bg-gradient-to-br from-[#121214] to-[#1c120f] border border-white/15 p-8 sm:p-12 md:p-16 text-white shadow-2xl shadow-black/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        >
          {/* Corner crosshairs for Calm Precision design */}
          <div aria-hidden="true" className="absolute top-3.5 start-4 text-xs font-mono text-white/20 select-none">+</div>
          <div aria-hidden="true" className="absolute top-3.5 end-4 text-xs font-mono text-white/20 select-none">+</div>
          <div aria-hidden="true" className="absolute bottom-3.5 start-4 text-xs font-mono text-white/20 select-none">+</div>
          <div aria-hidden="true" className="absolute bottom-3.5 end-4 text-xs font-mono text-white/20 select-none">+</div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Form */}
            <div className="lg:col-span-6">
              <form aria-label="Quick enquiry" onSubmit={handleContactSubmit} className="space-y-4">
                <div className="mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D5360C] uppercase block mb-1">
                    {contact.boxTitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                    {contact.boxSubtitle}
                  </h3>
                </div>

                <div>
                  <label htmlFor={nameId} className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {contact.nameLabel}
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    placeholder={contact.namePlaceholder}
                    required
                    type="text"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div>
                  <label htmlFor={emailId} className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {contact.emailLabel}
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    placeholder={contact.emailPlaceholder}
                    required
                    type="email"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div>
                  <label htmlFor={messageId} className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {contact.messageLabel}
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    rows={4}
                    placeholder={contact.messagePlaceholder}
                    required
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-between rounded-lg bg-[#D5360C] px-6 py-4 text-xs font-extrabold uppercase tracking-wider !text-white shadow-lg hover:bg-[#AD2A09] active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
                >
                  <span className="!text-white">{contact.submitButton}</span>
                  <span className="text-base rtl:rotate-180 !text-white">↗</span>
                </button>
              </form>
            </div>

            {/* Narrative / Callout */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-[#D5360C] text-sm">✳</span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E6D5BD]">
                  {contact.badge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.02] text-white">
                {contact.heading1}
                <br />
                {contact.heading2}
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                {contact.lead}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="text-[#D5360C]">DIRECT:</span>
                <a href="mailto:hello@sanukhan.dev" className="text-white hover:text-[#D5360C] underline">
                  hello@sanukhan.dev
                </a>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

export default memo(ContactSection);
