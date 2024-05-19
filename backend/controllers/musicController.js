const musicService = require("../services/musicService");
const { s3 } = require("../config/s3config");
const fs = require("fs");
const { downloadFileFromUrl } = require("../middleware/downloadMiddleware");

const uploadController = async (req, res) => {
  if (!req.files || !req.files.file || !req.files.image) {
    return res.status(400).send("Both MP3 and image files are required.");
  }
  const mp3File = req.files.file[0];
  const imageFile = req.files.image[0];
  try {
    const mp3FileContent = fs.readFileSync(mp3File.path);
    const imageFileContent = fs.readFileSync(imageFile.path);

    const mp3Params = {
      Bucket: "deu-music-player",
      Key: mp3File.filename,
      Body: mp3FileContent,
      ContentType: "audio/mpeg",
    };

    const imageParams = {
      Bucket: "deu-music-player",
      Key: imageFile.filename,
      Body: imageFileContent,
      ContentType: "image/jpeg",
    };

    const [mp3Upload, imageUpload] = await Promise.all([
      s3.upload(mp3Params).promise(),
      s3.upload(imageParams).promise(),
    ]);

    const { title, genre, uploader } = req.body;
    await musicService.uploadMusicService(
      title,
      mp3Upload.Location,
      imageUpload.Location,
      genre,
      uploader
    );
    res.status(200).json({
      message: "업로드에 성공했습니다.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMusic = async (req, res) => {
  try {
    const musicList = await musicService.getAllMusicService();
    res.status(200).json(musicList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMusicByUploader = async (req, res) => {
  const { uploader } = req.params;
  try {
    const musicList = await musicService.getMusicByUploaderService(uploader);
    res.status(200).json(musicList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadMusic = async (req, res) => {
  const fileUrl = req.query.url;
  if (!fileUrl) {
    return res.status(400).json({ message: "URL is required" });
  }
  await downloadFileFromUrl(fileUrl, res);
};

module.exports = {
  uploadController,
  getAllMusic,
  getMusicByUploader,
  downloadMusic,
};
