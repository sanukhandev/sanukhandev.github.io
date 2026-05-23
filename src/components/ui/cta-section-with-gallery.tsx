import * as React from "react";
import { type HTMLMotionProps, type Variants, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface GalleryGridCellProps extends HTMLMotionProps<"div"> {
  index: number;
}

const SPRING_TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const filterVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

const areaClasses = [
  "col-start-2 col-end-3 row-start-1 row-end-3",
  "col-start-1 col-end-2 row-start-2 row-end-4",
  "col-start-1 col-end-2 row-start-4 row-end-6",
  "col-start-2 col-end-3 row-start-3 row-end-5",
];

export const ContainerStagger = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ transition, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{
          staggerChildren: transition?.staggerChildren ?? 0.2,
          delayChildren: transition?.delayChildren ?? 0.2,
          duration: 0.3,
          ...transition,
        }}
        {...props}
      />
    );
  },
);
ContainerStagger.displayName = "ContainerStagger";

export const ContainerAnimated = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ transition, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={filterVariants}
        transition={{
          ...SPRING_TRANSITION_CONFIG,
          duration: 0.3,
          ...transition,
        }}
        {...props}
      />
    );
  },
);
ContainerAnimated.displayName = "ContainerAnimated";

export const GalleryGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4",
          className,
        )}
        {...props}
      />
    );
  },
);
GalleryGrid.displayName = "GalleryGrid";

export const GalleryGridCell = React.forwardRef<HTMLDivElement, GalleryGridCellProps>(
  ({ className, transition, index, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          delay: index * 0.2,
          delayChildren: transition?.delayChildren ?? 0.2,
        }}
        className={cn(
          "relative overflow-hidden rounded-xl shadow-xl",
          areaClasses[index],
          className,
        )}
        {...props}
      />
    );
  },
);
GalleryGridCell.displayName = "GalleryGridCell";
