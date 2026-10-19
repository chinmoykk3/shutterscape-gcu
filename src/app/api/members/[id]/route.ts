import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Member } from "@/models/Member";
import { memberSchema } from "@/lib/validations";
import { deleteImage } from "@/lib/cloudinary";

// GET /api/members/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const member = await Member.findById(params.id).lean();

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("GET member error:", error);
    return NextResponse.json(
      { error: "Failed to fetch member" },
      { status: 500 }
    );
  }
}

// PUT /api/members/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updateData: Record<string, unknown> = {
      name: parsed.data.name,
      role: parsed.data.role,
      category: parsed.data.category,
      order: parsed.data.order ?? 0,
    };

    if (body.imageUrl !== undefined) {
      updateData.imageUrl = body.imageUrl;
      updateData.imagePublicId = body.imagePublicId;
    }

    const member = await Member.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("PUT member error:", error);
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}

// DELETE /api/members/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const member = await Member.findByIdAndDelete(params.id);

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    if (member.imagePublicId) {
      await deleteImage(member.imagePublicId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE member error:", error);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
