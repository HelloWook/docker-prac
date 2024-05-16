const { User } = require("../models");

const joinUserService = async (email, password, nickname) => {
  try {
    await User.Join({ email, password, nickname });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByIdService = async (id) => {
  try {
    await User.getUserById(id);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { joinUserService, getUserByIdService };
