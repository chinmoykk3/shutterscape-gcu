import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Activity } from '@/models/Activity';
import { verifyAdminRequest } from '@/lib/auth';
import { activitySchema } from '@/lib/validations';
import { sanitizeRichText } from '@/lib/sanitize';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = activitySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }

    await connectDB();
    const existing = await Activity.findById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    // If image was replaced, delete old Cloudinary image
    if (existing.image.publicId !== parsed.data.image.publicId) {
      await deleteFromCloudinary(existing.image.publicId);
    }

    existing.title = parsed.data.title;
    existing.date = new Date(parsed.data.date);
    existing.descriptionHtml = sanitizeRichText(parsed.data.descriptionHtml);
    existing.image = parsed.data.image;
    await existing.save();

    return NextResponse.json(existing);
  } catch {
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdminRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const existing = await Activity.findById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    await deleteFromCloudinary(existing.image.publicId);
    await existing.deleteOne();

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 });
  }
}