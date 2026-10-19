import React from 'react';
import { cn } from '@/lib/utils';

interface ViewfinderCardProps {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}

export function ViewfinderCard({ children, className, highlighted = false }: ViewfinderCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-darkroom-900/90 border p-6 transition-all duration-300 group',
        highlighted
          ? 'border-amber-500/80 shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)]'
          : 'border-white/10 hover:border-amber-500/40',
        className
      )}
    >
      {/* Subtle Camera Viewfinder Corner Brackets */}
      <span className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-400 transition-colors" />
      <span className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-400 transition-colors" />
      <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b-2 border-l-2 border-amber-500/40 group-hover:border-amber-400 transition-colors" />
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b-2 border-r-2 border-amber-500/40 group-hover:border-amber-400 transition-colors" />
      {children}
    </div>
  );
}