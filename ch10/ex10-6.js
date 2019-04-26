// 리스트 10.6 개선된 그리드 레이아웃 호출

var grid = d3.layout.grid();
// 레이아웃 크기를 설정한다.
grid.size([400,400]);
var griddedData = grid(data.tweets);

d3.select("svg")
  .append("g")
  .attr("translorm", "translate(50,50)")
  .selectAll("circle").data(griddedData)
  .enter()
  .append("circle")
  // x와 y값에 따라 원을 위치시킨다.
  .attr("cx", function(d) {return d.x})
  .attr("cy", function(d) {return d.y})
  .attr("r", 20)
  .style("fill", "pink");

var fakeTweets = [];
for (var x = 0; x < 12; x++) {
  var tweet = {id: x, content: "Fake Tweet #" + x};
  fakeTweets.push(tweet);
}

var doubledArray = data.tweets.concat(fakeTweets);
var newGriddedData = grid(doubledArray);

d3.select("g").selectAll("circle").data(newGriddedData)
  .enter()
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 20)
  .style("fill", "darkred");

d3.select("g").selectAll("circle")
  .transition()
  .duration(1000)
  .attr("cx", function(d) {return d.x})
  .attr("cy", function(d) {return d.y})
  // 전환이 끝날 때 resizeGrid1() 함수를 호출한다.
  .each("end", resizeGrid1);
