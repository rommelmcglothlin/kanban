import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const CommentSchema = new Schema(
  {
    note: { type: String, required: true },
    listId: { type: Schema.Types.ObjectId, rel: "list", required: true },
    boardId: { type: Schema.Types.ObjectId, red: "board", require: true },
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
