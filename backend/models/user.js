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
  // 테스트
  User.getUserById = async function (id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  User.Join = async function ({ email, password, nickname }) {
    try {
      await User.create({ email, password, nickname });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw new Error("중복된 아이디입니다.");
      }
      throw new Error(err.message);
    }
  };
  return User;
};
