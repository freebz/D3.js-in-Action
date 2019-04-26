// 리스트 11.13 XY 데이터 생성기

sampleData = d3.range(3000).map(function(d) {
  var datapoint = {};
  datapoint.id = "Sample Node " + d;
  // 캔버스의 고정 크기를 알고 있으므로 하드코딩한다.
  datapoint.x = Math.random() * 500;
  datapoint.y = Math.random() * 500;

  return datapoint;
})

d3.select("svg").selectAll("circle")
  .data(sampleData)
  .enter()
  .append("circle")
  .attr("class", "xy")
  .attr("r", 3)
  .attr("cx", function(d) {return d.x})
  .attr("cy", function(d) {return d.y});
