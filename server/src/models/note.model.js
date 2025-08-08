import mongoose from "mongoose";
import { nanoid } from "nanoid";

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    noteId: {
      type: String,
      required: true,
      default: () => nanoid(8),
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    checklist: [
      {
        task: { type: String },
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
export default Note;
