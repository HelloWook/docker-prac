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

const getAllMusicService = async () => {
  try {
    const musicList = await Music.getAll();
    return musicList;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMusicByUploaderService = async (uploader) => {
  try {
    const musicList = await Music.getByUploader(uploader);
    return musicList;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  uploadMusicService,
  getAllMusicService,
  getMusicByUploaderService,
};
