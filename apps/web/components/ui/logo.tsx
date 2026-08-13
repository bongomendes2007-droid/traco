import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "mono" | "inverse";
}

const sizeMap = {
  sm: { icon: "w-6 h-6", text: "text-lg" },
  md: { icon: "w-8 h-8", text: "text-xl" },
  lg: { icon: "w-12 h-12", text: "text-3xl" },
  xl: { icon: "w-16 h-16", text: "text-4xl" },
};

export function Logo({
  className,
  size = "md",
  showText = true,
  variant = "default"
}: LogoProps) {
  const colors = {
    default: {
      t1: "#FF5A1F",
      t2: "#D9440F",
      t3: "#B8360B",
      t4: "#FF8A54",
      center: "#1C1815",
      text: "text-white",
    },
    mono: {
      t1: "#FF5A1F",
      t2: "#FF5A1F",
      t3: "#FF5A1F",
      t4: "#FF5A1F",
      center: "#1C1815",
      text: "text-traco-laranja",
    },
    inverse: {
      t1: "#ffffff",
      t2: "#ffffff",
      t3: "#ffffff",
      t4: "#ffffff",
      center: "#FF5A1F",
      text: "text-white",
    },
  };

  const c = colors[variant];
  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg viewBox="0 0 100 100" className={s.icon}>
        <polygon points="50,4 92,50 50,50" fill={c.t1} />
        <polygon points="50,50 92,50 50,96" fill={c.t2} />
        <polygon points="50,50 50,96 8,50" fill={c.t3} />
        <polygon points="8,50 50,50 50,4" fill={c.t4} />
        <circle cx="50" cy="50" r="6" fill={c.center} />
      </svg>
      {showText && (
        <span className={cn("font-display font-bold tracking-tight", s.text, c.text)}>
          TRAÇO
        </span>
      )}
    </div>
  );
}