// 리스트 7.10 지도의 확대와 이동

var mapZoom = d3.behavior.zoom()
                // zoom 객체의 translate와 scale값을
                // project 객체의 값으로 사용한다.
                .translate(projection.translate())
                .scale(projection.scale())
                .on("zoom", zoomed);

d3.select("svg").call(mapZoom);

// zoom 이벤트 처리기를 호출할 때마다
// projection의 translate와 sclae값을 zoom 객체의 값으로 갱신한다.
function zoomed() {
  projection.translate(mapZoom.translate()).scale(mapZoom.scale());

  // 갱신한 projection 객체에 연결된 d3.geo.path를 호출해 경로를 다시 그린다.
  d3.selectAll("path.graticule").attr("d", geoPath);
  d3.selectAll("path.countries").attr("d", geoPath);
  // 그리고 이제 갱신한 projection으로 원의 위치를 설정한다.
  d3.selectAll("circle.citeis")
    .attr("cx", function(d) {return projection([d.x,d.y])[0]})
    .attr("cy", function(d) {return projection([d.x,d.y])[1]});
};
