const express = require("express");
const ver_api = express.Router();

const cors = reuqire("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

ver_api.use(cors());

process.env.SECRET_KEY = require("../keys/private_key.pub");

ver_api.register("/plandemic_reg", (req, res) => {
  const clientData = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
  };
});
