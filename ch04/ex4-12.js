// 리스트 4.12 movies.csv를 선 그래프로 그래는 콜백 함수

var xScale = d3.scale.linear().domain([ 1, 8 ]).range([ 20, 470 ]);
var yScale = d3.scale.linear().domain([ 0, 100 ]).range([ 480, 20 ]);

for (x in data[0]) {
  // for 루프로 데이터 속성을 반복한다.
  // 여기에서 x는 데이터 열의 명칭("day", "movie1", "movie2" 등)이며,
  // 이 이름이 데이터에 있으므로 동적으로 생성기를 만들어 호출할 수 있다.
  if (x != "day") {
    // 각 영화마다 생성기 객체를 만든다.
    var movieArea = d3.svg.line()
                      // 모든 선은 날짜를 x값으로 사용한다.
                      .x(function(d) {
			    return xScale(d.day);
		      })
                      // 데이터셋에서 해당 영화의 y값을 가져오려면
                      // 선 생성기의 y() 접근자를 동적으로 설정한다.
                      .y(function(d) {
			    return yScale(d[x]);
		      })
                      .interpolate("cardinal");

    d3.select("svg")
      .append("path")
      .style("id", x + "Area")
      .attr("d", movieArea(data))
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .style("opacity", .75);
  };
};
