// 리스트 1.11 ID와 투명도를 가진 SVG 요소

d3.select("svg")
  .append("circle")
  .attr("r", 20)
  .attr("cx", 20)
  .attr("cy", 20)
  .style("fill", "red");

d3.select("svg")
  .append("text")
  .attr("id", "a")
  .attr("x", 20)
  .attr("y", 20)
  .style("opacity", 0)
  .text("HELLO WORLD");

d3.select("svg")
  .append("circle")
  .attr("r", 100)
  .attr("cx", 400)
  .attr("cy", 400)
  .style("fill", "lightblue");

d3.select("svg")
  .append("text")
  .attr("id", "b")
  .attr("x", 400)
  .attr("y", 400)
  .style("opacity", 0)
  .text("Uh, hi.");
