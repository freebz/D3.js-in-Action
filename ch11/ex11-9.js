// 리스트 11.9 혼합 렌더링을 위한 zoomed() 함수

function zoomed() {
  projection.translate(mapZoom.translate()).scale(mapZoom.scale());

  var context = d3.select("canvas").node().getContext("2d");
  context.clearREct(0,0,500,500);
  canvasPath.context(context);

  context.strokeStyle = "black";
  content.fillStyle = "gray";
  context.lineWidth = "1px";

  for (var x in countries.features) {
    context.beginPath();
    canvasPath(countries.features[x]);
    context.stroke()
    context.fill();
  }

  context.strokeStyle = "black";
  context.fillStyle = "rgba(255,0,0,.2)";
  context.lineWidth = 1;

  for (var x in sampleData) {
    // 확대하는 동안 모든 요소를 캔버스에 그린다.
    context.beginPath();
    canvasPath(sampleData[x]);
    context.stroke()
    context.fill();
  }
};

function zoomInitialized() {
  // 확대가 시작되면 SVG 요소들을 숨긴다.
  d3.selectAll("path.sample")
    .style("display", "none");
  // 방금 숨긴 SVG 삼각형을 캔버스에 그리려 zoomed() 함수를 호출한다.
  zoomed();
};

function zoomFinished() {
  var context = d3.select("canvas").node().getContext("2d");
  context.clearRect(0,0,500,500);
  canvasPath.context(context)

  context.strokeStyle = "black";
  context.fillStyle = "gray";
  context.lineWidth = "1px";

  for (var x in countries.features) {
    // 확대가 끝날 때는 각 나라만을 캔버스로 다시 그린다.
    context.beginPath();
    canvasPath(countries.features[x]);
    context.stroke()
    context.fill();
  }

  d3.selectAll("path.sample")
    // 확대가 끝날 때 SVG 요소를 보여준다.
    .style("display", "block")
    // SVG 요소의 새로운 위치를 설정한다.
    .attr("d", svgPath);
};
