// 리스트 5.4 계통도를 그리기 위한 콜백 함수

var treeChart = d3.layout.tree();
treeChart.size([500,500])
  .children(function(d) {return d.values});

// 기본값을 가진 사선 생성기를 만든다.
var linkGenerator = d3.svg.diagonal();

d3.select("svg")
  .append("g")
  // 이 요소들을 모두 담을 부모 요소로서 <g#treeG>를 만든다.
  .attr("id", "treeG")
  // 레이블을 붙일 수 있도록 <g> 요소를 만든다.
  .selectAll("g")
  // 앞 예제에서 사용했던 packableTweets를 사용한다.
  .data(treeChart(packableTweets))
  .enter()
  .append("g")
  .attr("class", "node")
  // 팩 레이아웃과 마찬가지로 트리 레이아웃도 각 노드의 XY 좌표를 계산한다.
  .attr("transform", function(d) {
    return "translate(" +d.x+","+d.y+")"
  });

d3.selectAll("g.node")
  // 노드를 나타내는 작은 원.
  // 서클 팩에서 사용한 것과 같은 스케일로 색상을 칠한다.
  .append("circle")
  .attr("r", 10)
  // 앞 예제에서 사용했던 depthScale을 사용한다.
  .style("fill", function(d) {return depthScale(d.depth)})
  .style("stroke", "white")
  .style("stroke-width", "2px");

d3.selectAll("g.node")
  .append("text")
  // 각 노드에 사용할 텍스트 레이블.
  // id, key, content 등 노드에 있는 어떤 속성이라도 사용할 수 있다.
  .text(function(d) {return d.id || d.key || d.content})

d3.select("#treeG").selectAll("path")
  // 레이아웃의 links() 함수는 노드 간에 연결선을 그리는 데
  // 사용할 수 있는 연결선 배열을 생성한다.
  .data(treeChart.links(treeChart(packableTweets)))
  .enter().insert("path","g")
  // 다른 생성기와 마찬가지로 계통도 생성기도 경로를 생성한다.
  .attr("d", linkGenerator)
  .style("fill", "none")
  .style("stroke", "black")
  .style("stroke-width", "2px");
