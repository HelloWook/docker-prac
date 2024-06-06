#include <SoftwareSerial.h>
#include <DFRobotDFPlayerMini.h>

SoftwareSerial mySerial(10, 11); // RX, TX
DFRobotDFPlayerMini myDFPlayer;
bool isPaused = false; // 재생 상태를 추적하는 변수

void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);
  
  myDFPlayer.volume(30);
  myDFPlayer.play(1);
}

void loop() {
  if (Serial.available() > 0) {
    char command = Serial.read();
    switch (command) {
      case 'p': // 재생/일시정지 토글
        if (isPaused) {
          myDFPlayer.start();
        } else {
          myDFPlayer.pause();
        }
        isPaused = !isPaused;
        break;
      case 'n': // 다음 곡 재생
        myDFPlayer.next();
        delay(500); // 파일 번호를 읽기 전에 잠시 대기
        break;
      case 'b': // 이전 곡 재생
        myDFPlayer.previous();
        delay(500); // 파일 번호를 읽기 전에 잠시 대기
        break;
      case 's': // 재생 중지
        myDFPlayer.stop();
        isPaused = true;
        break;
      default:
        Serial.println("알 수 없는 명령");
        break;
    }
    int currentFileNumber = myDFPlayer.readCurrentFileNumber();
    if(currentFileNumber==-1)
    {
      currentFileNumber =1;
    }
    Serial.println( String(currentFileNumber));
  }
}
