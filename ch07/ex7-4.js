// 리스트 7.4 처음으로 만든 지도 제작 함수

d3.json("world.geojson", createMap);

function createMap(countries) {
  // 나중에 설명하겠지만 projection() 함수에는 옵션이 많다.
  var aProjection = d3.deo.mercator();
  // d3.geo.path의 기본값은 albersUSA이므로 미국 지도를 투영하기 좋다.
  var geoPath = d3.geo.path().projection(aProjection);
  d3.select("svg").selectAll("path").data(countries.features)
    .enter()
    .append("path")
    // d3.geo.path는 GeoJSON 포맷의 지형을 가져와 SVG 경로를 그리는 코드를 반환한다.
    .attr("d", geoPath)
    .attr("class", "countries");
};
