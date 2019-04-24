// 리스트 7.14 은면에 있는 도시 감추기

function zoomed() {
  var currentRotate = projection.rotate()[0];
  projection.scale(mapZoom.scale());
  d3.selectAll("path.graticule").attr("d", geoPath);
  d3.selectAll("path.countries").attr("d", geoPath);
  d3.selectAll("circle.cities")
    .attr("cx", function(d) {return projection([d.x,d.y])[0]})
    .attr("cy", function(d) {return projection([d.x,d.y])[1]})
    .style("display", function(d) {
      // 도시의 Y 위치가 현재 지구본 방향의 좌우 90도 안에 있는 경우에만 출력하고,
      // 그렇지 않은 경우에는 제거한다.
      return parseInt(d.y) + currentRotate < 90 &&
	parseInt(d.y) + currentRotate > -90 ?
	"block" : "none";
    });
};
