const { Music } = require("../models");

const uploadMusicService = async (
  title,
  music_url,
  image_url,
  genre,
  uploader
) => {
  try {
    await Music.upload({ title, music_url, image_url, genre, uploader });
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { uploadMusicService };
