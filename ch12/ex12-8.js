// 리스트 12.8 간단한 핀치 확대

// 확대할 <g>의 초기 스케일과 두 터치 간의 초기 거리를 저장해야 한다.
var initialLength = 0;
var initialScale = 1;

d3.select("svg").on("touchstart", touchBegin);
d3.select("svg").on("touchmove", touchStatus);

var graphicsG =
  d3.select("svg").append("g").attr("id", "graphics");

graphicsG.append("rect").attr("width", 250)
         .attr("height", 50).attr("x", 50).attr("y", 50)
         .style("fill", "red").style("stroke", "gray")
         .style("stroke-width", "1px");

// 나머지는 이전 코드와 동일하다.
graphicsG.append("rect").attr("width", 100)
         .attr("height", 400).attr("x", 350).attr("cy", 400)
         .style("fill", "gray").style("stroke", "black")
         .style("stroke-width", "1px");
