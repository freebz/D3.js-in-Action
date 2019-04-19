// 리스트 4.3 평균 나이의 산포도

d3.csv("boxplot.csv", scatterplot)

function scatterplot(data) {
  xScale = d3.scale.linear().domain([1,8]).range([20,470]);
  // 스케일을 뒤집었으므로 높은 값이 위에, 낮은 값이 아래에 놓인다.
  yScale = d3.scale.linear().domain([0,100]).range([480,20]);

  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")
    .ticks(8)
    .tickSize(-470);

  // 축을 담고 있는 <g>의 위치를 조정한다.
  d3.select("svg").append("g")
    .attr("transform", "translate(470,0)")
    .attr("id", "yAxisG")
    .call(yAxis);

  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickSize(-470)
    // 숫자로 표현된 요일에 대응하도록 눈금값을 구체적으로 지정한다.
    .tickValues([1,2,3,4,5,6,7]);

  d3.select("svg").append("g")
    .attr("transform", "translate(0,480)")
    .attr("id", "xAxisG")
    .call(xAxis);

  d3.select("svg").selectAll("circle.median")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.day)})
    .attr("cy", function(d) {return yScale(d.median)})
    .style("fill", "darkgray");
}
