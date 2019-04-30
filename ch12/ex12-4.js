// 리스트 12.4 각 터치 위치를 나타내는 원

d3.select("svg")
  .on("touchstart", touchStatus)
  .on("touchmove", touchStatus);

function touchStatus() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  d = d3.touches(this);
  visualizeTouches(d);
};

function visualizeTouches(d) {
  // 첫 번째 손가락부터 마지막 손가락까지를
  // 분홍색에서 진한 빨간색까지의 색상으로 구분한다.
  var touchColor = d3.scale.linear()
                     .domain([0,10]).range(["pink","darkred"])

  // 각 터치 이벤트마다 원을 생성한다.
  d3.select("svg").selectAll("circle")
    .data(d)
    .enter()
    .append("circle")
    .attr("r", 75)
    .style("fill", function(d, i) {return touchColor(i);});

  d3.select("svg").selectAll("circle")
    .data(d)
    .exit()
    .remove();

  // 모든 원을 각기 터치 이벤트가 발생한 위치에 놓는다.
  d3.select("svg").selectAll("circle")
    .attr("cx", function(d) {return d[0];})
    .attr("cy", function(d) {return d[1];});
};
