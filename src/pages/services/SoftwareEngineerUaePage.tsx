import SeoPageLayout from "@/components/SeoPageLayout";

export default function SoftwareEngineerUaePage() {
  return (
    <SeoPageLayout
      title="Software Engineer & Solution Architect in Dubai, UAE"
      description="Software engineering and solution architecture for production platforms, enterprise integrations and cloud systems in Dubai, UAE."
      canonicalPath="/software-engineer-uae"
      h1="Software Engineer and Solution Architect for Production Platforms"
      intro="I help teams in the UAE turn complex business requirements into reliable software platforms, from architecture and API integration through delivery and production hardening."
      sections={[
        {
          id: "engineering",
          title: "Software Engineering with Architectural Context",
          content: [
            "I work across frontend, backend and integration boundaries so product decisions remain connected to operational reality. The focus is maintainable software, clear contracts, observable workflows and systems that can evolve without unnecessary rewrites.",
            "My experience spans enterprise commerce, travel technology, automotive platforms, SaaS and AI-assisted operational tools.",
          ],
        },
        {
          id: "architecture",
          title: "Architecture for Integrations and Cloud Systems",
          content: [
            "I design modular services, REST and event-driven integrations, data flows, authorization boundaries and deployment paths for teams that need dependable production behaviour.",
            "Architecture decisions are documented around business invariants, failure recovery, observability, security and cost. That keeps the solution practical instead of over-engineered.",
          ],
        },
        {
          id: "engagement",
          title: "When Teams Bring Me In",
          content: [
            "Typical engagements include platform architecture reviews, API and system integration, full-stack delivery leadership, modernization planning and turning an early product idea into an implementable technical plan.",
            "I am based in Dubai and available for UAE-focused engineering, architecture and consulting opportunities.",
          ],
        },
      ]}
      cta={{
        text: "Looking for a software engineer or solution architect in the UAE?",
        action: "Start a conversation",
        href: "mailto:hello@sanukhan.dev?subject=Software%20Engineering%20Opportunity%20UAE",
      }}
      links={[
        { label: "API Integration Services", href: "/api-integration-services" },
        { label: "Zaakiy V3RSE AI Platform", href: "/projects/zaakiy-v3rse" },
        { label: "Garage Management Architecture", href: "/projects/garage-management-and-diagnostics" },
        { label: "Real Estate ERP Architecture", href: "/projects/real-estate-erp-architecture" },
        { label: "Selected Projects", href: "/projects" },
        { label: "About Sanu Khan", href: "/about" },
      ]}
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Software Engineering and Solution Architecture",
        serviceType: "Software Engineering",
        provider: {
          "@type": "Person",
          name: "Sanu Khan",
          url: "https://www.sanukhan.dev",
        },
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
      }}
    />
  );
}
