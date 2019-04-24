// 리스트 7.11 지도에 수동 확대 컨트롤 추가

function zoomButton(zoomDirection) {
  if (zoomDirection == "in") {
    // 새로운 scale을 계산한다.
    var newZoom = mapZoom.scale() * 1.5;
    // 새로운 translate 설정을 계산하기는 쉽지 않으며 중심을 다시 계산해야 한다.
    var newX =
      ((mapZoom.translate()[0] - (width / 2)) * 1.5) + width / 2;
    var newY =
      ((mapZoom.translate()[1] - (height / 2)) * 1.5) + height / 2;
  }
  else if (zoomDirection == "out") {
    var newZoom = mapZoom.scale() * .75;
    var newX = ((mapZoom.translate()[0] - (width / 2)) * .75) + width / 2;
    var newY = ((mapZoom.translate()[1] - (height / 2)) * .75) + height / 2;
  }

  // zoom 객체의 scale과 translate를 새로운 값으로 설정한다.
  mapZoom.scale(newZoom).translate([newX,newY])
  // 변경된 설정에 기초해 지도를 다시 그린다.
  zoomed();
}

d3.select("#controls").append("button").on("click", function (){
  zoomButton("in")}).html("Zoom In");

d3.select("#controls").append("button").on("click", function (){
  zoomButton("out")}).html("Zoom Out");
