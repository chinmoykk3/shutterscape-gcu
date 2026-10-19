import { cn } from "@/lib/utils";

interface FilmStripDividerProps {
  className?: string;
}

export default function FilmStripDivider({ className }: FilmStripDividerProps) {
  return (
    <div className={cn("flex items-center gap-2 py-8", className)}>
      {/* Sprocket holes */}
      <div className="flex gap-1.5">
        {[...Array(4)].map((_, i) => (
          <div
            key={`l-${i}`}
            className="w-3 h-4 rounded-sm bg-dark-300 border border-white/10"
          />
        ))}
      </div>

      {/* Film strip line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Sprocket holes */}
      <div className="flex gap-1.5">
        {[...Array(4)].map((_, i) => (
          <div
            key={`r-${i}`}
            className="w-3 h-4 rounded-sm bg-dark-300 border border-white/10"
          />
        ))}
      </div>
    </div>
  );
}
