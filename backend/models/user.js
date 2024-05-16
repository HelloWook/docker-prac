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
  return User;
};
