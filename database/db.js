const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("plandemic", "root", "", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 20,
    min: 0,
    aquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
