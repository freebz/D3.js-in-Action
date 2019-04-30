// 리스트 12.5 싱글 터치 이동

// 초기 <p> 위치와 터치값을 저장할 변수가 필요하다.
var initialD;
var initialPosition;

d3.select("svg").on("touchstart", touchBegin);
d3.select("svg").on("touchmove", touchStatus);

// 사용자가 이동시킬 그룹 컨테이너
var graphicsG = d3.select("svg").append("g").attr("id", "graphics");

// <g>를 이동하고 있는지 알 수 있도록 표시하는 두 개의 사각형
graphicsG.append("rect")
         .attr("width", 250)
         .attr("height", 50)
         .attr("x", 50)
         .attr("y", 50)
         .style("fill", "red")
         .style("stroke", "gray")
         .style("stroke-width", "1px");

graphicsG.append("rect")
         .attr("width", 100)
         .attr("height", 400)
         .attr("x", 350)
         .attr("cy", 400)
         .style("fill", "gray")
         .style("stroke", "black")
         .style("stroke-width", "1px");
