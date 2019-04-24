// 리스트 7.9 경위선망의 추가

var graticule = d3.geo.graticule();

d3.select("svg").append("path")
  .datum(graticule)
  .attr("class", "graticule line")
  .attr("d", geoPath)
  .style("fill", "none")
  .style("stroke", "lightgray")
  .style("stroke-width", "1px");

d3.select("svg").append("path")
  .datum(graticule.outline)
  .attr("class", "graticule outline")
  .attr("d", geoPath)
  .style("fill", "none")
  .style("stroke", "black")
  .style("stroke-width", "1px");
