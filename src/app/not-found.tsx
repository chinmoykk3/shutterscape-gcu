import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-display font-bold text-primary-400">404</h1>
      <p className="mt-4 text-xl text-gray-300">
        This frame is empty — nothing to see here.
      </p>
      <p className="mt-2 text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
