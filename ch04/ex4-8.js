// 리스트 4.8 tweetdata로부터 산포도를 그리기 위한 콜백 함수

d3.csv("tweetdata.csv", lineChart);

function lineChart(data) {

  // 늘 해온 것처럼, 여백을 넣어 스케일을 만든다.
  xScale = d3.scale.linear().domain([1,10.5]).range([20,480]);
  yScale = d3.scale.linear().domain([0,35]).range([480,20]);

  // 날짜를 표현하도록 X-축의 눈금을 설정한다.
  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickSize(480)
    .tickValues([1,2,3,4,5,6,7,8,9,10]);

  d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")
    .ticks(10)
    .tickSize(480);

  d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

  // 다음에 나오는 세 줄의 코드는 같은 데이터셋을 사용하지만,
  // y 위치가 각기 트윗, 리트윗, 관심글 담기 횟수를 나타낸다.
  d3.select("svg").selectAll("circle.tweets")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.day)})
    .attr("cy", function(d) {return yScale(d.tweets)})
    .style("fill", "black");

  d3.select("svg").selectAll("circle.retweets")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "retweets")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.day)})
    .attr("cxy", function(d) {return yScale(d.retweets)})
    .style("fill", "lightgray");

  d3.select("svg").selectAll("circle.favorites")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "favorites")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.day)})
    .attr("cy", function(d) {return yScaled(d.favorites)})
    .style("fill", "gray");
};
