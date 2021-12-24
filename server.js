var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
const http = require("http").Server(app);

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var ver_api = require("./routes/verapi");

app.use("/verapi", ver_api);

http.listen(port, function () {
  console.log("Server is running on port: " + port);
});
