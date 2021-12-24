const express = require("express");
const verapi = express.Router();

const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Client = require("../Entity/Client");

verapi.use(cors());

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

const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};

verapi.post("/plandemic_reg", (req, res) => {
  const clientData = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
  };

  Client.findOne({
    where: {
      login: playerData.login,
    },
  })
    .then((player) => {
      if (!player || player == null) {
        let hash = bcrypt.hashSync(clientData.password, 10);
        playerData.password = hash;
        player
          .create(clientData)
          .then((player) => {
            player.dataValues.id = player.null;
            let token = jwt.sign(
              objectWithoutKey(player.dataValues, "password"),
              process.env.SECRET_KEY,
              {
                expiresIn: 7200,
              }
            );
            res.json({
              token: token,
            });
          })
          .catch((error) => {
            res.send("error: " + error);
          });
      } else {
        res.send("lt");
      }
    })
    .catch((error) => {
      res.send("error: " + error);
    });
});

verapi.post("/plandemic_log", (req, res) => {
  const clientData = {
    login: req.body.login,
    password: req.body.password,
  };

  Client.findOne({
    where: {
      login: clientData.login,
    },
  })
    .then((client) => {
      if (player) {
        let pass = bcrypt.compareSync(clientData.password, client.password);

        if (pass) {
          let token = jwt.sign(
            objectWithoutKey(client.dataValues, "password"),
            process.env.SECRET_KEY,
            {
              expiresIn: 7200,
            }
          );
          res.json({
            token: token,
          });
        } else {
          res.send("wp");
        }
      } else {
        res.send("ude");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = verapi;
