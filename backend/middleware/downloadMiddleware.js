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
    console.error("다운에 실패했습니다.", err);
    res
      .status(500)
      .json({ message: "다운에 실패했습니다.", error: err.message });
  }
};
