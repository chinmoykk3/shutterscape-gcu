import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  date: Date;
  descriptionHtml: string;
  image: {
    url: string;
    publicId: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true, index: true },
    descriptionHtml: { type: String, required: true },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Activity: Model<IActivity> =
  mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);