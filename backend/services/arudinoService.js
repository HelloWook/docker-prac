const { com, parser } = require("../config/arduinoConfig");

const controllMusicService = (id) => {
  return new Promise((resolve, reject) => {
    try {
      com.write(id + "\n");
      let lastData = ""; // 마지막 데이터를 저장할 변수

      parser.on("data", (data) => {
        lastData = data.trim(); // 데이터를 저장
      });

      // 1초 후에 마지막 데이터를 반환
      setTimeout(() => {
        resolve(lastData);
      }, 1000);
    } catch (error) {
      reject(new Error("동작에 실패했습니다."));
    }
  });
};

module.exports = {
  controllMusicService,
};
