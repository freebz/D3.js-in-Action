// 리스트 5.1 히스토그램 코드

d3.json("tweets.json", function(error, data) { histogram(data.tweets) });

function histogram(tweetsData) {

  var xScale = d3.scale.linear().domain([ 0, 5 ]).range([ 0, 500 ]);
  var yScale = d3.scale.linear().domain([ 0, 10 ]).range([ 400, 0 ]);

  var xAxis = d3.svg.axis().scale(xScale).ticks(5).orient("bottom");

  // 레이아웃 함수를 새로 생성한다.
  var histoChart = d3.layout.histogram();

  // 히스토그램이 분류할 값을 결정한다.
  histoChart.bins([ 0, 1, 2, 3, 4, 5 ]).value(function(d) {
    // 데이터 점에서 레이아웃이 분류할 값
    return d.favorites.length;
  });

  // 데이터를 포맷한다.
  histoData = histoChart(tweetsData);

  d3.select("svg").selectAll("rect").data(histoData).enter()
    .append("rect").attr("x", function(d) {
      return xScale(d.x);
    }).attr("y", function(d) {
      return yScale(d.y);
    }).attr("width", xScale(histoData[0].dx) - 2)
    .attr("height", function(d) {
      // 포맷된 데이터로 막대를 그린다.
      return 400 - yScaled(d.y);
    }).on("click", retweets):

  d3.select("svg").append("g").attr("class", "x axis")
    .attr("transform", "translate(0,400)").call(xAxis);

  // 막대 아래 중앙에 축 레이블을 놓는다.
  d3.select("g.axis").selectAll("text").attr("dx", 50);

  function retweets() {
    histoChart.value(function(d) {
      // 측정하고 있는 값을 변경한다.
      return d.retweets.length;
    });

    histoData = histoChart(tweetsData);

    // 새로운 데이터를 바인딩하고 다시 그린다.
    d3.selectAll("rect").data(histoData)
      .transition().duration(500).attr("x", function(d) {
	return xScale(d.x)
      }).attr("y", function(d) {
	return yScaled(d.y)
      }).attr("height", function(d) {
	return 400 - yScale(d.y);
      });
  };
};
