import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    listId: { type: Schema.Types.ObjectId, rel: "list", required: true },
    boardId: { type: Schema.Types.ObjectId, rel: "board", required: true },
    creatorEmail: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

TaskSchema.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});
