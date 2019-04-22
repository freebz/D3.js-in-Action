// 리스트 5.7 생키 그리기 코드

var intensityRamp = d3.scale.linear()
  .domain([0,d3.max(data.links, function(d) {
    return d.value;
  }) ])
  .range(["black", "red"]);

// 전체 차트를 나타내는 무보 요소인 <g>의 오프셋
d3.select("svg").append("g")
  .attr("transform", "translate(20,20)").attr("id", "sankeyG");

d3.select("#sankeyG").selectAll(".link")
  .data(data.links)
  .enter().append("path")
  .attr("class", "link")
  // 생키 레이아웃의 link() 메서드는 경로 생성기다.
  .attr("d", sankey.link())
  // 두꺼운 스트로크를 사용하고 영역을 채우지 않는다.
  .style("stroke-width", function(d) { return d.dy; })
  .style("stroke-opacity", .5)
  .style("fill", "none")
  // 약한 것에서 강한 것을 검은색에서 빨간색으로 나타내려
  // intensityRamp()로 스트로크 색상을 설정한다.
  .style("stroke", function(d){ return intensityRamp(d.value); })
  .sort(function(a, b) { return b.dy - a.dy; })
  .on("mouseover", function() {
    d3.selectAll("path.link").style("stroke-opacity", .5)
  });

d3.select("#sankeyG").selectAll(".node")
  .data(data.nodes)
  .enter().append("g")
  .attr("class", "node")
  // 노드의 위치를 XY 좌표로 계산한다.
  .attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

d3.selectAll(".node").append("rect")
  .attr("height", function(d) { return d.dy; })
  .attr("width", 20)
  .style("fill", "pink")
  .style("stroke", "gray");

d3.selectAll(".node").append("text")
  .attr("x", 0)
  .attr("y", function(d) { return d.dy / 2; })
  .attr("text-anchor", "middle")
  .text(function(d) { return d.name; });
