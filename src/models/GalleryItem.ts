import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryItem extends Document {
  image: {
    url: string;
    publicId: string;
  };
  caption: string;
  category: string;
  createdAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    caption: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);