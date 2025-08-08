import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, tags, checklist } = req.body;

    // Create a new note linked to the logged-in user
    const newNote = await Note.create({
      title,
      content,
      tags,
      checklist,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating note",
    });
  }
};

export const readAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    if (notes.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: "No notes found",
      });
    }

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Error reading notes:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Read Note By ID
export const readNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOne({ noteId });

    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });

    res.json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Error reading notes", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Note By ID
export const updateNote = async (req, res) => {};

// Delete Note By ID
export const deleteNote = async (req, res) => {};
