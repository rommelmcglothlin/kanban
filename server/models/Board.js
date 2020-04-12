import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const BoardSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

BoardSchema.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});
