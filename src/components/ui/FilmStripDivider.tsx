import React from 'react';
import { Aperture } from 'lucide-react';

export function FilmStripDivider() {
  return (
    <div className="my-12 flex items-center justify-center gap-4 opacity-50" aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500" />
      <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-darkroom-900">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60" />
        <Aperture className="h-4 w-4 text-amber-500" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60" />
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500" />
    </div>
  );
}