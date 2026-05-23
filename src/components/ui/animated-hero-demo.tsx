import { Hero } from "@/components/ui/animated-hero";

function HeroDemo() {
  return (
    <div className="block">
      <Hero
        badgeText="Read our launch article"
        badgeHref="#works"
        titlePrefix="This is something"
        titleWords={["amazing", "new", "wonderful", "beautiful", "smart"]}
        description="Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever."
        secondaryCtaLabel="Jump on a call"
        secondaryCtaHref="#contact"
        primaryCtaLabel="Sign up here"
        primaryCtaHref="#contact"
      />
    </div>
  );
}

export { HeroDemo };
