import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  name: string;
  role: string;
  category: "faculty" | "core" | "alumni";
  imageUrl: string;
  imagePublicId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["faculty", "core", "alumni"],
      required: true,
    },
    imageUrl: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

MemberSchema.index({ category: 1, order: 1 });

export const Member =
  mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema);
