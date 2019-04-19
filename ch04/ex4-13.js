// 리스트 4.13 영역 접근자

for (x in data[0]) {
  if (x != "day") {
    var movieArea = d3.svg.area()
                      .x(function(d) {
			    return xScale(d.day);
		      })
                      .y(function(d) {
    			    return yScale(d[x]);
		      })
                      // 이 접근자는 경로의 바닥이 어디인지 정의한다.
                      // 이 경우 꼭대깃값의 음수를 바닥으로 정의했으므로,
                      // X-축을 기준으로 대칭된 도형이 된다.
                      .y0(function(d) {
			    return yScale(-d[x]);
		      })
                      .interpolate("cardinal");

    d3.select("svg")
      .append("path")
      .style("id", x + "Area")
      .attr("d", movieArea(data))
      .attr("fill", "darkgray")
      .attr("stroke", "lightgray")
      .attr("stroke-width", 2)
      .style("opacity", .5);
  };
};
