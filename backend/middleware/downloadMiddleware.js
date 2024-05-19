const axios = require("axios");
const path = require("path");

exports.downloadFileFromUrl = async (url, res) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    const fileName = path.basename(url);
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    response.data.pipe(res);
  } catch (err) {
    console.error("Error downloading file", err);
    res
      .status(500)
      .json({ message: "Error downloading file", error: err.message });
  }
};
