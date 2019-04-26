// 리스트 10.3 그리드 레이아웃 사용

d3.json("tweets.json", function(error, data) {
  makeAGrid(data);
})

function makeAGrid(data) {
  // 그리드의 크기를 SVG 그림 영역에 맞게 조정하는 스케일
  var scale = d3.scale.linear().domain([0,5]).range([100,400]);
  var grid = d3.layout.grid();
  var griddedData = grid(data.tweets);

  d3.select("svg").selectAll("circle")
    .data(griddedData)
    .enter()
    .append("circle")
  // 레이아웃의 계산된 x와 y값에 기초해 스케일된 위치에 놓는다.
    .attr("cx", function(d) {return scale(d.x);})
    .attr("cy", function(d) {return scale(d.y);})
    .attr("r", 20)
    .style("fill", "pink");
}
