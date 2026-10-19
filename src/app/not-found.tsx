import Link from 'next/link';
import { CameraOff, ArrowLeft } from 'lucide-react';
import { ViewfinderCard } from '@/components/ui/ViewfinderCard';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-xl items-center justify-center px-4 py-16">
      <ViewfinderCard className="w-full text-center py-12 px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
          <CameraOff className="h-8 w-8" />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-amber-500">
          ERR 404 • OUT OF FOCUS
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">
          Frame Not Found
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          Looks like the lens cap was left on or this negative was lost in the darkroom.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-darkroom-950 hover:bg-amber-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Viewfinder (Home)</span>
          </Link>
        </div>
      </ViewfinderCard>
    </div>
  );
}