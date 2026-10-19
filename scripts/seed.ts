import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

/* ── Schemas (inline to avoid path-alias issues with tsx) ────────── */

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    photographer: { type: String, default: "" },
  },
  { timestamps: true }
);

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
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

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);
const GalleryItem =
  mongoose.models.GalleryItem ||
  mongoose.model("GalleryItem", galleryItemSchema);
const Member =
  mongoose.models.Member || mongoose.model("Member", memberSchema);

/* ── Seed data ───────────────────────────────────────────────────── */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "shutterscape2024";

const sampleActivities = [
  {
    title: "Annual Photo Walk 2024",
    description:
      "<p>Our annual photo walk through the city — capturing street life, architecture, and candid moments.</p>",
    date: new Date("2024-03-15"),
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    imagePublicId: "sample",
  },
  {
    title: "Golden Hour Workshop",
    description:
      "<p>A hands-on workshop exploring the magic of golden-hour lighting techniques.</p>",
    date: new Date("2024-02-20"),
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    imagePublicId: "sample",
  },
];

const sampleGalleryItems = [
  {
    title: "City at Dusk",
    category: "Street",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    imagePublicId: "sample",
    photographer: "Alex Kumar",
  },
  {
    title: "Mountain Sunrise",
    category: "Landscape",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    imagePublicId: "sample",
    photographer: "Priya Sharma",
  },
  {
    title: "Portrait in Light",
    category: "Portrait",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    imagePublicId: "sample",
    photographer: "Rohan Verma",
  },
];

const sampleMembers = [
  { name: "Dr. Ananya Rao", role: "Faculty Advisor", category: "faculty" as const, order: 1 },
  { name: "Vikram Singh", role: "President", category: "core" as const, order: 1 },
  { name: "Meera Patel", role: "Vice President", category: "core" as const, order: 2 },
  { name: "Arjun Nair", role: "Founding Member", category: "alumni" as const, order: 1 },
];

/* ── Main ─────────────────────────────────────────────────────────── */

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  // Admin
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.findOneAndUpdate(
    { username: ADMIN_USERNAME },
    { username: ADMIN_USERNAME, password: hashedPassword },
    { upsert: true }
  );
  console.log(`✅ Admin user upserted  (${ADMIN_USERNAME} / ${ADMIN_PASSWORD})`);

  // Activities
  await Activity.deleteMany({});
  await Activity.insertMany(sampleActivities);
  console.log(`✅ Seeded ${sampleActivities.length} activities`);

  // Gallery
  await GalleryItem.deleteMany({});
  await GalleryItem.insertMany(sampleGalleryItems);
  console.log(`✅ Seeded ${sampleGalleryItems.length} gallery items`);

  // Members
  await Member.deleteMany({});
  await Member.insertMany(sampleMembers);
  console.log(`✅ Seeded ${sampleMembers.length} members`);

  await mongoose.disconnect();
  console.log("\n🎉 Seed complete — run `npm run dev` to start!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
