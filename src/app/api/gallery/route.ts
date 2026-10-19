import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { GalleryItem } from "@/models/GalleryItem";
import { galleryItemSchema } from "@/lib/validations";

// GET /api/gallery — list all gallery items
export async function GET() {
  try {
    await connectDB();
    const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

// POST /api/gallery — create a new gallery item (protected)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = galleryItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    await connectDB();

    const item = await GalleryItem.create({
      title: parsed.data.title,
      category: parsed.data.category,
      photographer: parsed.data.photographer || "",
      imageUrl: body.imageUrl,
      imagePublicId: body.imagePublicId,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST gallery error:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
