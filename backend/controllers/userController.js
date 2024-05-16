const userService = require("../services/userService");
const jwtToken = require("../util/jwtToken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUserService(email, password);
    const { nickname, createdAt } = result;
    const token = jwtToken.generateToken({ email, nickname, createdAt });
    res.status(200).json({
      code: 200,
      email: email,
      nickname: nickname,
      message: `환영합니다. ${nickname}님`,
      token: token,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const JoinController = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
    await userService.joinUserService(email, password, nickname);
    res.status(200).json({ message: "회원가입에 성공했습니다." });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  loginController,
  JoinController,
};
