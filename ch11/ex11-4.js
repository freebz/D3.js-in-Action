// 리스트 11.4 샘플 데이터를 지도 위에 그리기

d3.json("world.geojson", function(data) {createMap(data)});

function createMap(countries) {
  // <g> 대신 projection 객체를 패닝하므로
  // 나중에 projection을 캔버스에 그릴 수 있다.
  projection = d3.geo.mercator()
    .scale(100).translate([250,250])

  geoPath = d3.geo.path().projection(projection);
  g = d3.select("svg").append("g");

  g.selectAll("path.country")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", geoPath)
    .attr("class", "country");

  g.selectAll("path.smaple")
    .data(sampleData)
    .enter()
    .append("path")
    .attr("d", geoPath)
    .attr("class", "sample");
};
