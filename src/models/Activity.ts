import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  title: string;
  description: string;
  date: Date;
  imageUrl: string;
  imagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

ActivitySchema.index({ date: -1 });

export const Activity =
  mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);
