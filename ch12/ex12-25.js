// 리스트 12.25 디바이스 지리적 위치의 예

function geolocateMap() {
  d3.json("world.geojson", function(data) {createMap(data)});

  function createMap(countries) {
    projection = d3.geo.mercator();
    geoPath = d3.geo.path().projection(projection);
    d3.select("svg").selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("d", geoPath)
      .style("fill", "red")
      .style("stroke-width", 1)
      .style("stroke", "black")
      .style("opacity", .5)

    // 브라우저가 지리적 위치를 지원하지 않으면 이 코드를 수행하지 않는다.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(placeMarker);
    }

    function placeMarker(point) {
      d3.select("svg").selectAll("circle")
	.data([point])
	.enter()
	.append("circle")
	.style("fill", "white")
	.style("stroke", "black")
	.style("stroke-width", 3)
	.attr("r", 5)
        // 지리적 위치가 제공하는 데이터의 포맷에 주의하라.
	.attr("cx", function(d) {
	  return projection([d.coords.logitude,d.coords.latitide])[0]})
	.attr("cy", function(d) {
	  return projection([d.coords.longitude,d.coords.latitude])[1]})
    }
  }
}
