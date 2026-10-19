import { connectDB } from "@/lib/db";
import { GalleryItem } from "@/models/GalleryItem";
import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata = {
  title: "Gallery",
  description: "Browse the Shutterscape photography gallery — featuring the best shots from our members.",
};

export default async function GalleryPage() {
  await connectDB();
  const images = JSON.parse(
    JSON.stringify(await GalleryItem.find().sort({ createdAt: -1 }).lean())
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-heading">Gallery</h1>
        <p className="section-subheading mb-10">
          A curated collection of moments captured by our talented photographers.
        </p>

        <GalleryClient images={images} />

        {images.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            Gallery is being curated — stay tuned!
          </p>
        )}
      </div>
    </div>
  );
}
