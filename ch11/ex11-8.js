// 리스트 11.8 zoom 객체에 기초한 혼합 렌더링

var projecton = d3.geo.mercator().scale(100).translate([250,250]);
var svgPath = d3.geo.path().projection(projection);
var canvasPath = d3.geo.path().projection(projection);

// zoom 이벤트에 따라 별도의 함수를 할당한다.
mapZoom = d3.behavior.zoom()
            .translate(projection.translate())
            .scale(projection.scale())
            .on("zoom", zoomed)
            .on("zoomstart", zoomInitialized)
            .on("zoomend", zoomFinished);

d3.select("svg").call(mapZoom);

var g = d3.select("svg").append("g")

g.selectAll("path.sample").data(sampleData)
  .enter()
  .append("path")
  .attr("class", "sample")
  .on("mouseover", function() {
      d3.select(this).style("fill", "pink");
  });

// SVG 삼각형과 캔버스 나라 지형을 그리는 데
// [리스트 11.9]의 zoomFinished() 함수를 호출해야 한다.
zoomFinished();
