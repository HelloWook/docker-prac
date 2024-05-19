const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/userRoute");
const musicRoutes = require("./routes/musicRoute");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Wssorld!");
});

app.use("/user", userRoutes);
app.use("/music", musicRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("데이터베이스 연결");
  })
  .catch((err) => {
    console.error("데이터베이스 연결 오류", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`서버 작동 http://localhost:${process.env.PORT}`);
});
