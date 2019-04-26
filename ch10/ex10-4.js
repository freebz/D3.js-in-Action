// 리스트 10.4 그리드에 요소 추가

var fakeTweets = [];
// 가짜 트윗 12개를 새로 만든다.
for (var x = 0; x < 12; x++) {
  var tweet = {id: x, content: "Fake Tweet #" + x};
  fakeTweets.push(tweet);
}

// 원래 데이터셋과 결합해 새로운 데이터셋을 만든다.
var doubledArray = data.tweets.concat(fakeTweets);
var newGriddedData = grid(doubledArray);

// 새로운 트윗은 모두 훤점에 추가한다.
d3.select("svg").selectAll("circle")
  .data(newGriddedData)
  .enter()
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 20)
  .style("fill", "darkred");

// 기존 트윗을 포함한 모든 트윗을 새로 계산된 위치로 이동한다.
d3.select("svg").selectAll("circle")
  .transition()
  .duration(1000)
  .attr("cx", function(d) {return scale(d.x)})
  .attr("cy", function(d) {return scale(d.y)})
