#include <SoftwareSerial.h>
#include <DFRobotDFPlayerMini.h>

SoftwareSerial mySerial(10, 11); // RX, TX
DFRobotDFPlayerMini myDFPlayer;
bool isPaused = false; // 재생 상태를 추적하는 변수
const int pirPin = 7;
void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);

  if (!myDFPlayer.begin(mySerial)) {
    Serial.println("DFPlayer Mini 연결 실패!");
    while (true);
  }

  Serial.println("DFPlayer Mini 연결 성공!");
  myDFPlayer.volume(30);
  myDFPlayer.play(1);

  Serial.println("명령을 입력하세요:");
  Serial.println("'p' - 재생/일시정지");
  Serial.println("'n' - 다음 곡");
  Serial.println("'b' - 이전 곡");
  Serial.println("'s' - 중지");
}

void loop() {
  char command = "";

  if (Serial.available() > 0) {
   command = Serial.read();
    switch (command) {
      case 'p': // 재생/일시정지 토글
        if (isPaused) {
          myDFPlayer.start();
          Serial.println("재생");
        } else {
          myDFPlayer.pause();
          Serial.println("일시정지");
        }
        isPaused = !isPaused;
        break;
      case 'n': // 다음 곡 재생
        myDFPlayer.next();
        Serial.println("다음 곡");
        isPaused = false;
        break;
      case 'b': // 이전 곡 재생
        myDFPlayer.previous();
        Serial.println("이전 곡");
        isPaused = false;
        break;
      case 's': // 재생 중지
        myDFPlayer.stop();
        Serial.println("재생 중지");
        isPaused = true;
        break;
      default:
        Serial.println("알 수 없는 명령");
        break;
    }
  }
}
