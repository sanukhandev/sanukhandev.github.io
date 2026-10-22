import React, { useState, useEffect } from "react";
import { useLocale } from "@/hooks/use-locale";

export function LiveTelemetryBar({ className = "" }: { className?: string }) {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dubai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTime(formatter.format(new Date()));
      } catch {
        setTime(new Date().toTimeString().slice(0, 8));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      dir="ltr"
      aria-label="Live System Telemetry"
      className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] backdrop-blur-md text-[11px] font-mono tracking-wider text-zinc-600 dark:text-zinc-400 select-none shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
          {ar ? "متاح للمشاريع المعمارية" : "AVAILABLE"}
        </span>
      </div>

      <span className="text-zinc-300 dark:text-zinc-700">|</span>

      <div className="flex items-center gap-1 tabular-nums">
        <span className="text-zinc-400 dark:text-zinc-500">DXB</span>
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{time || "09:44:12"}</span>
        <span className="text-[10px] text-zinc-400">GMT+4</span>
      </div>
    </div>
  );
}

export default LiveTelemetryBar;
