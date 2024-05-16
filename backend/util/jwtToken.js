const jwt = require("jsonwebtoken");
const SECREAT_KEY = process.env.SECREAT_KEY;

const generateToken = ({ email, nickname, joindate }) => {
  return jwt.sign(
    {
      type: "JWT",
      email: email,
      nickname: nickname,
      joindate: joindate,
    },
    SECREAT_KEY,
    {
      expiresIn: "5h",
      issuer: "토큰발급자",
    }
  );
};

module.exports = { generateToken };
