// 리스트 11.11 힘-방향 레이아웃

// 6장에서 본 것과 같은 평범한 힘-방향 레이아웃 코드
var force = d3.layout.force()
              .size([500,500])
              .gravity(.5)
              .nodes(sampleNodes)
              .links(sampleLinks)
              .on("tick", forceTick);

d3.select("svg")
  .selectAll("line.link")
  .data(sampleLinks)
  .enter()
  .append("line")
  .attr("class", "link");

d3.select("svg").selectAll("circle.node")
  .data(sampleNOdes)
  .enter()
  .append("circle")
  .attr("r", 3)
  .attr("class", "node");

force.start();

function forceTick() {
  // 일단 처음 구현할 때는 모든 화면 요소를 SVG로 만들어
  // 매 애니메이션 틱마다 SVG를 모두 갱신한다.
  d3.selectAll("line.link")
    .attr("x1", function(d) {return d.source.x})
    .attr("y1", function(d) {return d.source.y})
    .attr("x2", function(d) {return d.target.x})
    .attr("y2", function(d) {return d.target.y});

  d3.selectAll("circle.node")
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y});
};
