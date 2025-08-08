import { Router } from "express";
import { protect } from "../middlewares/auth.moddleware.js"; // file name sahi ho
import {
  createNote,
  deleteNote,
  readAllNotes,
  readNote,
  updateNote,
} from "../controller/note.controller.js"; // path + .js sahi ho

const router = Router();

// Create note
router.post("/", protect, createNote);

// Read all Notes of User
router.get("/", protect, readAllNotes);

// Read note by ID
router.get("/:noteId", protect, readNote);

// Update note
router.patch("/:noteId", protect, updateNote);

// Delete note
router.delete("/:noteId", protect, deleteNote);

export default router;
