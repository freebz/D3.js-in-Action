// 리스트 12.24 화면 너비에 기초한 디바이스 인식

var screenSize = screen.width;

if (screenSize < 480) {
  phoneView();
}
else if (screenSize < 1000) {
  tabletView();
}
