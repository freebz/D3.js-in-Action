// 리스트 7.13 드래그할 수 있는 지구본

queue()
  .defer(d3.json, "world.geojson")
  .defer(d3.csv, "cities.csv")
  .await(function(error, file1, file2) { createMap(file1, file2); });

function createMap(countries, cities) {

  // ...정사 도법으로 설정하는 코드...

  var mapZoom =
    d3.behavior.zoom().translate(projection.translate())
    .scale(projection.scale())
    .on("zoom", zoomed);

  d3.select("svg").call(mapZoom);

  var rotateScale = d3.scale.linear()
                      .domain([0, width])
                      .range([-180, 180]);

  // 지구본을 드래그하려면 mousedown 이벤트가
  // mousemove 이벤트 리스너를 활성화한다.
  d3.select("svg")
    .on("mousedown", startRotating)
    .on("mouseup", stopRotating);

  function startRotating() {
    d3.select("svg").on("mousemove", function() {
      var p = d3.mouse(this);
      projection.rotate([rotateScale(p[0]), 0]);
      zoomed();
    });
  }

  // 드래그가 끝나면 mousemove 이벤트 리스너를 제거한다.
  function stopRotating() {
    d3.select("svg").on("mousemove", null);
  }

  function zoomed() {
    var currentRotate = projection.ratate()[0];
    projection.scale(mapZoom.scale());
    d3.selectAll("path.graticule").attr("d", geoPath);
    d3.selectAll("path.countries").attr("d", geoPath);

    d3.selectAll("circle.cities")
      .attr("cx", function(d) {return projection([d.y,d.x])[0]})
      .attr("cy", function(d) {return projection([d.y,d.x])[1]})
      .style("display", function(d) {
	return parseInt(d.y) + currentRotate < 90
	       && parseInt(d.y) + currentRotate > -90 ?
	           "block" : "none"})
  }

  // ... 수동 zoom in 버튼과 zoom out 버튼 추가 ...

  // ... 경위선망, 나라, 도시를 그리는 코드 ...

  // ... 중심과 경계 상자를 생성 / 삭제하는 코드 ...
}
