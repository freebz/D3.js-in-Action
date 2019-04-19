// 리스트 2.7 데이터 바인딩 키값 설정

function dataViz(incomingData) {

  incomingData.forEach(function(el) {
    el.impact = el.favorites.length + el.retweets.length;
    el.tweetTime = new Date(el.timestamp);
  })

  var maxImpact = d3.max(incomingData, function(el) {
    return el.impact
  });

  var startEnd = d3.extent(incomingData, function(el) {
    return el.tweetTime
  });

  var timeRamp = d3.time.scale().domain(startEnd).range([ 50, 450 ]);
  var yScale = d3.scale.linear().domain([ 0, maxImpact ]).range([ 0, 460 ]);
  var radiusScale = d3.scale.linear().domain([ 0, maxImpact ]).range([ 1, 20 ]);

  d3.select("svg").selectAll("circle")
    .data(incomingData, function(d) {
      // key 등 고유한 속성은 어떤 것이든 사용할 수 있지만
      // 고유한 값이 없다면 객체 전체를 사용해도 된다.
      // 물론 객체 전체를 사용하려면 먼저 객체를 문자열화해야 한다.
      return JSON.stringify(d) })
    .enter()
    .append("circle")
    .attr("r", function(d) {
      return radiusScale(d.impact)})
    .attr("cx", function(d, i) {
      return timeRamp(d.tweetTime)})
    .attr("cy", function(d) {
      return 480 - yScale(d.impact)})
    .style("fill", "#990000")
    .style("stroke", "black")
    .style("stroke-width", "1px");
}
