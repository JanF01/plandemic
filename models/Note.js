const Sequelize = require("Sequelize");

const db = require("../database/db.js");

const Folder = require("./Folder.js");
const Client = require("./Client.js");

const Note = db.sequelize.define(
  "note",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(100),
    },
    unformattedContent: {
      type: Sequelize.STRING(10000),
    },
    pinned: {
      type: Sequelize.BOOLEAN,
    },
    date: {
      type: Sequelize.TEXT("tiny"),
    },
    note_color: {
      type: Sequelize.TEXT("tiny"),
    },
  },
  {
    timestamps: false,
  }
);

Note.belongsTo(Folder);
Note.belongsTo(Client);

module.exports = Note;
