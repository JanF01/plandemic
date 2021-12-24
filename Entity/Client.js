const Sequelize = require("Sequelize");

const db = require("../database/db.js");

const Client = db.sequelize.define(
  "client",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    login: {
      type: Sequelize.TEXT("tiny"),
    },
    password: {
      type: Sequelize.TEXT,
    },
    email: {
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Client;
