const Sequelize = require("Sequelize");

const db = require("../database/db.js");

const Client = db.sequelize.define(
  "client",
  {
    pd_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    pd_l: {
      type: Sequelize.TEXT("tiny"),
    },
    pd_h: {
      type: Sequelize.TEXT,
    },
    pd_e: {
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Client;
