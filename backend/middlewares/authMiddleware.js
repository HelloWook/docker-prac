const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

exports.auth = (req, res, next) => {
  // 인증 완료
  try {
    req.decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECREAT_KEY
    );
    return next();
  } catch (error) {
    // 유효시간이 초과된 경우
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "재로그인을 해주세요.",
      });
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 요청입니다.",
      });
    }
  }
};
