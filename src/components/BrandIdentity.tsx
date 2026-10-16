import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";
import { SanuKhanLogo } from "@/components/SanuKhanLogo";

type BrandIdentityProps = {
  className?: string;
  compact?: boolean;
  showDescriptor?: boolean;
};

/** The single source of truth for the Sanu Khan brand logo and positioning line. */
export function BrandIdentity({
  className,
  compact = false,
  showDescriptor = true,
}: BrandIdentityProps) {
  const { locale } = useLocale();
  const descriptor = locale === "ar" ? "قائد تقني / خبير حلول" : "TECH LEAD / SOLUTION EXPERT";

  return (
    <span className={cn("brand-identity text-[var(--sk-fg)]", compact && "brand-identity--compact", className)}>
      <SanuKhanLogo compact={compact} />
      {showDescriptor && <span className="brand-identity__descriptor">{descriptor}</span>}
    </span>
  );
}
