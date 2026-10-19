import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Member } from "@/models/Member";
import { memberSchema } from "@/lib/validations";

// GET /api/members — list all members
export async function GET() {
  try {
    await connectDB();
    const members = await Member.find().sort({ category: 1, order: 1 }).lean();
    return NextResponse.json(members);
  } catch (error) {
    console.error("GET members error:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

// POST /api/members — create a new member (protected)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = memberSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    await connectDB();

    const member = await Member.create({
      name: parsed.data.name,
      role: parsed.data.role,
      category: parsed.data.category,
      order: parsed.data.order ?? 0,
      imageUrl: body.imageUrl || "",
      imagePublicId: body.imagePublicId || "",
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("POST member error:", error);
    return NextResponse.json(
      { error: "Failed to create member" },
      { status: 500 }
    );
  }
}
