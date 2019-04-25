// 리스트 9.15 brushed() 함수

function brushed() {
  // 브러시의 현재 범위를 가져온다.
  var e = timeBrush.extent();

  d3.selectAll("circle.pack")
    // 현재 범위 안에 들어가지 않는 트윗(깊이가 2 수준)을 모두 숨긴다.
    .filter(function(d){return d.depth == 2})
    .style("display", function (d) {
      return new Date(d.timestamp) >= e[0]
  	     && new Date(d.timestamp) <= e[1] ? "block" : "none";
    });

  var rightSize = canvasSize("#rightSVG");

  // 현재 범위 안에 있는 트윗을 나타내는 막대만 보이도록 막대 그래프를 다시 그린다.
  d3.select("#rightSVG")
    .selectAll("rect")
    .attr("x", function(d,i) {return barXScale(d.key) + 5})
    .attr("width", function() {return barXScale.rangeBand() - 5})
    .attr("y", function(d) {return barYScale(filteredLength(d))})
    .style("stroke", "black")
    .attr("height", function(d) {
      return rightSize[1] -barYScale(filteredLength(d));
    });

  function filteredLength(d) {
    var filteredValues = d.values.filter(function (p) {
      return Date(p.timestamp) >= e[0] && new Date(p.timestamp) <= e[1];
    });
    return filteredValues.length;
  };
};
