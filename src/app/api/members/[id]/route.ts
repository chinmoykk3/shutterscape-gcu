import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Member } from '@/models/Member';
import { verifyAdminRequest } from '@/lib/auth';
import { memberSchema } from '@/lib/validations';
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
    const parsed = memberSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }

    await connectDB();
    const existing = await Member.findById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    if (existing.image.publicId !== parsed.data.image.publicId) {
      await deleteFromCloudinary(existing.image.publicId);
    }

    existing.name = parsed.data.name;
    existing.role = parsed.data.role;
    existing.type = parsed.data.type;
    existing.image = parsed.data.image;
    existing.order = parsed.data.order;
    existing.batch = parsed.data.batch;
    await existing.save();

    return NextResponse.json(existing);
  } catch {
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
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
    const existing = await Member.findById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    await deleteFromCloudinary(existing.image.publicId);
    await existing.deleteOne();

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}