import { useMemo, useState } from "react";
import {
  BriefcaseBusinessIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const iconMap = {
  code: CodeXmlIcon,
  design: DraftingCompassIcon,
  business: BriefcaseBusinessIcon,
  education: GraduationCapIcon,
} as const;

export type ExperiencePositionIconType = keyof typeof iconMap;

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  employmentPeriod: string;
  employmentType?: string;
  summary?: string;
  details?: string[];
  icon?: ExperiencePositionIconType;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

export function WorkExperience({
  className,
  experiences,
}: {
  className?: string;
  experiences: ExperienceItemType[];
}) {
  return (
    <div className={cn("rounded-2xl border border-default/70 bg-background/55 p-3 sm:p-4", className)}>
      {experiences.map((experience, index) => (
        <div key={experience.id}>
          <ExperienceItem experience={experience} />
          {index < experiences.length - 1 ? <Separator className="my-2" /> : null}
        </div>
      ))}
    </div>
  );
}

function ExperienceItem({
  experience,
}: {
  experience: ExperienceItemType;
}) {
  return (
    <div className="space-y-3 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-default bg-secondary/50" aria-hidden>
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={experience.companyName}
              className="size-7 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="flex size-2 rounded-full bg-accent" />
          )}
        </div>

        <h3 className="text-base font-semibold text-primary sm:text-lg">
          {experience.companyName}
        </h3>

        {experience.isCurrentEmployer ? (
          <span className="relative ml-1 flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
            <span className="sr-only">Current Employer</span>
          </span>
        ) : null}
      </div>

      <div className="relative ml-3 space-y-2 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePositionItemType;
}) {
  const ExperienceIcon = iconMap[position.icon || "business"];
  const [isPinnedOpen, setIsPinnedOpen] = useState(Boolean(position.isExpanded));
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = isPinnedOpen || isHovered;

  const detailLines = useMemo(() => {
    if (Array.isArray(position.details) && position.details.length) {
      return position.details;
    }
    return [];
  }, [position.details]);

  return (
    <motion.article
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pl-5"
    >
      <span className="absolute left-[-3px] top-5 size-1.5 rounded-full bg-accent" aria-hidden />

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className={cn(
          "rounded-xl border p-3 transition-colors",
          isExpanded ? "border-accent-soft bg-secondary/55" : "border-default/80 bg-background/70",
        )}
      >
        <button
          type="button"
          className="group block w-full text-left"
          onClick={() => setIsPinnedOpen((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          <div className="mb-1 flex items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-default bg-secondary text-secondary">
              <ExperienceIcon className="size-4" />
            </span>

            <h4 className="flex-1 text-sm font-semibold text-primary sm:text-base">
              {position.title}
            </h4>

            <span className="text-secondary" aria-hidden>
              {isExpanded ? (
                <ChevronsDownUpIcon className="size-4" />
              ) : (
                <ChevronsUpDownIcon className="size-4" />
              )}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pl-9 text-xs text-secondary sm:text-sm">
            {position.employmentType ? (
              <>
                <span>{position.employmentType}</span>
                <Separator className="h-4" orientation="vertical" />
              </>
            ) : null}
            <span>{position.employmentPeriod}</span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {position.summary ? (
                <p className="pt-3 pl-9 text-sm leading-relaxed text-secondary">
                  {position.summary}
                </p>
              ) : null}

              {detailLines.length ? (
                <ul className="space-y-1.5 pt-3 pl-9 text-sm leading-relaxed text-secondary">
                  {detailLines.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {Array.isArray(position.skills) && position.skills.length > 0 ? (
                <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
                  {position.skills.map((skill) => (
                    <li key={skill}>
                      <span className="inline-flex items-center rounded-lg border border-default bg-secondary/60 px-1.5 py-0.5 text-xs text-secondary">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
}
