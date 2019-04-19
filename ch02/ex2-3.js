// 리스트 2.3 데이터를 로딩, 형변환, 측정하고 막대 그래프로 출력

d3.csv("cities.csv",function(error,data) {dataViz(data);});

function dataViz(incomingData) {

  var maxPopulation = d3.max(incomingData, function(el) {
    // population값을 정수로 변환한다.
    return parseInt(el.population);
  });

  var yScale = d3.scale.linear().domain([0,maxPopulation]).range([0,460]);
  d3.select("svg").attr("style","height: 480px; width: 600px;");
  d3.select("svg")
    .selectAll("rect")
    .data(incomingData)
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", function(d) {return yScale(parseInt(d.population));})
    .attr("x", function(d,i) {return i * 60;})
    .attr("y", function(d) {return 480 - yScale(parseInt(d.population));})
    .style("fill", "blue")
    .style("stroke", "red")
    .style("stroke-width", "1px")
    .style("opacity", .25);
}
