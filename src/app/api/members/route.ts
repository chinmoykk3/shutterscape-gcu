import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Member } from '@/models/Member';
import { verifyAdminRequest } from '@/lib/auth';
import { memberSchema } from '@/lib/validations';

export async function GET() {
  try {
    await connectDB();
    const members = await Member.find().sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
    const created = await Member.create(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}