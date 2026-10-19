import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: string;
  imageUrl: string;
  imagePublicId: string;
  photographer: string;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    photographer: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

GalleryItemSchema.index({ category: 1 });

export const GalleryItem =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
