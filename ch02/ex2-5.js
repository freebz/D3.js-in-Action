// 리스트 2.5 산포도 생성

function dataViz(incomingData) {
  incomingData.forEach(function (el) {
    // favorites와 retweets의 함계를 구해 영향력 점수를 생성한다.
    el.impact = el.favorites.length + el.retweets.length;
    // ISO 8906 표준에 따르는 문자열을 Date 형으로 변환한다.
    el.tweetTime = new Date(el.timestamp);
  })

  var maxImpact = d3.max(incomingData, function(el) {return el.impact;});
  // 스케일로 사용하려 최초 시각과 최종 시각을 반환한다.
  var startEnd = d3.extent(incomingData, function(el) {return el.tweetTime;});

  // startEnd는 배열이다.
  var timeRamp = d3.time.scale().domain(startEnd).range([20,480]);
  var yScale = d3.scale.linear().domain([0,maxImpact]).range([0,460]);
  var radiusScale = d3.scale.linear()
    .domain([0,maxImpact]).range([1,20]);
  // 영향력을 흰색과 진한 빨간색 사이의 색으로 대응하는 스케일을 생성한다.
  var colorScale = d3.scale.linear()
    .domain([0,maxImpact]).range(["white","#990000"]);

  d3.select("svg")
    .selectAll("circle")
    .data(incomingData)
    .enter()
    .append("circle")
    // 크기, 색상, 수직 위치는 모두 영향력에 기반ㅇ르 둔다.
    .attr("r", function(d) {return radiusScale(d.impact);})
    .attr("cx", function(d,i) {return timeRamp(d.tweetTime);})
    .attr("cy", function(d) {return 480 - yScale(d.impact);})
    .style("fill", function(d) {return colorScale(d.impact);})
    .style("stroke", "black")
    .style("stroke-width", "1px");
};
