const { User } = require("../models");

const joinUserService = async (email, password) => {
  try {
    return await User.createUser({ email, password });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByIdService = async (id) => {
  try {
    const user = await User.getUserById(id);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { joinUserService, getUserByIdService };
