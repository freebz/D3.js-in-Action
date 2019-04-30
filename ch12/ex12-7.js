// 리스트 12.7 제스처 추론 기반 코드

d3.select("svg").on("touchstart", touchStatus);
d3.select("svg").on("touchmove", touchStatus);

function touchStatus() {
  d3.event.preventDefault();
  d3.event.stopPropagation();

  d = d3.touches(this);

  visualizeTouches(d);

  // 그릴 선들을 이 배열에 채운다.
  var lines = [];
  if (d.length > 1) {
    for (x in d) {
      for (y in d) {
	if (y != x) {
	  var lineObj = {
	    // 각 터치 이벤트에 대해 이 위치와
	    // 나머지 모든 위치를 연결하는 데이터점을 생성한다.
	    source: d[x];
	    target: d[y];
	  };
	  lines.push(lineObj);
	}
      }
    }
    
    // 각 데이터 점마다 선을 만든다.
    d3.select("svg").selectAll("line")
      .data(lines)
      .enter().append("line")
      .style("stroke", "black").style("stroke-width", "3px");

    // 터치마다 선으로 연결한다.
    d3.select("svg").selectAll("line")
      .attr("x1", function(d) {
	return d.source[0];
      }).attr("y1", function(d) {
	return d.source[1];
      }).attr("x2", function(d) {
	return d.target[0];
      }).attr("y2", function(d) {
	return d.target[1];
      });
  };

  // 해당하는 터치 이벤트가 없는 선을 모두 제거한다.
  d3.select("svg").selectAll("line")
    .data(lines).exit().remove();
};
