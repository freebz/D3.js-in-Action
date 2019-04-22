// 리스트 5.3 내포된 트윗 데이터를 서클 팩으로 표현

var nestedTweets = d3.nest().key(function (el) {
  return el.user;
}).entries(incData);

// d3.next()가 생성한 배열을 최상위 수준인 '루트' 객체 안에 넣는다.
var packableTweets = {id: "All Tweets", values: nestedTweets};
// 색상 스케일을 만들어 서클 팩 안의 원을 수준에 따라 다른 색으로 설정한다.
var depthScale = d3.scale.category10([0,1,2]);

var packChart = d3.layout.pack();

// 서클 팩의 크기를 그림 영역으로 설정한다.
packChart.size([500,500])
  // d3.nest()로 생성한 데이터에 맞게 자식 요소에 접근하는 접근자가
  // values 속성을 읽어오도록 설정한다.
  .children(function(d) {
    return d.values;
  })
  //
  // 단말 노드의 크기를 결정할 때 1을 반환하는 함수를 생성한다.
  .value(function(d) {
    return 1;
  });

d3.select("svg")
  .selectAll("circle")
  // packableTweets를 변환하는 packChart()가 반환한 값으로 바인딩한다.
  .data(packChart(packableTweets))
  .enter()
  .append("circle")
  // 반지름과 xy 좌표는 모두 팩 레이아웃이 계산한다.
  .attr("r", function(d) {return d.r;})
  .attr("cx", function(d) {return d.x;})
  .attr("cy", function(d) {retrun d.y;})
  // 깊이에 따라 다른 색상으로 채울 수 있게 각 노드에 depth 속성을 전달한다.
  .style("fill", function(d) {return depthScale(d.depth);})
  .style("stroke", "black")
  .style("stroke", "2px");
