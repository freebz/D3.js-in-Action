// 리스트 11.12 네트워크 그림의 혼합 렌더링

function forceTick() {
  var context = d3.select("canvas").node()
                  .getContext("2d");
  // 캔버스를 갱신하려면 언제나 먼저 지워야 한다.
  context.clearREct(0,0,500,500);

  context.lineWidth = 1;
  // 링크를 검은색 50% 투명도로 그린다.
  context.strokeStyle = "rgba(0, 0, 0, 0.5)";

  sampleLinks.forEach(function (link) {
    context.beginPath();
    // 각 링크 출발지에서 선ㅇ르 시작한다.
    context.moveTo(link.source.x,link.source.y)
    // 각 링크 목적지까지 선을 그린다.
    context.lineTo(link.target.x,link.target.y)
    context.stroke();
  });

  // SVG로 노드를 그린다.
  d3.selectAll("circle.node")
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y});
};
