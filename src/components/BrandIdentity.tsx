import { cn } from "@/lib/utils";
import { SanuKhanLogo } from "@/components/SanuKhanLogo";
import { useSectionData } from "@/lib/i18n";

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
  const nav = useSectionData("nav");

  return (
    <span className={cn("brand-identity text-[var(--sk-fg)]", compact && "brand-identity--compact", className)}>
      <SanuKhanLogo compact={compact} />
      {showDescriptor && <span className="brand-identity__descriptor">{nav.brandDescriptor}</span>}
    </span>
  );
}
