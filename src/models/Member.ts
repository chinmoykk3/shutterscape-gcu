import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMember extends Document {
  name: string;
  role: string;
  type: 'faculty' | 'core' | 'alumni';
  image: {
    url: string;
    publicId: string;
  };
  order: number;
  batch?: string;
  createdAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['faculty', 'core', 'alumni'],
      required: true,
      index: true,
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    order: { type: Number, default: 0 },
    batch: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Member: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);