// 리스트 12.12 터치 액션을 모두 통합한 터치 함수들

function touchBegin() {
  d3.event.preventDefault()
  d3.event.stopPropagation();

  // 초기 터치와 위치 정보를 저장한다.
  d = d3.touches(this);
  initialD = d;
  initialTransform = d3.transform(d3.select("#graphics")
				  .attr("transform"));
};

function touchUpdate() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  d = d3.touches(this);

  visualizeTouches(d);

  // 각 변환 정보를 가져온다.
  var newX = initialTransform.translate[0];
  var newY = initialTransform.translate[1];
  var newRotate = initialTransform.rotate;
  var newScale = initialTransform.scale[0];

  // 손가락이 하나면 이동이다.
  if (d.length == 1) {
    newX = -(initialD[0][0] - d[0][0] - initialTransform.translate[0]);
    newY = -(initialD[0][1] - d[0][1] - initialTransform.translate[1]);
  }
  // 손가락이 두 개면 핀치 확대다.
  else if (d.length == 2) {
    var initialLength = Math.sqrt(Math.abs(initialD[0][0]
        - initialD[1][0]) + Math.abs(initialD[0][1] - initialD[1][1]));

    var zoom = currentLength / initialLength;
    newScale = zoom + initialTransform.scale[0];
  }
  // 손가락이 세 개면 회전이다.
  else if (d.length == 3) {
    var slope1 = (initialD[0][1] - initialD[1][1])
               / (initialD[0][0] - initialD[1][0]);

    var slope2 = (d[0][1] - d[1][1]) / (d[0][0] - d[1][0]);

    var angle = Math.atan((slope1 - slope2) /
			  (1 + slope1*slope2)) * 180/Math.PI;

    var newRotate = initialTransform.rotate - angle;

    // 레이블을 역회전시킨다.
    d3.selectAll("g.sample > text")
      .attr("transform", "rotate(" +(-newRotate)+")")
  }

  // 상호작용에 기초해 새로운 변환을 적용한다.
  d3.select("#graphics")
    .attr("transform", "translate(" +(newX) + "," + (newY) + ") "
	  + "scale(" + newScale + ") rotate(" + newRotate + ")" )
};
