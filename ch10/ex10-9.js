// 리스트 10.9 레이아웃에 사각형 추가

d3.select("g").selectAll("rect")
  .transition()
  .duration(1000)
  .attr("x", function(d) {return d.x - (d.width / 2);})
  .attr("y", function(d) {return d.y - (d.height / 2);})
  .attr("width", function(d) {return d.width;})
  .attr("height", function(d) {return d.height;})
  .each("end", resizeGrid1);
