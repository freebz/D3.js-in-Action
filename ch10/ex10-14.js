// 리스트 10.14 범례에 상호작용성 추가

d3.select("#legend").selectAll("rect").on("mouseover", legendOver);

function lengendOver(d) {
  console.log(d)
  d3.selectAll("circle")
    .style("opacity", function(p) {
      if (p.size >= d.domain[0] && p.size <= d.domain[1]) {
	return 1;
      } else {
	return .25;
      }
    });
};
