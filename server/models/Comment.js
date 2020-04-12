import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const CommentSchema = new Schema(
  {
    title: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, rel: "task", required: true },
    creatorEmail: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CommentSchema.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});
