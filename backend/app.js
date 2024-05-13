const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/config/.env") });
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
