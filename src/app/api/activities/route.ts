import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Activity } from '@/models/Activity';
import { verifyAdminRequest } from '@/lib/auth';
import { activitySchema } from '@/lib/validations';
import { sanitizeRichText } from '@/lib/sanitize';

export async function GET() {
  try {
    await connectDB();
    const activities = await Activity.find().sort({ date: -1 }).lean();
    return NextResponse.json(activities);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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
    const cleanHtml = sanitizeRichText(parsed.data.descriptionHtml);

    const created = await Activity.create({
      title: parsed.data.title,
      date: new Date(parsed.data.date),
      descriptionHtml: cleanHtml,
      image: parsed.data.image,
    });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}