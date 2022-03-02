const Sequelize = require("Sequelize");

const db = require("../database/db.js");

const Client = require("./Client.js");

const Folder = db.sequelize.define(
  "folder",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(100),
    },
    organize_order: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.TEXT("tiny"),
    },
  },
  {
    timestamps: false,
  }
);

Folder.belongsTo(Client);

module.exports = Folder;
