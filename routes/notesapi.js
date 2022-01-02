const express = require("express");
const notesapi = express.Router();

const cors = require("cors");
const jwt = require("jsonwebtoken");

const Client = require("../models/Client");
const Folder = require("../models/Folder");
const Note = require("../models/Note");

notesapi.use(cors());

var fs = require("fs");
var Q = require("q");
const { resolveSoa } = require("dns");

var months = [
  "Jenuary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function readFirstLine(path) {
  return Q.promise(function (resolve, reject) {
    var rs = fs.createReadStream(path, { encoding: "utf8" });
    var acc = "";
    var pos = 0;
    var index;
    rs.on("data", function (chunk) {
      index = chunk.indexOf("\n");
      acc += chunk;
      index !== -1 ? rs.close() : (pos += chunk.length);
    })
      .on("close", function () {
        resolve(acc.slice(0, pos + index));
      })
      .on("error", function (err) {
        reject(err);
      });
  });
}

process.env.SECRET_KEY = readFirstLine("../keys/private_key.pub");

notesapi.get("/get_pinned/:id/:token", async function (req, res) {
  let client = req.params.id;
  let token = req.params.token;

  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (decoded) {
    const pinnedNotes = await Note.findAll({
      where: {
        clientPdId: client,
        pinned: true,
      },
    });

    res.json(pinnedNotes);
  }
});

notesapi.get("/get_folders/:id/:token", async function (req, res) {
  let client = req.params.id;
  let token = req.params.token;

  let decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (decoded) {
    const folders = await Folder.findAll({
      where: {
        clientPdId: client,
      },
    });

    res.json(folders);
  }
});

notesapi.get(
  "/get_notes_from_folder/:id/:token/:folderId",
  async function (req, res) {
    let client = req.params.id;
    let token = req.params.token;
    let folderId = req.params.folderId;
    if (folderId == "null") folderId = null;

    let decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded) {
      const notes = await Note.findAll({
        where: {
          clientPdId: client,
          folderId: folderId,
        },
      });

      res.json(notes);
    }
  }
);

notesapi.post("/create_note", (req, res) => {
  let token = req.body.token;
  var noteData = {
    title: req.body.note.title,
    unformattedContent: req.body.note.unformattedContent,
    pinned: req.body.note.pinned,
    date: req.body.note.date,
    note_color: req.body.note.noteColor,
    folderId: null,
    clientPdId: req.body.id,
  };

  let current_date = new Date();

  let day = current_date.getDate();
  let month = months[current_date.getMonth()];
  let year = current_date.getFullYear();
  let dayOfWeek = weekday[current_date.getDay()];

  noteData.date = dayOfWeek + ", " + month + " " + day + ", " + year;

  let decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (decoded) {
    Note.create(noteData)
      .then((note) => {
        if (note) {
          res.json({
            note: note,
          });
        } else {
          res.json("Error");
        }
      })
      .catch((err) => {
        res.json("error: " + err);
      });
  }
});

notesapi.post("/pin_note", async function (req, res) {
  let token = req.body.token;
  var noteData = {
    id: req.body.note.id,
    pinned: req.body.note.pinned,
  };

  let decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (decoded) {
    Note.findOne({
      where: {
        id: noteData.id,
      },
    })
      .then(async function (note) {
        note.pinned = !note.pinned;
        await note.save();
        res.json({ note: note });
      })
      .catch((error) => {
        res.json("Error: " + error);
      });
  }
});

module.exports = notesapi;
