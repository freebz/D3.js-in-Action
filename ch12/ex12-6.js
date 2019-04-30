// 리스트 12.6 패닝을 처리하는 touchBegin()과 touchStatus() 함수

function touchBegin() {
  d3.event.preventDefault();
  d3.event.stopPropagation();

  d = d3.touches(this);

  // 손가락 하나만 화면에 올려졌을 때만 패닝한다.
  if (d.length == 1) {
    initialD = d;
    // d3.transform()를 호출해 <g> 요소의 현재 transform값을 가져온다.
    initialPosition = d3.transform(d3.select("#graphics")
				   .attr("transform")).translate;
  }
};

function touchStatus() {
  d3.event.preventDefault();
  d3.event.stopPropagation();

  d = d3.touches(this);

  // 계속 원으로 터치를 그림으로 벼여준다.
  visualizeTouches(d);

  if (d.length == 1) {
    // <g>의 원래 위치를 기준으로 터치 위치의 변화를 계산한다.
    var newX = initialD[0][0] - d[0][0] - initialPosition[0];
    var newY = initialD[0][1] - d[0][1] - initialPosition[1];

    // <g>에 새로운 위치를 적용한다.
    d3.select("#graphics")
      .attr("transform", "translate(" +(-newX) + "," + (-newY) + ")")
  }
}:
