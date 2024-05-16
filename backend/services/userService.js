const { User } = require("../models");

const joinUserService = async (email, password, nickname) => {
  try {
    await User.join({ email, password, nickname });
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUserService = async (email, password) => {
  try {
    const result = await User.login({ email, password });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { joinUserService, loginUserService };
