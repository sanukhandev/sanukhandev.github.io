"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExpandableSkillTagsProps {
  title: string;
  skills: string[];
  initialCount?: number;
  className?: string;
}

export const ExpandableSkillTags = ({
  title,
  skills,
  initialCount = 10,
  className,
}: ExpandableSkillTagsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleSkills = React.useMemo(() => skills.slice(0, initialCount), [skills, initialCount]);
  const hiddenSkills = React.useMemo(() => skills.slice(initialCount), [skills, initialCount]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className={cn("w-full", className)}>
      <h3 className="mb-4 text-[15px] font-semibold tracking-wide text-primary">{title}</h3>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {visibleSkills.map((skill, index) => (
          <motion.div key={`visible-${index}`} variants={itemVariants}>
            <Badge variant="secondary">{skill}</Badge>
          </motion.div>
        ))}

        <AnimatePresence>
          {isExpanded &&
            hiddenSkills.map((skill, index) => (
              <motion.div
                key={`hidden-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary">{skill}</Badge>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {skills.length > initialCount && (
        <Button
          variant="link"
          className="mt-3 px-0 text-sm"
          onClick={toggleExpansion}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "View less skills" : "View all skills"}
        </Button>
      )}
    </section>
  );
};
