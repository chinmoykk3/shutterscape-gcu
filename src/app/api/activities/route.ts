import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Activity } from "@/models/Activity";
import { activitySchema } from "@/lib/validations";
import { sanitize } from "@/lib/sanitize";

// GET /api/activities — list all activities
export async function GET() {
  try {
    await connectDB();
    const activities = await Activity.find().sort({ date: -1 }).lean();
    return NextResponse.json(activities);
  } catch (error) {
    console.error("GET activities error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}

// POST /api/activities — create a new activity (protected by middleware)
export async function POST(request: NextRequest) {
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

    const activity = await Activity.create({
      title: parsed.data.title,
      description: sanitize(parsed.data.description),
      date: new Date(parsed.data.date),
      imageUrl: body.imageUrl,
      imagePublicId: body.imagePublicId,
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error("POST activity error:", error);
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 }
    );
  }
}
