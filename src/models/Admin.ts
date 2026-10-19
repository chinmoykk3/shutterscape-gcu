import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

export const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
