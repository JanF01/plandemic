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

module.exports = notesapi;
