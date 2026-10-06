import { useState, useEffect, useRef, memo } from "react";
import { cn } from "@/lib/utils";

interface MatrixScrambleWordProps {
  words: string[];
  interval?: number; // Pause duration on resolved word in ms
  className?: string;
  isArabic?: boolean;
}

const MATRIX_CHARS_EN = "0101XYZ#*&<>[]{}!/?%+=~$_";
const MATRIX_CHARS_AR = "٠١٢٣٤٥٦٧٨٩*#+~><}{01$_";

export function MatrixScrambleWord({
  words,
  interval = 3200,
  className,
  isArabic = false,
}: MatrixScrambleWordProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = words[wordIndex] || words[0] || "";
  const [displayWord, setDisplayWord] = useState(currentWord);
  const [isScrambling, setIsScrambling] = useState(false);

  const prevWordRef = useRef(currentWord);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayWord(currentWord);
      return;
    }

    const glyphSet = isArabic ? MATRIX_CHARS_AR : MATRIX_CHARS_EN;
    let frameId: number;

    // Schedule the next transition after interval
    const timeoutId = setTimeout(() => {
      const nextIndex = (wordIndex + 1) % words.length;
      const targetWord = words[nextIndex];
      const startWord = prevWordRef.current;
      setIsScrambling(true);

      const totalTicks = 22; // Number of scramble animation frames
      let tick = 0;
      const tickSpeed = 38; // ms per tick (~836ms total decryption phase)
      let lastTime = performance.now();

      const animateScramble = (time: number) => {
        if (time - lastTime >= tickSpeed) {
          lastTime = time;
          tick++;

          const progress = Math.min(1, tick / totalTicks);
          const currentLength = Math.round(
            startWord.length + (targetWord.length - startWord.length) * progress
          );
          const resolvedCount = Math.floor(progress * targetWord.length);

          let scrambledResult = "";
          for (let i = 0; i < currentLength; i++) {
            if (i < resolvedCount) {
              // Resolved real character
              scrambledResult += targetWord[i] || "";
            } else {
              // Matrix random cipher glyph
              const randomGlyph = glyphSet[Math.floor(Math.random() * glyphSet.length)];
              scrambledResult += randomGlyph;
            }
          }

          setDisplayWord(scrambledResult);

          if (tick >= totalTicks) {
            // Lock into exact target word
            setDisplayWord(targetWord);
            prevWordRef.current = targetWord;
            setIsScrambling(false);
            setWordIndex(nextIndex);
            return;
          }
        }

        frameId = requestAnimationFrame(animateScramble);
      };

      frameId = requestAnimationFrame(animateScramble);
    }, interval);

    return () => {
      clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [wordIndex, words, interval, isArabic, currentWord]);

  return (
    <span
      className={cn(
        "inline-flex items-baseline transition-colors duration-200 text-accent font-semibold",
        isScrambling && "opacity-95",
        className
      )}
    >
      {/* Screen reader friendly accessible text */}
      <span className="sr-only">{currentWord}</span>

      {/* Visual animated Matrix cipher string */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-block transition-all",
          isScrambling
            ? "font-mono tracking-widest text-accent filter drop-shadow-[0_0_8px_rgba(20,122,58,0.35)] dark:drop-shadow-[0_0_12px_rgba(86,200,120,0.55)]"
            : "tracking-[-0.03em]"
        )}
      >
        {displayWord}
      </span>

      {/* Blinking Matrix decryption cursor during scrambling */}
      {isScrambling && (
        <span
          aria-hidden="true"
          className="inline-block w-1.5 h-4 sm:h-5 ml-1 -mb-0.5 bg-accent animate-pulse align-baseline select-none opacity-80"
        />
      )}
    </span>
  );
}

export default memo(MatrixScrambleWord);
