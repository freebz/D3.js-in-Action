// 리스트 11.5 지도에 zoom 컨트롤 추가

mapZoom = d3.behavior.zoom().translate(projection.translate())
            .scale(projection.scale()).on("zoom", zoomed);
d3.select("svg").call(mapZoom);

function zoomed() {
  // 이 예제에서는 projection을 확대했는데,
  // 이렇게 하면 나중에 캔버스에 요소들을 그리기 더 쉬워진다.
  projection
    .translate(mapZoom.translate())
    .scale(mzpZoom.scale());

  d3.selectAll("path.sample").attr("d", geoPath);
  d3.selectAll("path.country").attr("d", geoPath);
};
