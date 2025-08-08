import "dotenv/config";
import { app } from "./src/app.js";

import authRouter from "./src/routes/auth.routes.js";
import notesRouter from "./src/routes/note.routes.js";
import { connectToDatabase } from "./src/db/db.js";
connectToDatabase();

app.get("/", (req, res) => {
  res.send("hello from server.");
});

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
