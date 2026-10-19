import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { GalleryItem } from "@/models/GalleryItem";
import { galleryItemSchema } from "@/lib/validations";
import { deleteImage } from "@/lib/cloudinary";

// GET /api/gallery/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const item = await GalleryItem.findById(params.id).lean();

    if (!item) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("GET gallery item error:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery item" },
      { status: 500 }
    );
  }
}

// PUT /api/gallery/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updateData: Record<string, unknown> = {
      title: parsed.data.title,
      category: parsed.data.category,
      photographer: parsed.data.photographer || "",
    };

    if (body.imageUrl) {
      updateData.imageUrl = body.imageUrl;
      updateData.imagePublicId = body.imagePublicId;
    }

    const item = await GalleryItem.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!item) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("PUT gallery item error:", error);
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const item = await GalleryItem.findByIdAndDelete(params.id);

    if (!item) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    if (item.imagePublicId) {
      await deleteImage(item.imagePublicId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE gallery item error:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
