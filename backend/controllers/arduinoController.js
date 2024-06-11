const ardunioService = require("../services/arudinoService");

const controllMusicController = async (req, res) => {
  try {
    const id = req.params.id;

    const currentMusicNumber = await ardunioService.controllMusicService(id);
    let responseMessage = "";
    switch (id) {
      case "p":
        responseMessage = "재생 혹은 일시정지를 진행합니다.";
        break;
      case "n":
        responseMessage = "다음 곡을 재생합니다.";
        break;
      case "b":
        responseMessage = "이전 곡을 재생합니다.";
        break;
      case "s":
        responseMessage = "재생을 중지합니다."; 
        break;
      default:
        responseMessage = "잘못된 명령입니다.";
        break;
    }
    return res.status(200).json({
      message: responseMessage,
      currentMusicNumber: currentMusicNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  controllMusicController,
};
