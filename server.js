const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const fs = require("fs");
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(noteData);
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    res.status(400).json({
      status: "error",
      message: "Missing required title or text in request body",
    });
    return;
  }
  const newNote = {
    title,
    text,
  };
  noteData.push(newNote);
  fs.writeFileSync("./db/db.json", json.stringify(noteData, null, 2));
  res.json({ status: "success", body: newNote });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:3001`);
});
