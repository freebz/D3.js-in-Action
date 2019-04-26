// 리스트 10.10 그리드 안에 전 세계 로딩

d3.json("world.geojson", function(error, data) {
  makeAGrid(data);
})

function makeAGrid(data) {
  var grid = d3.layout.grid();
  grid.size([300,300]);
  var griddedData = grid(data.features);

  // 각 나라의 면적을 계산해 데이터점에 추가한다.
  griddedData.forEach(function (country) {
    country.size = d3.geo.area(country);
  });

  d3.select("svg")
    .append("g")
    .attr("transform", "translate(50,50)")
    .selectAll("circle")
    .data(griddedData)
    .enter()
    // 나라별 원을 추가한다.
    .append("circle")
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y})
    .attr("r", 10)
    .style("fill", "lightgray")
    .style("stroke", "black")
    .style("stroke-width", "1px");
};
