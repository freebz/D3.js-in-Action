// 리스트 7.6 지리 데이터의 점과 폴리곤 로딩

queue()
  .defer(d3.json, "world.geojson")
  .defer(d3.csv, "cities.csv")
  .await(function(error, file1, file2) {
    createMap(file1, file2);
  });

function createMap(countries, cities) {
  var width = 500;
  var height = 500;
  var projection = d3.geo.mercator()
                     .scale(80)
                     .translate([width / 2, height / 2]);
  d3.select("svg").selectAll("path").data(countries,features)
    .enter()
    .append("path")
    .attr("d", geoPath)
    // 도시를 쉽게 볼 수 있도록 채움 스파일을 변경한다.
    .style("fill", "gray");

  // 도시를 나라 위에 그려야 하므로, 도시를 나중에 그린다.
  d3.select("svg").selectAll("circle").data(cities)
    .enter()
    .append("circle")
    .style("fill", "red")
    .attr("class", "cities")
    .attr("r", 3)
    // projection()이 배열을 반환하므로,
    // 첫 번째 값ㅇ르 cx, 두 번째 값을 cy로 사용한다.
    .attr("cx", function(d) {return projection([d.x,d.y])[0]})
    .attr("cy", function(d) {return projection([d.x,d.y])[1]});
};
