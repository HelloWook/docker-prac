// models/music.js
module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define(
    "music",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      music_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploader: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "email",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: false,
    }
  );

  Music.upload = async function ({
    title,
    music_url,
    image_url,
    genre,
    uploader,
  }) {
    try {
      await Music.create({ title, music_url, image_url, genre, uploader });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  Music.associate = (models) => {
    Music.belongsTo(models.User, {
      foreignKey: "uploader",
      targetKey: "email",
    });
  };

  return Music;
};
