import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";

type BrandIdentityProps = {
  className?: string;
  compact?: boolean;
  showDescriptor?: boolean;
};

/** The single source of truth for the Sanu Khan wordmark and positioning line. */
export function BrandIdentity({
  className,
  compact = false,
  showDescriptor = true,
}: BrandIdentityProps) {
  const { locale } = useLocale();
  const descriptor = locale === "ar" ? "قائد تقني / معماري حلول" : "TECH LEAD / SOLUTION ARCHITECT";

  return (
    <span className={cn("brand-identity", compact && "brand-identity--compact", className)}>
      <span className="brand-identity__wordmark">SANU KHAN</span>
      {showDescriptor && <span className="brand-identity__descriptor">{descriptor}</span>}
    </span>
  );
}
