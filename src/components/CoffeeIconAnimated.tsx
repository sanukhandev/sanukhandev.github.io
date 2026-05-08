import { Coffee } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type CoffeeIconAnimatedProps = {
  className?: string;
};

export default function CoffeeIconAnimated({
  className,
}: CoffeeIconAnimatedProps) {
  const reduced = useReducedMotion();

  return (
    <span className="relative inline-flex items-center justify-center">
      {!reduced && (
        <>
          <motion.span
            className="pointer-events-none absolute -top-3 left-[18%] w-[2px] rounded-full bg-current"
            style={{ height: 5 }}
            animate={{ y: [0, -8], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.1,
            }}
          />
          <motion.span
            className="pointer-events-none absolute -top-3 left-[52%] w-[2px] rounded-full bg-current"
            style={{ height: 5 }}
            animate={{ y: [0, -8], opacity: [0, 0.45, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.7,
            }}
          />
        </>
      )}
      <motion.span
        className="inline-flex"
        whileHover={
          reduced
            ? {}
            : {
                scale: 1.22,
                rotate: [-6, 6, -6, 6, 0],
                transition: { duration: 0.38, ease: "easeInOut" },
              }
        }
      >
        <Coffee className={className} />
      </motion.span>
    </span>
  );
}
