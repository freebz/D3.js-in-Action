// 리스트 4.15 그리는 영역의 수직 좌표를 변경하는 누적 함수

...
var movieArea = d3.svg.area().x(function(d) {
                      return xScale(d.day)
                  })
                  // 생성기에 사용할 접근자는 얼마든지 복잡하게 만들 수 있다.
                  .y(function(d) {
		      return yScale(alternatingStacking(d,x,"top"))
		  })
                  .y0(function(d) {
		      return yScale(alternatingStacking(d,x,"bottom"));
		  }).interpolate("basis");
...

// 차트로 표현할 데이터(incomingData 인자)가 필요하며,
// 영역의 꼭대기를 그리는지 바닥을 그리는지 알아야 한다.
// 스트림그래프에서는 위아래를 번갈아 그린다.
function alternatingStacking(incomingData,incomingAttribute,topBottom){
  var newHeight = 0;
  var skip = true;

  for (x in incomingData) {
    // "day"는 x 위치이므로, 처리하지 않는다.
    if (x != "day") {
      // 첫 번째 영화(중앙에 위치)는 무시하고,
      // 위 아래로 번갈아 출력하므로 하나 건너 하나씩 무시한다.
      if (x == "movie1" || skip == false) {
	newHeight += parseInt(incomingData[x]);
	// 기준선이 되는 영화에 도달하면 멈춘다.
	if (x == incomingAttribute) {
	  break;
	}
	if (skip == false) {
	  skip = true;
	} else {
	  n%2 == 0 ? skip = false : skip = true;
	}
      } else {
	skip = false;
      }
    }
  }
  // 스트림그래프에서 아래쪽 영역의 높이는 음수고, 위쪽 영역의 높이는 양수다.
  if (topBottom == "bottom") {
    newHeight = -newHeight;
  }
  if (n > 1 && n%2 == 1 && topBottom == "bottom") {
    newHeight = 0;
  }
  if (n > 1 && n%2 == 0 && topBottom == "top") {
    newHeight = 0;
  }
  return newHeight;
};
