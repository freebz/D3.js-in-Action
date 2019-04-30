// 리스트 12.10 회전을 처리하는 터치 이벤트

function touchBegin() {
  d3.event.preventDefault();
  d3.event.stopPropagation();

  initialRotate = d3.transform(d3.select("#graphics")
			       .attr("transform")).rotate;

  d = d3.touches(this);
  if (d.length == 3) {
    // 초기 터치에서부터 모든 터치의 위치를 저장한다.
    initialD = d;
  }
};

function touchStatus() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  d = d3.touches(this);

  visualizeTouches(d);

  // 화면에 손가락 세 개가 터치할 때만 회전한다.
  if (d.length == 3) {
    var slope1 = (initialD[0][1] - initialD[1][1]) /
                 (initialD[0][0] - initialD[1][0]);

    // 선의 기울기를 계산한다.
    var slope2 = (d[0][1] - d[1][1]) / (d[0][0] - d[1][0]);

    // 두 기울기 간의 변화를 각도로 계산한다.
    var angle = Math.atan((slope1 - slope2)/(1 + slope1*slope2))
                            * 180/Math.PI;

    // 회전 각도를 구한다.
    var newRotate = initialRotate - angle;

    // 회전시킨다.
    d3.select("#graphics")
      .attr("transform", "rotate(" + newRotate +")" );
  }
};
