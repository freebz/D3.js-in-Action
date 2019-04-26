// 리스트 11.14 XY 브러시

var brush = d3.svg.brush()
              // 스케일 설정을 변경하지 않을 것이므로 생성해 바로 사용한다.
              .x(d3.scale.identity().domain([0, 500]))
              .y(d3.scale.identity().domain([0, 500]))
              .on("brush", brushed);

d3.select("svg").call(brush)

function brushed() {
  var e = brush.extent();
  d3.selectAll("circle")
    .style("fill", function (d) {
      // 데이터가 선택된 영역 안에 있는지 검사한다.
      if (d.x >= e[0][0] && d.x <= e[1][0]
	  && d.y >= e[0][1] && d.y <= e[1][1])
      {
	// 선택된 영역 안에 있는 점은 진한 빨간색으로 설정한다.
	return "darkred";
      }
      else {
	// 선택된 영역 안에 있지 않은 점은 분홍색으로 설정한다.
	return "pink";
      }
    });
};
