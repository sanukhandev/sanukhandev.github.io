import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Sun,
  Moon,
  Copy,
  Check,
  Github,
  Linkedin,
  BookOpen,
  Cpu,
  Layers,
  Terminal,
  X,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";

interface CommandItem {
  id: string;
  category: "Navigation" | "Actions" | "External";
  title: string;
  description?: string;
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, toggleLocale } = useLocale();
  const ar = locale === "ar";

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("hello@sanukhan.dev").then(() => {
      showToast(ar ? "تم نسخ البريد الإلكتروني بنجاح" : "✓ Copied hello@sanukhan.dev");
    });
    onClose();
  }, [ar, onClose, showToast]);

  const scrollToHashOrNavigate = useCallback(
    (hash: string, fallbackPath: string) => {
      onClose();
      if (location.pathname === "/") {
        const id = hash.replace(/^#/, "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", hash);
          return;
        }
      }
      navigate(fallbackPath);
    },
    [location.pathname, navigate, onClose]
  );

  const commands: CommandItem[] = [
    {
      id: "work",
      category: "Navigation",
      title: ar ? "الأعمال والمشاريع المختارة" : "Selected Work & Case Studies",
      description: ar ? "تصفح المشاريع الهندسية والمعمارية" : "High-throughput systems & architectures",
      shortcut: "G W",
      icon: Layers,
      action: () => scrollToHashOrNavigate("#work", "/projects"),
    },
    {
      id: "services",
      category: "Navigation",
      title: ar ? "الخدمات والقدرات" : "Services & Capabilities",
      description: ar ? "هندسة الحلول والمنصات والتكامل" : "Solutions architecture & integration",
      shortcut: "G S",
      icon: Cpu,
      action: () => scrollToHashOrNavigate("#services", "/services"),
    },
    {
      id: "about",
      category: "Navigation",
      title: ar ? "نبذة عن سانو خان" : "About — Beyond Code",
      description: ar ? "الخبرة والمسؤولية والمنهجية" : "13+ years architecture background",
      shortcut: "G A",
      icon: Terminal,
      action: () => scrollToHashOrNavigate("#about", "/about"),
    },
    {
      id: "writing",
      category: "Navigation",
      title: ar ? "المقالات والملاحظات الهندسية" : "Writing & Engineering Notes",
      description: ar ? "مقالات معمارية وأدلة تقنية" : "Microservices, API Gateway, DuckDB",
      shortcut: "G B",
      icon: BookOpen,
      action: () => scrollToHashOrNavigate("#writing", "/blog"),
    },
    {
      id: "contact",
      category: "Navigation",
      title: ar ? "تواصل معي" : "Contact — Let's Connect",
      description: ar ? "للمشاريع والاستشارات المعمارية" : "Discuss platform & tech leadership",
      shortcut: "G C",
      icon: ArrowRight,
      action: () => scrollToHashOrNavigate("#contact", "/contact"),
    },
    {
      id: "copy-email",
      category: "Actions",
      title: ar ? "نسخ البريد الإلكتروني" : "Copy Email (hello@sanukhan.dev)",
      description: "hello@sanukhan.dev",
      shortcut: "⌘ C",
      icon: Copy,
      action: copyEmail,
    },
    {
      id: "toggle-theme",
      category: "Actions",
      title: ar ? "تبديل المظهر (فاتح / داكن)" : `Toggle Theme (Current: ${theme})`,
      description: ar ? "الانتقال بين الوضعين الداكن والفاتح" : "Switch between Obsidian & Alabaster",
      shortcut: "T",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: "toggle-lang",
      category: "Actions",
      title: ar ? "Switch to English" : "التبديل إلى العربية",
      description: ar ? "عرض الموقع باللغة الإنجليزية" : "Browse portfolio in Arabic",
      shortcut: "L",
      icon: Terminal,
      action: () => {
        toggleLocale();
        onClose();
      },
    },
    {
      id: "github",
      category: "External",
      title: "GitHub (@sanukhandev)",
      description: "github.com/sanukhandev",
      shortcut: "↗",
      icon: Github,
      action: () => {
        window.open("https://github.com/sanukhandev", "_blank", "noopener,noreferrer");
        onClose();
      },
    },
    {
      id: "linkedin",
      category: "External",
      title: "LinkedIn Profile",
      description: "linkedin.com/in/sanukhandev",
      shortcut: "↗",
      icon: Linkedin,
      action: () => {
        window.open("https://www.linkedin.com/in/sanukhandev/", "_blank", "noopener,noreferrer");
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const term = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(term) ||
      (cmd.description && cmd.description.toLowerCase().includes(term))
    );
  });

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev <= 0 ? Math.max(0, filteredCommands.length - 1) : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) {
        current.action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen && !toastMessage) return null;

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#121215]/95 px-4 py-3 text-sm font-semibold text-[#141413] dark:text-[#FAFAFA] shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="h-4 w-4 text-[#D5360C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Command Palette Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ar ? "قائمة الأوامر السريعة" : "Command Palette"}
          className="fixed inset-0 z-[90] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={onClose}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5]/95 dark:bg-[#121215]/95 text-[#141413] dark:text-[#FAFAFA] shadow-2xl backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-black/[0.08] dark:border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  ar
                    ? "ابحث عن قسم، مشروع، أو أمر سريع..."
                    : "Type a command or search..."
                }
                className="w-full bg-transparent text-sm text-[#141413] dark:text-[#FAFAFA] placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label={ar ? "إغلاق" : "Close"}
                className="rounded-md p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-zinc-500">
                  {ar ? "لم يتم العثور على نتائج" : "No commands found."}
                </div>
              ) : (
                filteredCommands.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-black/[0.05] dark:bg-white/[0.08] text-[#141413] dark:text-white"
                          : "text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-lg p-1.5 ${
                            isSelected
                              ? "bg-[#D5360C] text-white"
                              : "bg-black/[0.04] dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-400"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold">{item.title}</div>
                          {item.description && (
                            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>

                      {item.shortcut && (
                        <kbd className="rounded border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-500 dark:text-zinc-400">
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Monospace Footer Helper */}
            <div className="flex items-center justify-between border-t border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-4 py-2 text-[10.5px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="font-bold">↑↓</kbd> {ar ? "للتنقل" : "to navigate"}
                </span>
                <span>
                  <kbd className="font-bold">↵</kbd> {ar ? "للاختيار" : "to select"}
                </span>
              </div>
              <span>
                <kbd className="font-bold">esc</kbd> {ar ? "للإغلاق" : "to close"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommandPalette;
