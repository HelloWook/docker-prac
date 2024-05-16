const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECREAT_KEY = process.env.SECREAT_KEY;

const generateToken = ({ email, nickname, createdAt }) => {
  return jwt.sign(
    {
      type: "JWT",
      email: email,
      nickname: nickname,
      createdAt: createdAt,
    },
    SECREAT_KEY,
    {
      expiresIn: "5h",
      issuer: "토큰발급자",
    }
  );
};

module.exports = { generateToken };
