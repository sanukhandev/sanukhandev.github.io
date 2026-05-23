import { ExpandableSkillTags } from "@/components/ui/expandable-skill-tags";

const allSkills = [
  "Data Security",
  "Workforce Development",
  "Organizational Strategy",
  "Prompt Engineering",
  "Productivity Software",
  "Critical Thinking",
  "Generative AI",
  "LLM Application",
  "Large Language Modeling",
  "Prompt Patterns",
  "Process Optimization",
  "Human Computer Interaction",
  "Innovation",
  "AI Product Strategy",
  "Emerging Technologies",
  "Analysis",
  "Sociology",
];

const coreSkills = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Prisma",
  "UI/UX Design",
];

export default function SkillTagsDemo() {
  return (
    <div className="w-full max-w-2xl space-y-8 rounded-lg bg-background p-8">
      <ExpandableSkillTags title="Skills you'll gain" skills={allSkills} initialCount={10} />
      <ExpandableSkillTags title="Core Development Skills" skills={coreSkills} initialCount={10} />
    </div>
  );
}
