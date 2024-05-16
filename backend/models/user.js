const e = require("cors");

// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

  User.login = async function ({ email, password }) {
    try {
      result = await User.findOne({
        where: {
          email,
          password,
        },
      });
      if (!result) {
        const error = Error("아이디와 패스워드를 다시 확인해주세요");
        error.status = 400;
        throw error;
      }
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  User.join = async function ({ email, password, nickname }) {
    try {
      await User.create({ email, password, nickname });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        const error = Error("중복된 아이디입니다.");
        error.status = 400;
        throw error;
      }
      throw new Error(err.message);
    }
  };

  return User;
};
