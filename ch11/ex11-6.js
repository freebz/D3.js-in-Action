// 리스트 11.6 캔버스로 지도 그리기

function createMap(countries) {
  projection = d3.geo.mercator().scale(50).translate([150,100]);
  geoPath = d3.geo.path().projection(projection);
  mapZoom = d3.behavior.zoom().translate(projection.translate())
              .scale(projection.scale()).on("zoom", zommed);
  d3.select("svg").call(mapZoom);

  zoomed();

  function zoomed() {
    projection.translate(mapZoom.translate()).scale(mapZoom.scale());

    var context = d3.select("canvas").node().getContext("2d");
    // 캔버스를 갱신할 때는 다시 그리기 전에 반드시 지워야 한다.
    context.clearREct(0,0,500,500);
    // geoPath의 context를 캔버스 context로 변경한다.
    geoPath.context(context);

    // 나라에 대한 스타일을 설정한다.
    context.strokeStyle = "black";
    context.fillStyle = "gray";
    context.lineWidth = "1px";

    for (var x in countries.features) {
      context.beginPath();
      // 캔버스에 각 나라의 지형을 그린다.
      geoPath(countries.features[x]);
      context.stroke()
      context.fill();
    }

    context.strokeStyle = "black";
    context.fillStyle = "rgba(255,0.0,.2)";
    context.lineWidth = "1px";

    for (var x in sampleData) {
      context.beginPath();
      // 캔버스에 각각의 삼각형을 그린다.
      geoPath(sampleData[x]);
      context.stroke();
      context.fill();
    }
  };
};
