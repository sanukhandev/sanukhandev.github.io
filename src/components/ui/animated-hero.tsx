import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedHeroProps {
  badgeText: string;
  badgeHref?: string;
  badgeTarget?: "_self" | "_blank";
  titlePrefix: string;
  brandText?: string;
  titleWords: string[];
  description: string;
  detailPills?: string[];
  richTextLines?: string[];
  referenceLabel?: string;
  referenceHref?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
}

function Hero({
  badgeText,
  badgeHref = "#",
  badgeTarget = "_self",
  titlePrefix,
  brandText,
  titleWords,
  description,
  detailPills = [],
  richTextLines = [],
  referenceLabel,
  referenceHref,
  primaryCtaLabel,
  primaryCtaHref = "#",
  secondaryCtaLabel,
  secondaryCtaHref = "#",
  className,
}: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => (titleWords.length ? titleWords : ["amazing", "new", "wonderful", "beautiful", "smart"]),
    [titleWords],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className={cn("w-full", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-5 py-8 lg:py-12">
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-3 border border-default bg-background/90 text-primary hover:bg-background"
              asChild
            >
              <a
                href={badgeHref}
                target={badgeTarget}
                rel={badgeTarget === "_blank" ? "noopener noreferrer" : undefined}
              >
                {badgeText} <MoveRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-display text-4xl md:text-6xl max-w-3xl tracking-tight text-center font-semibold leading-tight">
              <span className="text-primary">{titlePrefix}</span>
              {brandText ? (
                <span className="brand-zaakiy mt-2 block text-accent">
                  {brandText}
                </span>
              ) : null}
              <span className="relative flex w-full justify-center overflow-hidden text-center min-h-[1.2em] md:pb-2 md:pt-1">
                {titles.map((title, index) => (
                  <motion.span
                    key={`${title}-${index}`}
                    className="absolute text-accent"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-center text-base leading-relaxed tracking-tight text-secondary md:text-[1.05rem]">
              {description}
            </p>

            {detailPills.length ? (
              <div className="mx-auto mt-1 flex max-w-3xl flex-wrap justify-center gap-2">
                {detailPills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center rounded-full border border-default bg-secondary/55 px-3 py-1 text-[11px] font-medium text-secondary"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            ) : null}

            {referenceHref && referenceLabel ? (
              <p className="mt-1 text-center text-xs font-medium text-secondary">
                <a
                  href={referenceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {referenceLabel}
                </a>
              </p>
            ) : null}
          </div>

          {primaryCtaLabel && secondaryCtaLabel ? (
            <div className="flex flex-row gap-3">
              <Button
                size="lg"
                className="gap-3 border-default bg-background/90 text-primary hover:bg-secondary"
                variant="outline"
                asChild
              >
                <a href={secondaryCtaHref}>
                  {secondaryCtaLabel} <PhoneCall className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                className="gap-3 border border-primary/25 bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a href={primaryCtaHref}>
                  {primaryCtaLabel} <MoveRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ) : null}

          {richTextLines.length ? (
            <div className="mx-auto grid max-w-3xl gap-2 rounded-2xl border border-default/70 bg-background/40 p-4 text-sm text-secondary sm:grid-cols-2">
              {richTextLines.map((line) => (
                <p key={line} className="leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { Hero };
