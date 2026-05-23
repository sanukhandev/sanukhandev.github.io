import type { ExperienceItemType } from "@/components/ui/work-experience";
import { WorkExperience } from "@/components/ui/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "quaric",
    companyName: "Quaric Co., Ltd.",
    companyLogo: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=120&q=80",
    positions: [
      {
        id: "quaric-software-engineer",
        title: "Software Engineer",
        employmentPeriod: "03.2024 — present",
        employmentType: "Part-time",
        icon: "code",
        summary: "Integrated secure payment and compliance workflows for the e-commerce platform.",
        details: [
          "Integrated VNPAY-QR for secure transactions.",
          "Implemented online ordering workflows to streamline purchases.",
          "Built and maintained ZaDark extension across major browsers with 15,000+ active users.",
        ],
        skills: ["Next.js", "Strapi", "Auth0", "Docker", "NGINX", "Google Cloud"],
        isExpanded: true,
      },
      {
        id: "quaric-product-designer",
        title: "Product Designer",
        employmentPeriod: "03.2024 — present",
        employmentType: "Part-time",
        icon: "design",
        summary: "Designed coherent UX patterns and brand identity for Quaric products.",
        details: [
          "Designed UI/UX for Quaric website with a seamless interaction model.",
          "Built a reusable design system for product consistency.",
          "Created logo and brand guideline assets.",
        ],
        skills: ["UI/UX", "Design Systems", "Figma", "Brand Design"],
      },
    ],
    isCurrentEmployer: true,
  },
];

export default function WorkExperienceDemo() {
  return <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />;
}
