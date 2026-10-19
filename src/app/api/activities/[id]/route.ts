import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Activity } from "@/models/Activity";
import { activitySchema } from "@/lib/validations";
import { sanitize } from "@/lib/sanitize";
import { deleteImage } from "@/lib/cloudinary";

// GET /api/activities/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const activity = await Activity.findById(params.id).lean();

    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error("GET activity error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    );
  }
}

// PUT /api/activities/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const parsed = activitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    await connectDB();

    const updateData: Record<string, unknown> = {
      title: parsed.data.title,
      description: sanitize(parsed.data.description),
      date: new Date(parsed.data.date),
    };

    if (body.imageUrl) {
      updateData.imageUrl = body.imageUrl;
      updateData.imagePublicId = body.imagePublicId;
    }

    const activity = await Activity.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error("PUT activity error:", error);
    return NextResponse.json(
      { error: "Failed to update activity" },
      { status: 500 }
    );
  }
}

// DELETE /api/activities/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const activity = await Activity.findByIdAndDelete(params.id);

    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      );
    }

    // Clean up Cloudinary image
    if (activity.imagePublicId) {
      await deleteImage(activity.imagePublicId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE activity error:", error);
    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 }
    );
  }
}
