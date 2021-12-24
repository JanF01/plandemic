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
      pd_l: clientData.login,
    },
  })
    .then((client) => {
      if (!client || client == null) {
        let hash = bcrypt.hashSync(clientData.password, 10);
        clientData.password = hash;
        client
          .create(clientData)
          .then((client) => {
            client.dataValues.id = client.null;
            let token = jwt.sign(
              objectWithoutKey(client.dataValues, "pd_h"),
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
        res.json("lt");
      }
    })
    .catch((error) => {
      res.json("error: " + error);
    });
});

verapi.post("/plandemic_log", (req, res) => {
  const clientData = {
    login: req.body.login,
    password: req.body.password,
  };

  Client.findOne({
    where: {
      pd_l: clientData.login,
    },
  })
    .then((client) => {
      if (client) {
        let pass = bcrypt.compareSync(clientData.password, client.pd_h);

        if (pass) {
          let token = jwt.sign(
            objectWithoutKey(client.dataValues, "pd_h"),
            process.env.SECRET_KEY,
            {
              expiresIn: 7200,
            }
          );
          res.json({
            token: token,
          });
        } else {
          res.json("wp");
        }
      } else {
        res.json("ude");
      }
    })
    .catch((err) => {
      res.json("error: " + err);
    });
});

module.exports = verapi;
